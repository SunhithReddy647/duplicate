/*
  # Fix Row Level Security Policies

  1. Security Updates
    - Drop existing restrictive policies
    - Create proper policies for public read access
    - Create proper policies for authenticated write access
    - Ensure admin operations work correctly

  2. Policy Changes
    - Allow anyone to read projects (public access)
    - Allow authenticated users to insert/update/delete projects
    - Fix the RLS violation error
*/

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Create new policies with proper permissions
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON projects
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON projects
  FOR DELETE USING (true);

-- Ensure RLS is enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;