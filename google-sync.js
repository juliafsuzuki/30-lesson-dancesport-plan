// Shared Google Sheet synchronization. The deployed Apps Script URL is added here
// after the Sheet service has been authorized and published.
const GOOGLE_SHEET_SYNC_URL = '';

function googleSyncEnabled() {
  return Boolean(GOOGLE_SHEET_SYNC_URL);
}

function submitToSharedSheet(payload) {
  if (!googleSyncEnabled()) return;
  let frame = document.querySelector('#google-sheet-sync-frame');
  if (!frame) {
    frame = document.createElement('iframe');
    frame.id = 'google-sheet-sync-frame';
    frame.name = 'google-sheet-sync-frame';
    frame.hidden = true;
    document.body.appendChild(frame);
  }
  const form = document.createElement('form');
  form.method = 'post';
  form.action = GOOGLE_SHEET_SYNC_URL;
  form.target = frame.name;
  form.hidden = true;
  const field = document.createElement('input');
  field.name = 'payload';
  field.value = JSON.stringify(payload);
  form.appendChild(field);
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

function loadSharedSheetState() {
  if (!googleSyncEnabled()) return;
  const callback = `dancesportSheetState_${Date.now()}`;
  window[callback] = (payload) => {
    const activities = payload.activities || [];
    const logs = payload.lessonLogs || [];
    if (activities.length || logs.length) {
      state.taskStatuses = Object.fromEntries(activities.map((row) => [
        statusKey(Number(row['Lesson ID']), Number(row['Task Index'])),
        row.Status || 'not-started'
      ]));
      state.entries = logs.map((row) => ({
        lesson_id: Number(row['Lesson ID']),
        task_index: 0,
        session_date: row.Date || '',
        instructor: row.Instructor || 'Davit',
        status: row.Status || 'not-started',
        notes: row.Notes || '',
        video_urls: parseVideoLinks(row['Video Links']),
        created_at: row['Updated At'] || ''
      }));
      localStorage.setItem(taskStatusStorageKeyOverride, JSON.stringify(state.taskStatuses));
      localStorage.setItem('dancesport30_entries', JSON.stringify(state.entries));
    } else {
      Object.entries(state.taskStatuses || {}).forEach(([key, status]) => {
        const [lessonId, taskIndex] = key.split(':').map(Number);
        submitToSharedSheet({ action: 'activity', lessonId, taskIndex, status });
      });
      (state.entries || []).forEach((entry) => submitToSharedSheet({
        action: 'lessonLog', lessonId: entry.lesson_id, date: entry.session_date,
        instructor: entry.instructor, status: entry.status, notes: entry.notes || '',
        videoLinks: entry.video_urls || []
      }));
    }
    setSync('Shared Sheet · synced');
    render();
    delete window[callback];
    script.remove();
  };
  const script = document.createElement('script');
  script.src = `${GOOGLE_SHEET_SYNC_URL}?action=state&callback=${callback}`;
  script.onerror = () => { setSync('Shared Sheet unavailable · using local copy'); delete window[callback]; script.remove(); };
  document.head.appendChild(script);
}

function parseVideoLinks(value) {
  try { return Array.isArray(value) ? value : JSON.parse(value || '[]'); } catch { return []; }
}

async function updateTaskStatus(lessonId, taskIndex, status) {
  state.taskStatuses[statusKey(lessonId, taskIndex)] = status;
  localStorage.setItem(taskStatusStorageKeyOverride, JSON.stringify(state.taskStatuses));
  submitToSharedSheet({ action: 'activity', lessonId, taskIndex, status });
  if (googleSyncEnabled()) setSync('Saved to shared Sheet');
  render();
}

const sharedProgressForm = $('#progress-form');
const sharedFreshProgressForm = sharedProgressForm.cloneNode(true);
sharedProgressForm.replaceWith(sharedFreshProgressForm);
sharedFreshProgressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(sharedFreshProgressForm);
  const videoLinks = [...document.querySelectorAll('.video-url')].map((input) => input.value.trim()).filter(Boolean);
  const entry = {
    lesson_id: Number(form.get('lesson-id')),
    task_index: 0,
    session_date: form.get('date'),
    instructor: form.get('instructor'),
    status: form.get('status'),
    notes: form.get('notes').trim(),
    video_urls: videoLinks,
    created_at: new Date().toISOString()
  };
  state.entries = state.entries.filter((item) => Number(item.lesson_id) !== entry.lesson_id);
  state.entries.unshift(entry);
  localStorage.setItem('dancesport30_entries', JSON.stringify(state.entries));
  submitToSharedSheet({ action: 'lessonLog', lessonId: entry.lesson_id, date: entry.session_date, instructor: entry.instructor, status: entry.status, notes: entry.notes, videoLinks });
  if (googleSyncEnabled()) setSync('Saved to shared Sheet');
  $('#progress-dialog').close();
  render();
});

loadSharedSheetState();
