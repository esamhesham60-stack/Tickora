// TICKORA - shared nav auth state (Login / Logout / Admin Dashboard link).
// Requires supabase-client.js loaded first. Looks for #navAccountLink and
// #navAccountLinkMobile (optional second copy for the mobile menu).

let _navAuthState = 'login'; // 'login' | 'account' | 'admin'

function tr2(key, fallback) {
  return typeof t === 'function' ? t(key) : fallback;
}

function renderNavAuth() {
  const links = [
    document.getElementById('navAccountLink'),
    document.getElementById('navAccountLinkMobile'),
  ].filter(Boolean);
  if (links.length === 0) return;

  if (_navAuthState === 'admin') {
    links.forEach(a => { a.textContent = tr2('navAdmin', 'Admin Dashboard'); a.href = 'admin.html'; a.onclick = null; });
  } else if (_navAuthState === 'account') {
    links.forEach(a => { a.textContent = tr2('navMyAccount', 'My Account'); a.href = 'myaccount.html'; a.onclick = null; });
  } else {
    links.forEach(a => { a.textContent = tr2('navLogin', 'Login'); a.href = 'account.html'; a.onclick = null; });
  }
}

async function initNavAuth() {
  const links = [
    document.getElementById('navAccountLink'),
    document.getElementById('navAccountLinkMobile'),
  ].filter(Boolean);
  if (links.length === 0) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    _navAuthState = 'login';
    renderNavAuth();
    return;
  }

  let isAdmin = false;
  try {
    const { data: profile } = await supabaseClient
      .from('profiles').select('is_admin').eq('id', session.user.id).single();
    isAdmin = !!(profile && profile.is_admin);
  } catch (e) { /* ignore */ }

  _navAuthState = isAdmin ? 'admin' : 'account';
  renderNavAuth();
}

document.addEventListener('DOMContentLoaded', initNavAuth);
document.addEventListener('tickora:langchange', renderNavAuth);
