/**
 * Supabase client initialization.
 * Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env when ready.
 * Use createClient from @supabase/supabase-js with typed database.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }
  // When Supabase is configured, use:
  // import { createClient } from '@supabase/supabase-js'
  // return createClient(supabaseUrl, supabaseAnonKey)
  return null
}
