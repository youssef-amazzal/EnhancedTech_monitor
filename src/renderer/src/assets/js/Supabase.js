import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ccpavmeycgczphxolyol.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcGF2bWV5Y2djenBoeG9seW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2MjQxMDUsImV4cCI6MTk5OTIwMDEwNX0.z7ggpnhwDWLvYEjbFWf6dYaNgdA0IIuoaIpaqH_jwYQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
