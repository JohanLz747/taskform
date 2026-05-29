import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://xevrgxjoqsxsvcaklkqp.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_M2EmSykOI_S0q2BTBJGCvQ_DywCoTWm';

export const supabase = createClient
(
  supabaseUrl, supabaseAnonKey
);