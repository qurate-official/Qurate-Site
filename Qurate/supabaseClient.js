// supabaseClient.js — load AFTER https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2

const SUPABASE_URL     = "https://wppqwnxtojovegfcdewr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcHF3bnh0b2pvdmVnZmNkZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTIyNjAsImV4cCI6MjA5Nzk2ODI2MH0.v_7EiCzRBy6psQIt0amAxwyeXxLWxJwa3PsQpVNuB0M";

const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkUserSession() {
  const { data: { session } } = await sbClient.auth.getSession();
  if (!session) {
    window.location.href = "auth.html";
    return null;
  }
  return session.user;
}

function toast(msg, type = 'success') {
  const container = document.getElementById('toastContainer') || document.body;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => { t.remove(); }, 3000);
}