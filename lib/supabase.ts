import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Complaint {
  id: string
  title: string
  description: string
  category: string
  location: string
  status: "pending" | "in-review" | "resolved" | "rejected"
  upvotes: number
  comments_count: number
  author_name: string
  is_anonymous: boolean
  ai_categorized: boolean
  ai_confidence: number
  evidence_files: EvidenceFile[]
  created_at: string
  updated_at: string
  user_id?: string
}

export interface EvidenceFile {
  id: string
  complaint_id: string
  filename: string
  file_url: string
  file_type: string
  file_size: number
  created_at: string
}

export interface Vote {
  id: string
  complaint_id: string
  user_id: string
  vote_type: "upvote" | "downvote"
  created_at: string
}

export interface Comment {
  id: string
  complaint_id: string
  user_id: string
  content: string
  author_name: string
  is_anonymous: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  karma_points: number
  reports_submitted: number
  cases_resolved: number
  created_at: string
}
