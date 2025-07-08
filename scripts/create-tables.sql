-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  karma_points INTEGER DEFAULT 0,
  reports_submitted INTEGER DEFAULT 0,
  cases_resolved INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('corruption', 'civic', 'law', 'environment', 'healthcare', 'education')),
  location VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-review', 'resolved', 'rejected')),
  upvotes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  author_name VARCHAR(255) NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  ai_categorized BOOLEAN DEFAULT false,
  ai_confidence DECIMAL(3,2) DEFAULT 0.0,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create evidence_files table
CREATE TABLE IF NOT EXISTS evidence_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type VARCHAR(10) CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(complaint_id, user_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_upvotes ON complaints(upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_votes_complaint_id ON votes(complaint_id);
CREATE INDEX IF NOT EXISTS idx_comments_complaint_id ON comments(complaint_id);
CREATE INDEX IF NOT EXISTS idx_evidence_files_complaint_id ON evidence_files(complaint_id);

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public complaints are viewable by everyone" ON complaints
    FOR SELECT USING (true);

CREATE POLICY "Public evidence files are viewable by everyone" ON evidence_files
    FOR SELECT USING (true);

CREATE POLICY "Public votes are viewable by everyone" ON votes
    FOR SELECT USING (true);

CREATE POLICY "Public comments are viewable by everyone" ON comments
    FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Users can insert their own complaints" ON complaints
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own complaints" ON complaints
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert evidence for any complaint" ON evidence_files
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can vote on complaints" ON votes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON votes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert comments" ON comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);
