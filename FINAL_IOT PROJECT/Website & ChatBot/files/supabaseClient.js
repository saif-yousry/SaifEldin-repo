// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ هنا تحط الـ Project URL من Supabase Dashboard
const supabaseUrl = 'https://rcthwvrkpfprukqwrjwo.supabase.co'

// ✅ هنا تحط الـ anon/public key من Supabase Dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjdGh3dnJrcGZwcnVrcXdyandvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMTkyNDQsImV4cCI6MjA3MTc5NTI0NH0.uNdw7XFdXXw3iVjzghaF7oUbxEYiemE6rZcmz0Ly7JM'

// إنشاء client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
