/*
  # Add Smart India Hackathon Code Column

  1. Schema Changes
    - Add `hackathon_code` column to `projects` table
    - Column is optional (nullable) for existing projects
    - Text type to support various code formats

  2. Security
    - No changes to RLS policies needed
    - Column inherits existing table permissions
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'hackathon_code'
  ) THEN
    ALTER TABLE projects ADD COLUMN hackathon_code text;
  END IF;
END $$;