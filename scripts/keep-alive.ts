import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function keepAlive() {
  try {
    // Insert a heartbeat record
    const { error } = await supabase
      .from('heartbeats')
      .insert({
        timestamp: new Date().toISOString(),
        source: 'github-action'
      })

    if (error) throw error
    console.log('Keep-alive successful!')
  } catch (error) {
    console.error('Keep-alive failed:', error)
    process.exit(1)
  }
}

keepAlive() 