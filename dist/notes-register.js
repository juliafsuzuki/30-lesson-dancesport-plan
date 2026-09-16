// A shared register of everything saved through the Lesson Note workflow.
(function () {
  function videoDetails(values) {
    return values.map((value, index) => {
      try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed.url === 'string') return { name: parsed.name || `Video ${index + 1}`, url: parsed.url };
      } catch (_) { /* Plain URLs were used before video names were added. */ }
      return { name: `Video ${index + 1}`, url: value };
    });
  }
  function lessonStatusLabel(lesson) {
    const statuses = lesson.tasks.map((_, index) => taskStatus(lesson.id, index));
    return statuses.every((status) => status === 'completed') ? 'Completed' : 'In Progress';
  }
  function notesView() {
    const entries = state.entries
      .filter((entry) => state.instructor === 'all' || entry.instructor === state.instructor)
      .filter((entry) => entry.notes || entry.video_urls?.length || entry.video_url)
      .filter((entry) => String(entry.notes || '').trim().toLowerCase() !== 'anonymous instructor')
      .filter((entry) => {
        const lesson = lessons.find((item) => item.id === Number(entry.lesson_id));
        if (state.phase !== 'all' && lesson?.phase !== Number(state.phase)) return false;
        const searchable = `${lesson?.title || ''} ${entry.instructor || ''} ${entry.notes || ''} ${(entry.video_urls || []).join(' ')}`.toLowerCase();
        return searchable.includes(state.query.toLowerCase());
      });
    // The register is one row per lesson. Its note and video cells preserve
    // every added log for that lesson in chronological order.
    const rows = [...entries.reduce((byLesson, entry) => {
      const key = Number(entry.lesson_id);
      const group = byLesson.get(key) || { lessonId: key, entries: [] };
      group.entries.push(entry);
      byLesson.set(key, group);
      return byLesson;
    }, new Map()).values()]
      .map((group) => ({ ...group, entries: group.entries.sort((a, b) => String(a.created_at || a.session_date || '').localeCompare(String(b.created_at || b.session_date || ''))) }))
      .sort((a, b) => a.lessonId - b.lessonId);
    if (!rows.length) return `<div class="empty"><p class="eyebrow">No lesson notes yet</p><h2>Lesson notes and video links will appear here once saved.</h2></div>`;
    return `<div class="notes-table-wrap"><table class="notes-table"><thead><tr><th>Lesson no.</th><th>Lesson name/title</th><th>Lesson date</th><th>Status</th><th>Lesson note</th><th>Video links</th></tr></thead><tbody>${rows.map((group) => {
      const entry = group.entries[group.entries.length - 1];
      const lesson = lessons.find((item) => item.id === group.lessonId);
      const notes = group.entries.map((item) => item.notes).filter(Boolean);
      const videos = group.entries.flatMap((item) => videoDetails(item.video_urls || (item.video_url ? [item.video_url] : [])));
      return `<tr><td data-label="Lesson no.">${safe(`Lesson ${String(group.lessonId).padStart(2, '0')}`)}</td><td data-label="Lesson name/title">${safe(lesson ? detailedTitle(lesson) : 'Lesson unavailable')}</td><td data-label="Lesson date">${safe(entry.session_date ? displayDate(entry.session_date) : '—')}</td><td data-label="Status"><span class="status-pill ${lessonStatusLabel(lesson).toLowerCase().replace(' ', '-')}">${safe(lessonStatusLabel(lesson))}</span></td><td data-label="Lesson note">${notes.length ? `<div class="note-log">${notes.map((note) => `<div>${safe(note)}</div>`).join('')}</div>` : '—'}</td><td data-label="Video links">${videos.length ? `<span class="note-video-links">${videos.map((video) => `<a href="${safe(video.url)}" target="_blank" rel="noopener noreferrer">${safe(video.name)}</a>`).join('')}</span>` : '—'}</td></tr>`;
    }).join('')}</tbody></table></div>`;
  }

  const renderWithoutNotes = window.render;
  window.render = function () {
    if (state.view !== 'notes') { renderWithoutNotes(); return; }
    overview();
    $('#view-root').innerHTML = notesView();
  };
  render();
})();
