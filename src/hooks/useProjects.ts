import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!supabase) {
        // If no Supabase connection, start with empty projects
        setProjects([]);
        setLoading(false);
        setError('Please connect to Supabase to enable permanent storage and admin features');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('stars', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        // Transform database data to match Project interface
        const transformedProjects: Project[] = data.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image,
          videoUrl: project.video_url,
          category: project.category,
          technologies: project.technologies,
          createdAt: project.created_at.split('T')[0], // Format date
          featured: project.featured,
          stars: project.stars || 1,
          hackathonCode: project.hackathon_code || undefined
        }));

        setProjects(transformedProjects);
      } catch (fetchError) {
        console.error('Database fetch failed:', fetchError);
        setProjects([]);
        setError('Failed to load projects from database. Please check your Supabase connection.');
      }
    } catch (err) {
      console.error('Error in fetchProjects:', err);
      setProjects([]);
      setError('Database connection failed. Please connect to Supabase.');
    } finally {
      setLoading(false);
    }
  };

  // Add new project
  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Please connect to Supabase first to save projects permanently' };
      }
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          description: projectData.description,
          image: projectData.image,
          video_url: projectData.videoUrl,
          category: projectData.category,
          technologies: projectData.technologies,
          featured: projectData.featured,
          stars: projectData.stars,
          hackathon_code: projectData.hackathonCode || null
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Transform and add to local state
      const newProject: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        videoUrl: data.video_url,
        category: data.category,
        technologies: data.technologies,
        createdAt: data.created_at.split('T')[0],
        featured: data.featured,
        stars: data.stars || 1,
        hackathonCode: data.hackathon_code || undefined
      };

      setProjects(prev => [newProject, ...prev]);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add project';
      return { success: false, error: errorMessage };
    }
  };

  // Update project
  const updateProject = async (id: string, projectData: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Please connect to Supabase first to update projects' };
      }
      
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          description: projectData.description,
          image: projectData.image,
          video_url: projectData.videoUrl,
          category: projectData.category,
          technologies: projectData.technologies,
          featured: projectData.featured,
          stars: projectData.stars
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Transform and update local state
      const updatedProject: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        videoUrl: data.video_url,
        category: data.category,
        technologies: data.technologies,
        createdAt: data.created_at.split('T')[0],
        featured: data.featured,
        stars: data.stars || 1,
        hackathonCode: data.hackathon_code || undefined
      };

      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      return { success: false, error: errorMessage };
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Please connect to Supabase first to delete projects' };
      }
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setProjects(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      return { success: false, error: errorMessage };
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchProjects();

    if (!supabase) return;

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Real-time update:', payload);
          // Refetch data when changes occur
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};