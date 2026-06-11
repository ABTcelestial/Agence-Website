const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read env file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testEmail(email) {
  console.log(`Trying sign up for: ${email}`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password: "Password123!",
  });
  if (error) {
    console.log(`Result for ${email}: ERROR - ${error.message} (${error.status})`);
  } else {
    console.log(`Result for ${email}: SUCCESS - user created:`, data.user ? data.user.id : 'no user object');
  }
}

async function run() {
  await testEmail("sayniir23@gmail.com");
  await testEmail("admin@gmail.com");
}

run().catch(console.error);
