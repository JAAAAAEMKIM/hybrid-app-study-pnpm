import { createClient, type SupabaseClient } from '@supabase/supabase-js';
class SupabaseApiClient {
  private static instance: SupabaseClient<any, 'public', any>;

  private static init() {
    const supabaseUrl = process.env.API_BASE_URL ?? '';
    const supabaseKey = process.env.API_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    SupabaseApiClient.instance = supabase;
  }

  static getInstance() {
    if (!SupabaseApiClient.instance) {
      SupabaseApiClient.init();
    }
    return SupabaseApiClient.instance;
  }
}

export default SupabaseApiClient;
