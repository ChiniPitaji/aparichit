import { supabase } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("complaints")
      .select(`
        *,
        evidence_files (*)
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      category,
      location,
      author_name,
      is_anonymous,
      ai_categorized,
      ai_confidence,
      evidence_files,
      user_id,
    } = body

    // Insert complaint
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .insert({
        title,
        description,
        category,
        location,
        author_name,
        is_anonymous,
        ai_categorized,
        ai_confidence,
        user_id,
      })
      .select()
      .single()

    if (complaintError) {
      console.error("Complaint insert error:", complaintError)
      return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
    }

    // Insert evidence files if any
    if (evidence_files && evidence_files.length > 0) {
      const evidenceData = evidence_files.map((file: any) => ({
        complaint_id: complaint.id,
        filename: file.filename,
        file_url: file.url,
        file_type: file.type,
        file_size: file.size,
      }))

      const { error: evidenceError } = await supabase.from("evidence_files").insert(evidenceData)

      if (evidenceError) {
        console.error("Evidence insert error:", evidenceError)
        // Don't fail the whole request, just log the error
      }
    }

    // Update user stats
    if (user_id) {
      await supabase.rpc("increment_user_reports", { user_id })
    }

    return NextResponse.json(complaint)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
