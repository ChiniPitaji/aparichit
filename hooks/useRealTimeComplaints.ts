"use client"

import { useState, useEffect } from "react"
import { supabase, type Complaint } from "@/lib/supabase"

export function useRealTimeComplaints(filters: {
  category?: string
  status?: string
  search?: string
}) {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComplaints()

    // Set up real-time subscription
    const channel = supabase
      .channel("complaints-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "complaints",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setComplaints((prev) => [payload.new as Complaint, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setComplaints((prev) =>
              prev.map((complaint) => (complaint.id === payload.new.id ? { ...complaint, ...payload.new } : complaint)),
            )
          } else if (payload.eventType === "DELETE") {
            setComplaints((prev) => prev.filter((complaint) => complaint.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [filters])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filters.category && filters.category !== "all") {
        params.append("category", filters.category)
      }
      if (filters.status && filters.status !== "all") {
        params.append("status", filters.status)
      }
      if (filters.search) {
        params.append("search", filters.search)
      }

      const response = await fetch(`/api/complaints?${params}`)
      if (!response.ok) throw new Error("Failed to fetch complaints")

      const data = await response.json()
      setComplaints(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitComplaint = async (complaintData: any) => {
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      })

      if (!response.ok) throw new Error("Failed to submit complaint")

      const newComplaint = await response.json()
      return newComplaint
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to submit complaint")
    }
  }

  const voteOnComplaint = async (complaintId: string, voteType: "upvote" | "downvote", userId: string) => {
    try {
      const response = await fetch(`/api/complaints/${complaintId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote_type: voteType, user_id: userId }),
      })

      if (!response.ok) throw new Error("Failed to vote")

      const result = await response.json()
      return result
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to vote")
    }
  }

  return {
    complaints,
    loading,
    error,
    refetch: fetchComplaints,
    submitComplaint,
    voteOnComplaint,
  }
}
