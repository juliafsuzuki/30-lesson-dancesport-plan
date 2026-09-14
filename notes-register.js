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
  function notesView() {
    const entries = state.entries
      .filter((entry) => state.instructor === 'all' || entry.instructor === state.instructor)
      .filter((entry) => entry.notes || entry.video_urls?.length || entry.video_url)
      .filter((entry) => {
        const lesson = lessons.find((item) => item.id === Number(entry.lesson_id));
        if (state.phase !== 'all' && lesson?.phase !== Number(state.phase)) return false;
        const searchable = `${lesson?.title || ''} ${entry.instructor || ''} ${entry.notes || ''} ${(entry.video_urls || []).join(' ')}`.toLowerCase();
        return searchable.includes(state.query.toLowerCase());
      });
    const rows = [...entries.reduce((byLesson, entry) => {
      const prior = byLesson.get(entry.lesson_id);
      if (!prior || String(entry.created_at || entry.session_date || '') > String(prior.created_at || prior.session_date || '')) byLesson.set(entry.lesson_id, entry);
      return byLesson;
    }, new Map()).values()]
      .sort((a, b) => Number(a.lesson_id) - Number(b.lesson_id) || String(a.session_date || '').localeCompare(String(b.session_date || '')));
    if (!rows.length) return `<div class="empty"><p class="eyebrow">No lesson notes yet</p><h2>Lesson notes and video links will appear here once saved.</h2></div>`;
    return `<div class="notes-table-wrap"><table class="notes-table"><thead><tr><th>Lesson no.</th><th>Lesson name/title</th><th>Lesson date</th><th>Lesson note</th><th>Video links</th></tr></thead><tbody>${rows.map((entry) => {
      const lesson = lessons.find((item) => item.id === Number(entry.lesson_id));
      const videos = videoDetails(entry.video_urls || (entry.video_url ? [entry.video_url] : []));
      return `<tr><td data-label="Lesson no.">${safe(`Lesson ${String(entry.lesson_id).padStart(2, '0')}`)}</td><td data-label="Lesson name/title">${safe(lesson ? detailedTitle(lesson) : 'Lesson unavailable')}</td><td data-label="Lesson date">${safe(entry.session_date ? displayDate(entry.session_date) : '—')}</td><td data-label="Lesson note">${safe(entry.notes || '—')}</td><td data-label="Video links">${videos.length ? `<span class="note-video-links">${videos.map((video) => `<a href="${safe(video.url)}" target="_blank" rel="noopener noreferrer">${safe(video.name)}</a>`).join('')}</span>` : '—'}</td></tr>`;
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

