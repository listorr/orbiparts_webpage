import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pibbqroawdvfsouronmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYmJxcm9hd2R2ZnNvdXJvbm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3Mzg2OTMsImV4cCI6MjA3MzMxNDY5M30.QGivsOuT1WXn9Kz6dI69GBKqLGbqcMaVJRBc_QF_1CQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false // Importante para evitar conflictos con React Router
  }
});