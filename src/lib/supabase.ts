import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have valid (non-placeholder) environment variables
const isValidUrl = supabaseUrl && 
  supabaseUrl.startsWith('https://') && 
  !supabaseUrl.includes('your-project-ref') &&
  !supabaseUrl.includes('placeholder');

const isValidKey = supabaseAnonKey && 
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes('your-anon-key') &&
  !supabaseAnonKey.includes('placeholder');

// Only create client if we have valid environment variables
export const supabase = isValidUrl && isValidKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Auth helper functions
export const signInWithOTP = async (phone: string) => {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  // For demo purposes, we'll simulate OTP sending
  // In production, you'd integrate with SMS service
  return { success: phone === '6361064550' };
};

export const verifyOTP = async (phone: string, otp: string) => {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  // For demo purposes, we'll check against hardcoded values
  // In production, you'd verify against SMS service
  if (phone === '6361064550' && otp === '664477') {
    // Return success for demo authentication
    return { success: true, data: { user: { id: 'demo-admin' } }, error: null };
  }
  return { success: false, error: { message: 'Invalid OTP' } };
};

export const signOut = async () => {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};