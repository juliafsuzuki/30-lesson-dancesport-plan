// Lesson details live on the expanded lesson itself. Notes stay in the Note
// dialog, while task and lesson status are derived separately from task rows.
(function () {
  const instructorOptions = ['Davit', 'Filemon', 'Jed'];

  function entriesForLesson(lessonId) {
    return state.entries.filter((entry) => Number(entry.lesson_id) === Number(lessonId));
  }

  function preferredEntry(lessonId) {
    const scoped = entriesForLesson(lessonId).filter((entry) => state.instructor === 'all' || entry.instructor === state.instructor);
    // The lesson surface is shared: always display the newest matching team record,
    // not just the record created by the browser currently viewing the tracker.
    return scoped.slice().sort((a, b) => String(b.created_at || b.session_date || '').localeCompare(String(a.created_at || a.session_date || '')))[0];
  }

  function ownEntry(lessonId) {
    return entriesForLesson(lessonId)
      .filter((entry) => entry.created_by && entry.created_by === state.session?.user?.id)
      .sort((a, b) => String(b.created_at || b.session_date || '').localeCompare(String(a.created_at || a.session_date || '')))[0];
  }

  function latestSharedEntry(lessonId) {
    return entriesForLesson(lessonId)
      .slice()
      .sort((a, b) => String(b.created_at || b.session_date || '').localeCompare(String(a.created_at || a.session_date || '')))[0];
  }

  function controlsFor(lessonId) {
    const card = [...document.querySelectorAll('.lesson-card')].find((item) => Number(item.querySelector('.lesson-number')?.textContent.match(/\d+/)?.[0]) === Number(lessonId));
    return card ? {
      date: card.querySelector('.lesson-date'),
      instructor: card.querySelector('.lesson-instructor'),
      message: card.querySelector('.lesson-session-message')
    } : {};
  }

  function updateEntryState(row) {
    const normalized = normalizeEntry(row);
    const at = state.entries.findIndex((entry) => entry.id && entry.id === normalized.id);
    if (at >= 0) state.entries.splice(at, 1, normalized);
    else state.entries.unshift(normalized);
  }

  function videoDetails(values) {
    return values.map((value, index) => {
      try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed.url === 'string') return { name: parsed.name || `Video ${index + 1}`, url: parsed.url };
      } catch (_) { /* Older saved entries contain a plain URL. */ }
      return { name: `Video ${index + 1}`, url: value };
    });
  }

  function addVideoEntry(video = {}) {
    const row = document.createElement('div');
    row.className = 'video-entry';
    row.innerHTML = `<input class="video-name" type="text" placeholder="Video name (optional)" /><input class="video-url" type="url" placeholder="Video link (optional)" />`;
    row.querySelector('.video-name').value = video.name || '';
    row.querySelector('.video-url').value = video.url || '';
    $('#video-links').appendChild(row);
  }

  async function saveLessonRecord(lessonId, values, retried = false) {
    const existing = latestSharedEntry(lessonId);
    const payload = {
      instructor: values.instructor,
      session_date: values.date,
      status: 'in-progress',
      notes: values.notes || existing?.notes || null,
      video_urls: values.videoUrls || existing?.video_urls || []
    };
    if (!state.config || !state.session?.access_token) {
      const local = normalizeEntry({ ...payload, lesson_id: lessonId, task_index: 0, created_at: new Date().toISOString() });
      updateEntryState(local);
      saveLocal(local);
      setSync('Local draft · connect shared sync');
      return local;
    }
    const endpoint = existing?.id
      ? `${state.config.url}/rest/v1/progress_entries?id=eq.${encodeURIComponent(existing.id)}`
      : `${state.config.url}/rest/v1/progress_entries`;
    const body = existing?.id ? payload : { ...payload, lesson_id: lessonId, task_index: 0, created_by: state.session.user.id };
    const response = await fetch(endpoint, {
      method: existing?.id ? 'PATCH' : 'POST',
      headers: { ...headers(), Prefer: 'return=representation' },
      body: JSON.stringify(body)
    });
    if (response.status === 401 && !retried && typeof renewAnonymousSupabaseSession === 'function') {
      await renewAnonymousSupabaseSession();
      return saveLessonRecord(lessonId, values, true);
    }
    if (!response.ok) throw new Error(`Could not save the lesson details (${response.status}).`);
    const row = (await response.json())[0];
    updateEntryState(row);
    setSync('Shared Supabase · synced');
    return row;
  }

  async function saveMetadata(lessonId) {
    const controls = controlsFor(lessonId);
    if (!controls.date?.value || !controls.instructor?.value) {
      if (controls.message) controls.message.textContent = !controls.date?.value ? 'Choose a date to save the lesson details.' : 'Choose an instructor to save the lesson details.';
      return;
    }
    try {
      if (controls.message) controls.message.textContent = 'Saving…';
      await saveLessonRecord(lessonId, { date: controls.date.value, instructor: controls.instructor.value });
      if (controls.message) controls.message.textContent = 'Saved';
      render();
    } catch (error) {
      if (controls.message) controls.message.textContent = error.message;
    }
  }

  function decorateLessonControls() {
    document.querySelectorAll('details.lesson-card').forEach((card) => {
      const lessonId = Number(card.querySelector('.lesson-number')?.textContent.match(/\d+/)?.[0]);
      const actionBar = card.querySelector('.lesson-action-bar');
      if (!lessonId || !actionBar || actionBar.querySelector('.lesson-session-controls')) return;
      const entry = preferredEntry(lessonId);
      const controls = document.createElement('div');
      controls.className = 'lesson-session-controls';
      controls.innerHTML = `<label class="lesson-date-label">Lesson date<span class="mobile-date-value">${safe(entry?.session_date ? displayDate(entry.session_date) : 'Select date')}</span><input class="lesson-date" type="date" value="${safe(entry?.session_date || '')}" /></label><label>Instructor<select class="lesson-instructor"><option value="">Select instructor</option>${instructorOptions.map((name) => `<option${entry?.instructor === name ? ' selected' : ''}>${name}</option>`).join('')}</select></label><span class="lesson-session-message" aria-live="polite"></span>`;
      const button = actionBar.querySelector('.lesson-log-button');
      button.textContent = 'Lesson Note';
      actionBar.insertBefore(controls, button);
      const footer = document.createElement('div');
      footer.className = 'lesson-note-action';
      footer.appendChild(button);
      card.querySelector('.task-table').after(footer);
      controls.querySelector('.lesson-date').addEventListener('change', (event) => { const value = event.target.value; controls.querySelector('.mobile-date-value').textContent = value ? displayDate(value) : 'Select date'; saveMetadata(lessonId); });
      controls.querySelector('.lesson-instructor').addEventListener('change', () => saveMetadata(lessonId));
    });
  }

  function applyLessonDates() {
    document.querySelectorAll('.lesson-card').forEach((card) => {
      const lessonId = Number(card.querySelector('.lesson-number')?.textContent.match(/\d+/)?.[0]);
      const lesson = lessons.find((item) => item.id === lessonId);
      const entry = preferredEntry(lessonId);
      const meta = card.querySelector('.lesson-meta');
      if (!lesson || !entry?.session_date || !meta) return;
      const label = lessonCompleted(lesson) ? 'Completed on' : 'Started on';
      meta.textContent = `${phaseFor(lesson.phase).title} · ${label} ${displayDate(entry.session_date)}`;
    });
  }

  // Redefine the window after the legacy scripts have bound their old form.
  window.openProgress = function (event) {
    const lessonId = Number(event.currentTarget.dataset.lesson);
    const lesson = lessons.find((item) => item.id === lessonId);
    const entry = preferredEntry(lessonId);
    $('#lesson-id').value = lessonId;
    $('#task-index').value = '0';
    $('#dialog-title').textContent = `Lesson ${String(lessonId).padStart(2, '0')} · Note`;
    $('#notes').value = entry?.notes || '';
    const videoLinks = $('#video-links');
    videoLinks.innerHTML = '';
    const videos = entry?.video_urls?.length ? videoDetails(entry.video_urls) : [{}];
    videos.forEach((video) => addVideoEntry(video));
    $('#progress-dialog').showModal();
  };

  const oldForm = $('#progress-form');
  const noteForm = oldForm.cloneNode(true);
  oldForm.replaceWith(noteForm);
  $('#close-progress')?.addEventListener('click', () => $('#progress-dialog').close());
  $('#cancel-progress')?.addEventListener('click', () => $('#progress-dialog').close());
  $('#add-video-link')?.addEventListener('click', () => addVideoEntry());
  noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const lessonId = Number($('#lesson-id').value);
    const renderedControls = controlsFor(lessonId);
    const existing = preferredEntry(lessonId);
    const controls = renderedControls.date ? renderedControls : {
      date: { value: existing?.session_date || '' },
      instructor: { value: existing?.instructor || '' }
    };
    if (!controls.date.value || !controls.instructor.value) { alert(!controls.date.value ? 'Choose a lesson date on the lesson page before saving a note.' : 'Choose an instructor on the lesson page before saving a note.'); return; }
    const videos = [...document.querySelectorAll('.video-entry')].map((row) => ({ name: row.querySelector('.video-name').value.trim(), url: row.querySelector('.video-url').value.trim() })).filter((video) => video.name || video.url);
    try {
      videos.forEach((video) => { if (!video.url) throw new Error(); const parsed = new URL(video.url); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); });
    } catch {
      alert('Use a valid http or https video link.'); return;
    }
    try {
      await saveLessonRecord(lessonId, { date: controls.date.value, instructor: controls.instructor.value, notes: $('#notes').value.trim(), videoUrls: videos.map((video) => JSON.stringify(video)) });
      $('#progress-dialog').close();
      render();
    } catch (error) { alert(error.message); }
  });

  const baseRender = window.render;
  window.render = function () { baseRender(); decorateLessonControls(); applyLessonDates(); };
  render();
})();
