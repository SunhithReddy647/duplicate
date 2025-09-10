/*
  # Create projects table with authentication

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image` (text, required - URL to project image)
      - `category` (text, required)
      - `technologies` (text array, for storing multiple technologies)
      - `featured` (boolean, default false)
      - `created_at` (timestamp, auto-generated)
      - `updated_at` (timestamp, auto-updated)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (anyone can view projects)
    - Add policy for authenticated admin to create/update/delete projects

  3. Sample Data
    - Insert sample projects to get started
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

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

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample projects
INSERT INTO projects (title, description, image, category, technologies, featured) VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce platform with modern UI, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.',
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Web Development',
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
  true
),
(
  'Task Management App',
  'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
  'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Web Development',
  ARRAY['React', 'TypeScript', 'Firebase', 'Material-UI'],
  false
),
(
  'Weather Dashboard',
  'A beautiful weather dashboard with detailed forecasts, interactive maps, and location-based weather alerts.',
  'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Web Development',
  ARRAY['Vue.js', 'OpenWeatherMap API', 'Chart.js', 'CSS3'],
  true
),
(
  'Smart Contract Platform',
  'A decentralized platform for creating and managing smart contracts with built-in security auditing and deployment tools.',
  'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
  'API',
  ARRAY['Solidity', 'Web3.js', 'Ethereum', 'React', 'Hardhat'],
  false
),
(
  'Mobile Expense Tracker',
  'A React Native mobile app for tracking expenses with categories, budgets, and detailed analytics.',
  'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  ARRAY['React Native', 'Redux', 'SQLite', 'React Navigation'],
  false
),
(
  'Predictive Analytics Engine',
  'An AI-powered analytics engine that uses machine learning to predict trends and provide actionable business insights.',
  'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  'AI/ML',
  ARRAY['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'FastAPI'],
  true
),
(
  'Object Detection System',
  'Real-time object detection and tracking system using advanced computer vision algorithms for security and surveillance.',
  'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Computer Vision',
  ARRAY['OpenCV', 'YOLO', 'Python', 'TensorFlow', 'NumPy'],
  false
),
(
  'Network Security Scanner',
  'Comprehensive network security scanning tool with vulnerability assessment and automated penetration testing capabilities.',
  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Cyber Security',
  ARRAY['Python', 'Nmap', 'Metasploit', 'Wireshark', 'Kali Linux'],
  true
);