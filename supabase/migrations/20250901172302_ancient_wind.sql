/*
  # Add video URL column to projects table

  1. Schema Changes
    - Add `video_url` column to `projects` table
    - Column is required (NOT NULL) for new projects
    - Existing projects will need to be updated with video URLs

  2. Notes
    - This migration adds video functionality to all projects
    - Video URLs should be YouTube, Vimeo, or direct video file links
    - The frontend will handle video playback in the project detail modal
*/

-- Add video_url column to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN video_url text NOT NULL DEFAULT '';
  END IF;
END $$;