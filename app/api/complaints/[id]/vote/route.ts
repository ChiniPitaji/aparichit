import { supabase } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { vote_type, user_id } = await request.json()
    const complaint_id = params.id

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from("votes")
      .select("*")
      .eq("complaint_id", complaint_id)
      .eq("user_id", user_id)
      .single()

    if (existingVote) {
      if (existingVote.vote_type === vote_type) {
        // Remove vote if same type
        await supabase.from("votes").delete().eq("id", existingVote.id)
      } else {
        // Update vote type
        await supabase.from("votes").update({ vote_type }).eq("id", existingVote.id)
      }
    } else {
      // Insert new vote
      await supabase.from("votes").insert({
        complaint_id,
        user_id,
        vote_type,
      })
    }

    // Update complaint upvotes count
    const { data: votes } = await supabase.from("votes").select("vote_type").eq("complaint_id", complaint_id)

    const upvotes = votes?.filter((v) => v.vote_type === "upvote").length || 0

    await supabase.from("complaints").update({ upvotes }).eq("id", complaint_id)

    return NextResponse.json({ success: true, upvotes })
  } catch (error) {
    console.error("Vote error:", error)
    return NextResponse.json({ error: "Failed to process vote" }, { status: 500 })
  }
}
