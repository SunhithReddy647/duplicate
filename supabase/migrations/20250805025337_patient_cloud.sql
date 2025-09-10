/*
  # Add stars column to projects table

  1. Changes
    - Add `stars` column to `projects` table
    - Set default value to 1 (minimum importance)
    - Make column NOT NULL with default for data consistency
    - Update existing rows to have default star rating

  2. Notes
    - This enables the star rating system for project importance
    - Existing projects will get 1 star by default
    - New projects can have 1-8 stars for importance ranking
*/

-- Add stars column to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'stars'
  ) THEN
    ALTER TABLE projects ADD COLUMN stars integer DEFAULT 1 NOT NULL;
  END IF;
END $$;

-- Update any existing rows that might have NULL stars (safety measure)
UPDATE projects SET stars = 1 WHERE stars IS NULL;