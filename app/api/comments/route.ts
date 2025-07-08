import { supabase } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const complaint_id = searchParams.get("complaint_id")

    if (!complaint_id) {
      return NextResponse.json({ error: "Complaint ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("complaint_id", complaint_id)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Comments fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { complaint_id, user_id, content, author_name, is_anonymous } = await request.json()

    const { data, error } = await supabase
      .from("comments")
      .insert({
        complaint_id,
        user_id,
        content,
        author_name,
        is_anonymous,
      })
      .select()
      .single()

    if (error) {
      console.error("Comment insert error:", error)
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }

    // Update comments count
    await supabase.rpc("increment_comment_count", { complaint_id })

    return NextResponse.json(data)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
