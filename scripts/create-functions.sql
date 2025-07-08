-- Function to increment user reports count
CREATE OR REPLACE FUNCTION increment_user_reports(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET reports_submitted = reports_submitted + 1,
      karma_points = karma_points + 100
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment comment count
CREATE OR REPLACE FUNCTION increment_comment_count(complaint_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE complaints 
  SET comments_count = comments_count + 1
  WHERE id = complaint_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update karma points
CREATE OR REPLACE FUNCTION update_karma_points(user_id UUID, points INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET karma_points = karma_points + points
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;
