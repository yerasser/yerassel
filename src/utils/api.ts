import { createClient } from '@supabase/supabase-js'
import { Database } from "../types/database.types.ts";

const supabaseUrl = 'https://cgxkocsqbhmqyxtvilkt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneGtvY3NxYmhtcXl4dHZpbGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NjY3MTAsImV4cCI6MjA3MjI0MjcxMH0.L4aZqfKnNj32q_xqAHl_U2-_RIdco4i0q8lFG0h-oh4'
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)