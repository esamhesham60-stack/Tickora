// TICKORA - shared nav auth state (Login / Logout / Admin Dashboard link).
// Requires supabase-client.js loaded first. Looks for #navAccountLink and
// #navAccountLinkMobile (optional second copy for the mobile menu).

async function initNavAuth() {
  const links = [
    document.getElementById('navAccountLink'),
    document.getElementById('navAccountLinkMobile'),
  ].filter(Boolean);
  if (links.length === 0) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    links.forEach(a => { a.textContent = 'Login'; a.href = 'account.html'; });
    return;
  }

  let isAdmin = false;
  try {
    const { data: profile } = await supabaseClient
      .from('profiles').select('is_admin').eq('id', session.user.id).single();
    isAdmin = !!(profile && profile.is_admin);
  } catch (e) { /* ignore */ }

  if (isAdmin) {
    links.forEach(a => { a.textContent = 'Admin Dashboard'; a.href = 'admin.html'; });
  } else {
    links.forEach(a => {
      a.textContent = 'Logout';
      a.href = '#';
      a.addEventListener('click', async (e) => {
        e.preventDefault();
        await supabaseClient.auth.signOut();
        location.reload();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initNavAuth);
