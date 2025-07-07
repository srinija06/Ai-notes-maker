import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpgcyvijjxagqcugnblm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZ2N5dmlqanhhZ3FjdWduYmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTgzMDIsImV4cCI6MjA2NzQ3NDMwMn0.ScxUM5Y7xz51x1w6zLWPnvCLXKj_3FmQwrI5exq8ifI';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Access Gemini API key from environment
export const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
