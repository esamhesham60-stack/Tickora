// TICKORA - Supabase client init. Requires the Supabase CDN script to be loaded first.
const SUPABASE_URL = 'https://xmlkxmgtramtpoiktjpj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbGt4bWd0cmFtdHBvaWt0anBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDIyMzksImV4cCI6MjA5OTY3ODIzOX0.bw7UZcv6x_D5pLPRjp3Qi0hdLNVjgLj8PSUtasY1fYc';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
