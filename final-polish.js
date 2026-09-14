// Keep the instructor filter consistent across the three views. Activity status
// is shared; the instructor filter narrows the lessons to that instructor's logs.
function visibleEntriesForLesson(lessonId) {
  return state.entries.filter((entry) => Number(entry.lesson_id) === lessonId && (state.instructor === 'all' || entry.instructor === state.instructor));
}
function filteredLessons() {
  return lessons.filter((lesson) => {
    const matchesPlan = (state.phase === 'all' || lesson.phase === Number(state.phase)) && `${lesson.id} ${lesson.title} ${lesson.style} ${lesson.focus} ${lesson.tasks.map((task) => `${task.dance} ${task.detail} ${task.figures}`).join(' ')}`.toLowerCase().includes(state.query.toLowerCase());
    return matchesPlan && (state.instructor === 'all' || visibleEntriesForLesson(lesson.id).length > 0);
  });
}
function lessonStarted(lesson) {
  const entries = visibleEntriesForLesson(lesson.id);
  return entries.length ? entries.some(entryHasStarted) : state.instructor === 'all' && lesson.tasks.some((_, index) => taskStatus(lesson.id, index) !== 'not-started');
}
// Lesson status is wholly derived from its task statuses. A lesson is complete
// only when every planned activity is complete; every other state is in progress.
function lessonCompleted(lesson) { return lesson.tasks.every((_, index) => taskStatus(lesson.id, index) === 'completed'); }
function lessonStartEntry(lessonId) { return visibleEntriesForLesson(lessonId).filter((entry) => entry.session_date).sort((a, b) => String(a.session_date).localeCompare(String(b.session_date)))[0]; }
function latestLessonEntry(lessonId) { return visibleEntriesForLesson(lessonId).sort((a, b) => String(b.created_at || b.session_date || '').localeCompare(String(a.created_at || a.session_date || '')))[0]; }
function completionEntry(lessonId) { return latestLessonEntry(lessonId); }
function overview() {
  const scope = state.instructor === 'all' ? lessons : lessons.filter((lesson) => visibleEntriesForLesson(lesson.id).length > 0);
  const started = scope.filter(lessonStarted).length, completed = scope.filter(lessonCompleted).length;
  const remaining = scope.filter(lessonStarted).reduce((total, lesson) => total + lesson.tasks.filter((_, index) => taskStatus(lesson.id, index) !== 'completed').length, 0);
  const suffix = state.instructor === 'all' ? '' : ` · ${state.instructor}`;
  $('#progress-overview').innerHTML = `<div class="metric"><b>${started}<small>/30</small></b><span>Lessons started${safe(suffix)}</span></div><div class="metric"><b>${completed}<small>/30</small></b><span>Lessons completed${safe(suffix)}</span></div><div class="metric"><b>${remaining}</b><span>Activities planned, not completed</span></div>`;
}
function summaryView(items) {
  return `<div class="summary-grid">${items.map((lesson) => { const phase = phaseFor(lesson.phase), completed = lessonCompleted(lesson), started = lessonStarted(lesson), start = lessonStartEntry(lesson.id), completion = completionEntry(lesson.id); const status = completed ? 'Completed' : 'In Progress'; const date = completed && completion?.session_date ? `Completed on ${displayDate(completion.session_date)}` : started && start?.session_date ? `Started on ${displayDate(start.session_date)}` : 'No lesson date selected'; const stateClass = completed ? 'completed-lesson' : started ? 'started-incomplete-lesson' : ''; return `<article class="summary-card ${stateClass}"><div class="summary-top"><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span class="status-pill ${completed ? 'completed' : 'in-progress'}">${status}</span></div><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p><p class="lesson-meta">${safe(date)}</p><span class="phase-pill">${safe(phase.principle)}</span><button class="button lesson-log-button" data-lesson="${lesson.id}">Lesson Note</button></article>`; }).join('')}</div>`;
}
function phaseView(items = lessons) {
  const activePhases = phases.filter((phase) => items.some((lesson) => lesson.phase === phase.id));
  return `<div class="phase-grid">${activePhases.map((phase) => { const phaseLessons = items.filter((lesson) => lesson.phase === phase.id), completed = phaseLessons.filter(lessonCompleted).length, started = phaseLessons.filter(lessonStarted).length, remaining = phaseLessons.filter(lessonStarted).reduce((total, lesson) => total + lesson.tasks.filter((_, index) => taskStatus(lesson.id, index) !== 'completed').length, 0), stateClass = completed === phaseLessons.length && phaseLessons.length ? 'completed-lesson' : started ? 'started-incomplete-lesson' : ''; return `<article class="phase-card ${stateClass}"><span class="phase-number">0${phase.id}</span><div><p class="eyebrow">${safe(phase.range)}</p><h2>${safe(phase.title)}</h2><p>${safe(phase.summary)}</p><p class="lesson-meta">${completed}/${phaseLessons.length} lessons completed · ${started} started${started ? ` · ${remaining} activities planned, not completed` : ''}</p></div><span class="principle-pill">${safe(phase.principle)}</span></article>`; }).join('')}</div>`;
}
function render() {
  const openLessons = new Set([...document.querySelectorAll('details.lesson-card[open]')].map((detail) => detail.querySelector('.lesson-number')?.textContent.match(/\d+/)?.[0]));
  overview(); const items = filteredLessons();
  $('#view-root').innerHTML = items.length ? (state.view === 'detail' ? detailView(items) : state.view === 'summary' ? summaryView(items) : phaseView(items)) : $('#empty-template').innerHTML;
  applyCompletionDates(); applyCompletedLessonStyling();
  document.querySelectorAll('details.lesson-card').forEach((detail) => { if (openLessons.has(detail.querySelector('.lesson-number')?.textContent.match(/\d+/)?.[0])) detail.open = true; });
  document.querySelectorAll('.lesson-log-button').forEach((button) => button.addEventListener('click', openProgress));
  document.querySelectorAll('.inline-status').forEach((select) => select.addEventListener('change', (event) => updateTaskStatus(Number(event.target.dataset.lesson), Number(event.target.dataset.task), event.target.value)));
}
$('#close-progress')?.addEventListener('click', () => $('#progress-dialog').close());
render();
