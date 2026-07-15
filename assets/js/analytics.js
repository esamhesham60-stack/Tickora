// TICKORA - lightweight analytics. Logs events to Supabase so the admin dashboard can show
// visits, quotation/WhatsApp clicks, and add-to-cart activity. Requires supabase-client.js first.

function getSessionId() {
  let id = localStorage.getItem('tickora_session_id');
  if (!id) {
    id = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('tickora_session_id', id);
  }
  return id;
}

async function logEvent(eventType, extra) {
  extra = extra || {};
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const user = session ? session.user : null;
    await supabaseClient.from('events').insert({
      event_type: eventType,
      product_id: extra.productId || null,
      product_name: extra.productName || null,
      session_id: getSessionId(),
      user_id: user ? user.id : null,
      user_email: user ? user.email : null,
      page: location.pathname.split('/').pop() || 'index.html',
    });
  } catch (e) {
    console.warn('logEvent failed', e);
  }
}

// fire a page_view automatically on every page that includes this script
logEvent('page_view');
