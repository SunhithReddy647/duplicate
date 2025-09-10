/*
  # Clear all projects and setup permanent storage

  1. Clear existing data
    - Delete all existing projects from the table
  
  2. Database Setup
    - Ensure projects table exists with proper schema
    - Enable Row Level Security (RLS)
    - Add policies for public read and authenticated write access
    - Add trigger for automatic timestamp updates

  3. Security
    - Public users can view projects
    - Only authenticated users can insert/update/delete projects
*/

-- Clear all existing projects
DELETE FROM projects;

-- Ensure the projects table exists with correct schema
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Create policies for public read access
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();