import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjhynjjirvcyeahmlopq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaHluamppcnZjeWVhaG1sb3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDIyMTIsImV4cCI6MjA2NTkxODIxMn0.hbfbqUE9inmh9gM-080AK2gPilCfn3I4GD0ZxrBB6Fk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);