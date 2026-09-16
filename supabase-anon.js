// Supabase shared mode without instructor email addresses. Enable Anonymous Sign-Ins
// in the Supabase dashboard before connecting the project in the app.
const SHARED_SUPABASE_CONFIG = {
  url: 'https://ratnvbnunrinvwiidjfr.supabase.co',
  key: 'sb_publishable_37CJg8fAjv3MfF7oJk58qw_yDtqt7it'
};

if (!state.config) {
  state.config = SHARED_SUPABASE_CONFIG;
  localStorage.setItem(configKey, JSON.stringify(state.config));
}
async function startAnonymousSupabaseSession() {
  if (!state.config) return;
  if (!state.session?.access_token) {
    const response = await fetch(`${state.config.url}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: state.config.key, 'Content-Type': 'application/json' },
      body: '{}'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error_description || data.msg || 'Anonymous access is not enabled in this Supabase project.');
    state.session = data;
    localStorage.setItem('dancesport30_session', JSON.stringify(data));
  }
  await loadEntries();
}

async function renewAnonymousSupabaseSession() {
  state.session = null;
  localStorage.removeItem('dancesport30_session');
  await startAnonymousSupabaseSession();
}

async function loadEntries() {
  if (!state.config || !state.session?.access_token) { state.entries = getEntries(); render(); return; }
  const [entriesResponse, statusesResponse] = await Promise.all([
    fetch(`${state.config.url}/rest/v1/progress_entries?select=*&order=session_date.desc,created_at.desc`, { headers: headers() }),
    fetch(`${state.config.url}/rest/v1/task_statuses?select=*`, { headers: headers() })
  ]);
  // Anonymous Supabase tokens are deliberately short-lived. Renew before
  // treating a 401 as an application error, so shared notes remain visible
  // after the tracker has been open for a while.
  if ((entriesResponse.status === 401 || statusesResponse.status === 401) && typeof renewAnonymousSupabaseSession === 'function') {
    await renewAnonymousSupabaseSession();
    return;
  }
  if (!entriesResponse.ok || !statusesResponse.ok) {
    const failedResponse = !entriesResponse.ok ? entriesResponse : statusesResponse;
    const detail = await failedResponse.text();
    throw new Error(`Supabase could not read the shared tracker tables (${failedResponse.status}). ${detail || 'Please refresh and try again.'}`);
  }
  const remoteEntries = (await entriesResponse.json()).map(normalizeEntry);
  const remoteStatuses = await statusesResponse.json();
  state.entries = remoteEntries;
  state.taskStatuses = Object.fromEntries(remoteStatuses.map((item) => [statusKey(item.lesson_id, item.task_index), item.status]));
  localStorage.setItem(taskStatusStorageKeyOverride, JSON.stringify(state.taskStatuses));
  setSync('Shared Supabase · synced');
  render();
}

const originalConnectButton = $('#sign-in');
const sharedConnectButton = originalConnectButton.cloneNode(true);
sharedConnectButton.id = 'connect-shared-tracker';
sharedConnectButton.textContent = 'Connect shared tracker';
originalConnectButton.replaceWith(sharedConnectButton);
$('#sign-up')?.remove();
sharedConnectButton.addEventListener('click', async () => {
  const message = $('#account-message');
  try {
    accountConfig();
    await startAnonymousSupabaseSession();
    $('#account-dialog').close();
  } catch (error) {
    message.textContent = error.message;
  }
});

if (state.config) startAnonymousSupabaseSession().catch(() => setSync('Sync needs attention'));

// Return to the app after working in Supabase or another tab and it will pull
// the latest shared records before the next interaction.
window.addEventListener('focus', () => {
  if (state.config && state.session?.access_token) loadEntries().catch(() => setSync('Sync needs attention'));
});

// Keep separate desktop and phone sessions aligned while the tracker stays open.
setInterval(() => {
  if (state.config && state.session?.access_token) loadEntries().catch(() => setSync('Sync needs attention'));
}, 20000);
