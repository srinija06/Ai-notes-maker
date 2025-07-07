// This type is based on the Supabase Auth user object structure
export interface SupabaseUser {
  id: string;
  aud: string;
  email: string | null;
  phone: string | null;
  app_metadata: { provider?: string; [key: string]: unknown };
  user_metadata: { [key: string]: unknown };
  created_at: string;
  confirmed_at: string | null;
  last_sign_in_at: string | null;
  role: string;
  updated_at: string;
}
