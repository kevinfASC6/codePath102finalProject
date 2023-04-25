import { createClient } from '@supabase/supabase-js';
const URL = "https://xdyufithhigwycxkavos.supabase.co"; 
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeXVmaXRoaGlnd3ljeGthdm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3MDcxNzUsImV4cCI6MTk5NzI4MzE3NX0.kerwhhxVviEve_XZSGhr88gc0YSjy0_mnLncbuE5GAI"
export const supabase = createClient(URL, API_KEY)