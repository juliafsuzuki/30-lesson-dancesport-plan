const FIGURES = {
  Waltz: ['Basic with Elements', 'Cross Body Lead', 'Forward Progressive Twinkles', 'Backward Progressive Twinkles', 'Traveling Cradle'],
  Tango: ['Basic with Elements', 'Right Side Fan', 'Running Steps', 'Forward Rock Steps', 'Open Fan Variation'],
  Foxtrot: ['Basic with Elements', 'Triple Twinkle', 'Grapevine to Spot Twinkle', 'Cross Body Lead', 'Box to Cuddle'],
  'Viennese Waltz': ['Left Turn', 'Right Turn', 'Balance Steps — Forward & Back; Balance Steps — Side', 'Fifth Position Breaks', 'Progressive Open Balance'],
  'Cha Cha': ['Basic with Elements', 'Cha Cha Passes', 'Parallel Breaks', 'Cross Triple Step', 'Check & Rock'],
  'East Coast Swing': ['Basic with Elements', 'Single Tuck in Turn', 'Double Tuck in Turn', 'Shoulder Spin Tuck in Turn', 'Right Lindy Turn'],
  Rumba: ['Basic with Elements', 'Offset Breaks', 'Underarm Turn to Open Cuban Walks', 'Cross Over Breaks', 'Parallel to Fifth Position Breaks'],
  Bolero: ['Bolero Basic', 'Cross Body Lead', 'Fifth Position Breaks', 'Cross Over Break and Walk Around', 'Underarm Turn to the Right'],
  Mambo: ['Mambo Basic; Progressive Basic', 'Cross Body Lead', 'Break Steps', 'Natural Underarm Turn', 'Reverse Underarm Turn'],
};

const phases = [
  { id: 1, title: 'Phase 1: Foundation Figures 1–3', range: 'Lessons 1–9', principle: 'Depth over variety', summary: 'Build dependable recall by returning to the same foundational figures until they are useful under pressure.' },
  { id: 2, title: 'Phase 2: Early Rounds Test', range: 'Lessons 10–12', principle: 'Functionality over form', summary: 'Test whether figures work in real rounds, with connection and movement taking priority over isolated form.' },
  { id: 3, title: 'Phase 3: Foundation Figures 4–5 and Blending', range: 'Lessons 13–20', principle: 'Constant adaptation, not fixed routines', summary: 'Add new material, then blend it into flexible, responsive dancing.' },
  { id: 4, title: 'Phase 4: Slow Motion Technique', range: 'Lessons 21–24', principle: 'Quality of effort over volume', summary: 'Use slow motion, stop-and-go work, and regular-speed rounds with music to improve precise movement.' },
  { id: 5, title: 'Phase 5: Single Focus & Coaching', range: 'Lessons 25–27', principle: 'Quality of effort over volume', summary: 'Choose one high-value focus at a time, then use coaching to sharpen it.' },
  { id: 6, title: 'Phase 6: Video & Progress Check', range: 'Lessons 28–30', principle: 'Record and review · Personalization', summary: 'Use video evidence to review change and choose the next personal training priority.' },
];

const task = (minutes, type, dance, frame, detail, figures = '') => ({ minutes, type, dance, frame, detail, figures });
const foundation = (id, dance, style, openDetail, extras = []) => ({
  id, phase: 1, title: dance, style, focus: `Foundation figures 1–3 in ${dance}.`,
  tasks: [task(3, 'Warm up', 'All', 'General', 'Warm up'), task(15, 'Closed figures', dance, 'Closed', `Closed ${dance} figures 1–3`, figureText(dance, 1, 3)), task(20, 'Open work', dance, 'Open', openDetail), ...extras],
});
function figureText(dance, start, end) { return (FIGURES[dance] || []).slice(start - 1, end).map((x, i) => `${start + i}. ${x}`).join('\n'); }

const lessons = [
  { id:1, phase:1, title:'Waltz', style:'Smooth', focus:'Foundation figures 1–3, then use them in Open Waltz.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Waltz','Closed','Review Waltz figures 1–3',figureText('Waltz',1,3)),task(12,'Closed figures','Waltz','Closed','Closed figures 1–3',figureText('Waltz',1,3)),task(15,'Open work','Waltz','Open','Open Waltz'),task(5,'Preview','All Smooth','N/A','Preview Smooth dances')] },
  { id:2, phase:1, title:'Cha Cha', style:'Rhythm', focus:'Foundation figures 1–3, Open Cha Cha connection, and arm styling.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Cha Cha','Closed','Review closed Cha Cha figures',figureText('Cha Cha',1,3)),task(15,'Closed figures','Cha Cha','Closed','Closed figures 1–3',figureText('Cha Cha',1,3)),task(15,'Open work','Cha Cha','Open','Open Cha Cha connection'),task(5,'Styling','Cha Cha','N/A','Arm styling')] },
  { id:3, phase:1, title:'Tango & Foxtrot', style:'Smooth', focus:'Build Tango figures 1–3 while exploring Open Foxtrot.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Preview','Waltz','Closed','Preview Waltz closed figures'),task(10,'Closed figures','Tango','Closed','Closed figures 1–3',figureText('Tango',1,3)),task(20,'Open work','Foxtrot','Open','Open Foxtrot')] },
  { id:4, phase:1, title:'Rumba', style:'Rhythm', focus:'Foundation figures 1–3 and Open Rumba connection.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Cha Cha','Closed','Review Cha Cha figures'),task(15,'Closed figures','Rumba','Closed','Closed figures 1–3',figureText('Rumba',1,3)),task(20,'Open work','Rumba','Open','Open Rumba connection')] },
  { id:5, phase:1, title:'Foxtrot', style:'Smooth', focus:'Foundation figures 1–3 with focused Open Foxtrot footwork.', tasks:[task(3,'Warm up','All','General','Warm up'),task(10,'Review','Waltz & Tango','Closed','Review closed figures 1–3'),task(15,'Closed figures','Foxtrot','Closed','Closed figures 1–3',figureText('Foxtrot',1,3)),task(12,'Open work','Foxtrot','Open','Open Foxtrot footwork')] },
  { id:6, phase:1, title:'East Coast Swing', style:'Rhythm', focus:'Foundation figures 1–3 and Open Swing connection.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Rumba','Closed','Review closed figures 1–3'),task(15,'Closed figures','East Coast Swing','Closed','Closed figures 1–3',figureText('East Coast Swing',1,3)),task(20,'Open work','East Coast Swing','Open','Open Swing connection')] },
  { id:7, phase:1, title:'Viennese Waltz', style:'Smooth', focus:'Foundation figures 1–3 with Open work and closed Smooth rounds.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Foxtrot','Closed','Review closed figures 1–3'),task(15,'Closed figures','Viennese Waltz','Closed','Closed figures 1–3',figureText('Viennese Waltz',1,3)),task(20,'Open work','Viennese Waltz','Open','Open Viennese Waltz'),task(10,'Rounds','All Smooth','Closed','Closed Smooth rounds')] },
  { id:8, phase:1, title:'Bolero & Mambo', style:'Rhythm', focus:'Foundation figures in Bolero and Mambo, then closed rounds.', tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','East Coast Swing','Closed','Review closed figures 1–3'),task(15,'Closed figures','Bolero','Closed','Closed figures 1–3',figureText('Bolero',1,3)),task(15,'Closed figures','Mambo','Closed','Closed figures 1a–3','1a. Mambo Basic\n1b. Progressive Basic\n2. Cross Body Lead\n3. Break Steps'),task(10, 'Rounds','All','Closed','Closed rounds')] },
  { id:9, phase:1, title:'Foundation Review', style:'Smooth & Rhythm', focus:'Review all closed Rhythm and Smooth material.', tasks:[task(3,'Warm up','All','General','Warm up'),task(20,'Review','All Rhythm','Closed','Review closed Rhythm'),task(20,'Review','All Smooth','Closed','Review closed Smooth')] },
  { id:10,phase:2,title:'Smooth Rounds Test',style:'Smooth',focus:'Test early material in open and closed rounds.',tasks:[task(3,'Warm up','All','General','Warm up'),task(20,'Rounds','All Smooth','Open','Open Smooth rounds'),task(20,'Rounds','All Smooth','Closed','Closed Smooth rounds')]},
  { id:11,phase:2,title:'Open Bolero & Mambo',style:'Rhythm',focus:'Apply appearance in Bolero and footwork in Open Mambo.',tasks:[task(3,'Warm up','All','General','Warm up'),task(15,'Open work','Bolero','Open','Open Bolero appearance'),task(20,'Open work','Mambo','Open','Open Mambo figures and footwork')]},
  { id:12,phase:2,title:'Rhythm Rounds Test',style:'Rhythm',focus:'Test early Rhythm material in closed and open rounds.',tasks:[task(3,'Warm up','All','General','Warm up'),task(10,'Rounds','All Rhythm','Closed','Closed Rhythm rounds'),task(20,'Rounds','All Rhythm','Open','Open Rhythm rounds')]},
  ...['Waltz','Cha Cha','Tango','Rumba','Foxtrot','East Coast Swing','Viennese Waltz'].map((dance,index) => ({ id:index+13,phase:3,title:dance,style:['Waltz','Tango','Foxtrot','Viennese Waltz'].includes(dance)?'Smooth':'Rhythm',focus:`Add ${dance} figures 4–5${index >= 4 ? ' and blend them into rounds.' : '.'}`,tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review',dance,'Closed',`Review closed ${dance}`),task(10,'Closed figures',dance,'Closed','Closed figures 4–5',figureText(dance,4,5)),...(index>=4?[task(5,'Blending','All','General','Blend all figures')]:[]),task(index>=4?17:20,index===6?'Expression':'Rounds',index===6?'All Smooth':(['Waltz','Tango','Foxtrot','Viennese Waltz'].includes(dance)?'All Smooth':'All Rhythm'),index===6?'Open':'Open',index===6?'Open Smooth expression':(['Waltz','Tango','Foxtrot','Viennese Waltz'].includes(dance)?'Open Smooth rounds':'Open Rhythm rounds'))] })),
  {id:20,phase:3,title:'Bolero & Mambo',style:'Rhythm',focus:'Add figures 4–5, blend Bolero and Mambo, and use closed rounds.',tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Review','Bolero','Closed','Review closed Bolero'),task(5,'Closed figures','Bolero','Closed','Closed figures 4–5',figureText('Bolero',4,5)),task(5,'Closed figures','Mambo','Closed','Closed figures 4–5',figureText('Mambo',4,5)),task(5,'Blending','Bolero & Mambo','Closed','Blend all figures'),task(10,'Blending','Bolero & Mambo','N/A','Blend all figures'),task(10,'Rounds','All','Closed','Closed rounds')]},
  {id:21,phase:4,title:'Closed Smooth in Slow Motion',style:'Smooth',focus:'Refine forward-and-back technique, then test it at regular speed with music.',tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Technique','All','General','Forward and back technique'),task('2 rounds','Slow motion','All Smooth','Closed','Closed Bronze Smooth rounds in slow motion'),task('2 rounds','Regular speed','All Smooth','Closed','Regular Speed Rounds with music')]},
  {id:22,phase:4,title:'Open Smooth in Slow Motion',style:'Smooth',focus:'Use controlled movement in Open Waltz, Viennese Waltz, and Foxtrot.',tasks:[task(3,'Warm up','All','General','Warm up'),task(5,'Technique','All','General','Forward and backward technique'),task('rounds','Slow motion','Waltz, Viennese Waltz & Foxtrot','Open','Open slow-motion round, then stop-and-go round'),task('round','Regular speed','All Smooth','Open','Regular Speed Round with music')]},
  {id:23,phase:4,title:'Closed Rhythm in Slow Motion',style:'Rhythm',focus:'Apply Lesson 21’s technique format to closed Bronze Rhythm.',tasks:[task(3,'Warm up','All','General','Warm up'),task('rounds','Slow motion','All Rhythm','Closed','Closed Bronze Rhythm rounds in slow motion'),task('rounds','Regular speed','All Rhythm','Closed','Regular Speed Rounds with music')]},
  {id:24,phase:4,title:'Open Rhythm in Slow Motion',style:'Rhythm',focus:'Apply the slow-motion and music-round format to open Rhythm.',tasks:[task(3,'Warm up','All','General','Warm up'),task('rounds','Slow motion','All Rhythm','Open','Open Rhythm slow-motion and stop-and-go rounds'),task('rounds','Regular speed','All Rhythm','Open','Regular Speed Rounds with music')]},
  {id:25,phase:5,title:'Posture Focus',style:'Smooth & Rhythm',focus:'Dance while thinking about one thing only: posture.',tasks:[task(3,'Warm up','All','General','Warm up'),task(10,'Single focus','All Smooth','Closed','Dance closed Smooth; only think about posture'),task(10,'Single focus','All Rhythm','Closed','Dance closed Rhythm; only think about posture'),task('','Rounds','All','General','Fast Smooth and Rhythm rounds')]},
  {id:26,phase:5,title:'Connection & Technique',style:'Smooth & Rhythm',focus:'Refine connection and technique, then work at regular speed.',tasks:[task(3,'Warm up','All','General','Warm up'),task(10,'Technique','All','General','Connection and technique'),task('','Rounds','All','General','Smooth and Rhythm fast rounds')]},
  {id:27,phase:5,title:'Studio Coaching',style:'General',focus:'Receive focused coaching on body mechanics.',tasks:[task('','Coaching','All','General','Heel and leg action technique; body movement')]},
  {id:28,phase:6,title:'Closed Dance Video',style:'Smooth & Rhythm',focus:'Capture evidence of closed dancing at multiple speeds.',tasks:[task(3,'Warm up','All','General','Warm up'),task('','Video','All','Closed','Video slow motion, stop-and-go, and Regular Speed Rounds with music for closed Smooth and Rhythm')]},
  {id:29,phase:6,title:'Open Dance Video',style:'Smooth & Rhythm',focus:'Repeat the video protocol for the open dances.',tasks:[task(3,'Warm up','All','General','Warm up'),task('','Video','All','Open','Same video protocol for open dances')]},
  {id:30,phase:6,title:'Progress Check',style:'General',focus:'Compare videos, identify the useful next focus, and personalize the plan.',tasks:[task('','Progress check','All','General','Compare videos and define the next training focus')]},
];

const $ = (selector) => document.querySelector(selector);
const configKey = 'dancesport30_config'; const localEntriesKey = 'dancesport30_entries';
let state = { view:'detail', query:'', phase:'all', instructor:'all', entries: [], config: JSON.parse(localStorage.getItem(configKey) || 'null'), session: JSON.parse(localStorage.getItem('dancesport30_session') || 'null') };
const phaseFor = (id) => phases.find((phase) => phase.id === id);
const safe = (text='') => String(text).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function getEntries() { return JSON.parse(localStorage.getItem(localEntriesKey) || '[]'); }
function saveLocal(entry) { const entries = getEntries(); entries.unshift(entry); localStorage.setItem(localEntriesKey, JSON.stringify(entries)); return entries; }
function headers() { return { apikey: state.config.key, Authorization:`Bearer ${state.session.access_token}`, 'Content-Type':'application/json' }; }
async function loadEntries() {
  if (!state.config || !state.session) { state.entries = getEntries(); render(); return; }
  const response = await fetch(`${state.config.url}/rest/v1/progress_entries?select=*&order=session_date.desc,created_at.desc`, { headers:headers() });
  if (!response.ok) { state.entries = getEntries(); setSync('Sync needs attention'); render(); return; }
  state.entries = await response.json(); setSync(`Shared · ${state.session.user.email}`); render();
}
async function saveEntry(entry) {
  if (!state.config || !state.session) { state.entries = saveLocal(entry); setSync('Local draft · connect sync'); render(); return; }
  const payload = { lesson_id:entry.lesson_id, instructor:entry.instructor, status:entry.status, minutes:entry.minutes || null, session_date:entry.session_date, notes:entry.notes || null, video_url:entry.video_url || null, created_by:state.session.user.id };
  const response = await fetch(`${state.config.url}/rest/v1/progress_entries`, {method:'POST',headers:{...headers(),Prefer:'return=representation'},body:JSON.stringify(payload)});
  if (!response.ok) throw new Error('The entry could not be saved to shared sync.');
  state.entries.unshift((await response.json())[0]); render();
}
function setSync(message) { $('#sync-state').textContent = message; }
function filteredLessons() { return lessons.filter(lesson => (state.phase === 'all' || lesson.phase === Number(state.phase)) && (`${lesson.id} ${lesson.title} ${lesson.style} ${lesson.focus} ${lesson.tasks.map(t=>`${t.dance} ${t.detail} ${t.figures}`).join(' ')}`.toLowerCase().includes(state.query.toLowerCase()))); }
function entriesFor(lessonId) { return state.entries.filter(entry => Number(entry.lesson_id) === lessonId && (state.instructor === 'all' || entry.instructor === state.instructor)); }
function lessonStatus(lesson) { const entries = entriesFor(lesson.id); return entries.some(e=>e.status==='mastered')?'mastered':entries.some(e=>e.status==='confident')?'confident':entries.some(e=>e.status==='needs-review')?'needs-review':entries.length?'practiced':''; }
function overview() { const completed = new Set(state.entries.filter(e=>e.status==='mastered'||e.status==='confident').map(e=>e.lesson_id)).size; const minutes = state.entries.reduce((sum,e)=>sum + Number(e.minutes || 0),0); $('#progress-overview').innerHTML = `<div class="metric"><b>${completed}<small>/30</small></b><span>Confident or mastered</span></div><div class="metric"><b>${minutes}</b><span>Minutes logged</span></div><div class="metric"><b>${state.entries.length}</b><span>Practice entries</span></div>`; }
function detailView(items) { return `<div class="lesson-list">${items.map(lesson => { const phase=phaseFor(lesson.phase); const entries=entriesFor(lesson.id); const status=lessonStatus(lesson); return `<details class="lesson-card"><summary><span class="lesson-number">${String(lesson.id).padStart(2,'0')}</span><span><h2>${safe(lesson.title)}</h2><p class="lesson-meta">${safe(lesson.style)} · ${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><div class="lesson-head"><div><p class="eyebrow">Lesson focus</p><p class="lesson-focus">${safe(lesson.focus)}</p></div><button class="button log-button" data-lesson="${lesson.id}">Log progress</button></div><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Dance / frame</th><th>Activity</th></tr></thead><tbody>${lesson.tasks.map(t=>`<tr><td>${safe(t.minutes)}</td><td>${safe(t.type)}</td><td>${safe(t.dance)}<br><small>${safe(t.frame)}</small></td><td>${safe(t.detail)}${t.figures?`<br><span class="figures">${safe(t.figures)}</span>`:''}</td></tr>`).join('')}</tbody></table>${entryMarkup(entries,status)}</div></details>`; }).join('')}</div>`; }
function entryMarkup(entries,status) { if (!entries.length) return `<p class="lesson-meta">No progress has been logged for this lesson yet.</p>`; return `<ul class="entry-list">${entries.map(entry=>`<li><span class="status-pill ${safe(entry.status)}">${safe(entry.status.replace('-',' '))}</span> <strong>${safe(entry.instructor)}</strong> · ${safe(entry.session_date)}${entry.minutes?` · ${entry.minutes} min`:''}<small>${safe(entry.notes || 'No notes added.')}${entry.video_url?` · <a href="${safe(entry.video_url)}" target="_blank" rel="noreferrer">Video</a>`:''}</small></li>`).join('')}</ul>`; }
function summaryView(items) { return `<div class="summary-grid">${items.map(lesson=>{const phase=phaseFor(lesson.phase);const status=lessonStatus(lesson);return `<article class="summary-card"><div class="summary-top"><span class="lesson-number">LESSON ${String(lesson.id).padStart(2,'0')}</span>${status?`<span class="status-pill ${status}">${status.replace('-',' ')}</span>`:''}</div><h2>${safe(lesson.title)}</h2><p>${safe(lesson.focus)}</p><p class="lesson-meta">${safe(lesson.style)} · ${safe(phase.principle)}</p><button class="button log-button" data-lesson="${lesson.id}">Log progress</button></article>`}).join('')}</div>`; }
function phaseView() { return `<div class="phase-grid">${phases.map(phase=>{const phaseLessons=lessons.filter(l=>l.phase===phase.id);const progress=new Set(state.entries.filter(e=>phaseLessons.some(l=>l.id===Number(e.lesson_id))&&(e.status==='mastered'||e.status==='confident')).map(e=>e.lesson_id)).size;return `<article class="phase-card"><span class="phase-number">0${phase.id}</span><div><p class="eyebrow">${phase.range}</p><h2>${phase.title}</h2><p>${phase.summary}</p><p class="lesson-meta">${progress}/${phaseLessons.length} lessons confident or mastered</p></div><span class="principle-pill">${phase.principle}</span></article>`;}).join('')}</div>`; }
function render() { overview(); const items=filteredLessons(); $('#view-root').innerHTML = items.length ? (state.view==='detail'?detailView(items):state.view==='summary'?summaryView(items):phaseView()) : $('#empty-template').innerHTML; document.querySelectorAll('.log-button').forEach(button=>button.addEventListener('click',openProgress)); }
function openProgress(event) { const lesson=lessons.find(item=>item.id===Number(event.currentTarget.dataset.lesson)); $('#lesson-id').value=lesson.id; $('#dialog-title').textContent=`Lesson ${String(lesson.id).padStart(2,'0')} · ${lesson.title}`; $('#session-date').value=new Date().toISOString().slice(0,10); $('#progress-dialog').showModal(); }

$('#phase-filter').innerHTML += phases.map(phase=>`<option value="${phase.id}">${phase.title}</option>`).join('');
document.querySelectorAll('.view-tab').forEach(tab=>tab.addEventListener('click',()=>{state.view=tab.dataset.view;document.querySelectorAll('.view-tab').forEach(item=>item.classList.toggle('active',item===tab));render();}));
$('#search').addEventListener('input',event=>{state.query=event.target.value;render();}); $('#phase-filter').addEventListener('change',event=>{state.phase=event.target.value;render();}); $('#instructor-filter').addEventListener('change',event=>{state.instructor=event.target.value;render();});
$('#cancel-progress').addEventListener('click',()=>$('#progress-dialog').close());
$('#progress-form').addEventListener('submit',async event=>{event.preventDefault(); const form=new FormData(event.currentTarget); const videoUrl=form.get('video-url').trim(); if(videoUrl){try{const parsed=new URL(videoUrl);if(!['http:','https:'].includes(parsed.protocol))throw new Error();}catch{alert('Use a valid http or https video link.');return;}} const entry={lesson_id:Number(form.get('lesson-id')),instructor:form.get('instructor'),status:form.get('status'),minutes:Number(form.get('minutes'))||null,session_date:form.get('date'),notes:form.get('notes').trim(),video_url:videoUrl,created_at:new Date().toISOString()}; try{await saveEntry(entry);$('#progress-dialog').close();event.currentTarget.reset();}catch(error){alert(error.message);}});
$('#account-button').addEventListener('click',()=>{if(state.config){$('#supabase-url').value=state.config.url;$('#supabase-key').value=state.config.key;}$('#account-dialog').showModal();}); $('#cancel-account').addEventListener('click',()=>$('#account-dialog').close());
function accountConfig() { const url=$('#supabase-url').value.trim().replace(/\/$/,'');const key=$('#supabase-key').value.trim();if(!url||!key)throw new Error('Enter the Supabase project URL and anon key.');state.config={url,key};localStorage.setItem(configKey,JSON.stringify(state.config));return state.config; }
async function account(action) { const message=$('#account-message');try { const config=accountConfig(); const email=$('#email').value.trim(); const password=$('#password').value;if(!email||!password)throw new Error('Enter an email and password.'); const response=await fetch(`${config.url}/auth/v1/${action}`,{method:'POST',headers:{apikey:config.key,'Content-Type':'application/json'},body:JSON.stringify({email,password})});const data=await response.json();if(!response.ok)throw new Error(data.msg||data.error_description||'Account action failed.');if(action==='signup'&&!data.session){message.textContent='Account created. Confirm the email, then sign in.';return;}state.session=data.session;localStorage.setItem('dancesport30_session',JSON.stringify(state.session));$('#account-dialog').close();await loadEntries();}catch(error){message.textContent=error.message;}}
$('#sign-in').addEventListener('click',()=>account('token?grant_type=password')); $('#sign-up').addEventListener('click',()=>account('signup'));
if(state.config&&state.session) setSync(`Shared · ${state.session.user.email}`); else setSync('Local draft'); loadEntries();

// Detailed-plan refinements: task-level tracking, visible Style/Frame fields, and repeatable videos.
function normalizeEntry(entry) {
  const statusMap = { mastered: 'done', confident: 'done', 'needs-review': 'in-progress', practiced: 'in-progress' };
  return { ...entry, task_index: entry.task_index ?? 0, status: statusMap[entry.status] || entry.status || 'not-started', video_urls: entry.video_urls || (entry.video_url ? [entry.video_url] : []) };
}
function getEntries() { return JSON.parse(localStorage.getItem(localEntriesKey) || '[]').map(normalizeEntry); }
async function loadEntries() {
  if (!state.config || !state.session) { state.entries = getEntries(); render(); return; }
  const response = await fetch(`${state.config.url}/rest/v1/progress_entries?select=*&order=session_date.desc,created_at.desc`, { headers: headers() });
  if (!response.ok) { state.entries = getEntries(); setSync('Sync needs attention'); render(); return; }
  state.entries = (await response.json()).map(normalizeEntry); setSync(`Shared · ${state.session.user.email}`); render();
}
function taskEntries(lessonId, taskIndex) {
  return state.entries.filter((entry) => Number(entry.lesson_id) === lessonId && Number(entry.task_index) === taskIndex && (state.instructor === 'all' || entry.instructor === state.instructor));
}
function taskStatus(lessonId, taskIndex) { return taskEntries(lessonId, taskIndex)[0]?.status || 'not-started'; }
function lessonStatus(lesson) {
  const statuses = lesson.tasks.map((_, index) => taskStatus(lesson.id, index));
  return statuses.every((status) => status === 'done') ? 'done' : statuses.some((status) => status === 'in-progress' || status === 'done') ? 'in-progress' : 'not-started';
}
function displayFrame(frame) { return frame === 'General' || frame === 'N/A' ? 'NA' : frame; }
function visibleFrames(lesson) { return [...new Set(lesson.tasks.map((item) => displayFrame(item.frame)))].join(' + ') || 'NA'; }
function detailedTitle(lesson) {
  const frames = { Closed: [], Open: [] };
  lesson.tasks.forEach((item) => { if (frames[item.frame] && item.dance !== 'All' && !frames[item.frame].includes(item.dance)) frames[item.frame].push(item.dance); });
  const closed = frames.Closed.join(' & '); const open = frames.Open.join(' & ');
  const closedTitle = lesson.id === 5 ? closed.replace('Waltz & Tango & Foxtrot', 'Waltz, Tango & Foxtrot') : closed;
  if (closedTitle && open) return `Closed ${closedTitle} | Open ${open}`;
  return closed ? `Closed ${closed}` : open ? `Open ${open}` : lesson.title;
}
function entryMarkup(entries) {
  if (!entries.length) return '';
  return `<ul class="entry-list">${entries.map((entry) => { const links = [...(entry.video_urls || []), ...(entry.video_url ? [entry.video_url] : [])]; return `<li><strong>${safe(entry.instructor)}</strong> · ${safe(entry.session_date)}<small>${safe(entry.notes || 'No notes added.')}${links.length ? `<span class="video-links">${links.map((url, index) => `<a href="${safe(url)}" target="_blank" rel="noreferrer">Video ${index + 1}</a>`).join(' · ')}</span>` : ''}</small></li>`; }).join('')}</ul>`;
}
function overview() {
  const completed = lessons.filter((lesson) => lessonStatus(lesson) === 'done').length;
  const started = lessons.filter((lesson) => lessonStatus(lesson) !== 'not-started').length;
  $('#progress-overview').innerHTML = `<div class="metric"><b>${completed}<small>/30</small></b><span>Lessons done</span></div><div class="metric"><b>${started}<small>/30</small></b><span>Lessons started</span></div><div class="metric"><b>${state.entries.length}</b><span>Task updates</span></div>`;
}
function detailView(items) {
  return `<div class="lesson-list">${items.map((lesson) => { const phase = phaseFor(lesson.phase); return `<details class="lesson-card"><summary><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><div class="lesson-head"><div><p class="eyebrow">Lesson focus</p><p class="lesson-focus">${safe(lesson.focus)}</p><dl class="lesson-fields"><div><dt>Style</dt><dd>${safe(lesson.style)}</dd></div><div><dt>Frame</dt><dd>${safe(visibleFrames(lesson))}</dd></div></dl></div></div><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Dance / frame</th><th>Activity</th><th>Progress</th></tr></thead><tbody>${lesson.tasks.map((item, index) => { const entries = taskEntries(lesson.id, index); const status = taskStatus(lesson.id, index); return `<tr><td>${safe(item.minutes)}</td><td>${safe(item.type)}</td><td>${safe(item.dance)}<br><small>${safe(item.frame)}</small></td><td>${safe(item.detail)}${item.figures ? `<br><span class="figures">${safe(item.figures)}</span>` : ''}</td><td><div class="task-action"><span class="status-pill ${status}">${safe(status.replace('-', ' '))}</span><button class="button button-quiet task-log-button" data-lesson="${lesson.id}" data-task="${index}">Log progress</button></div>${entryMarkup(entries)}</td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}</div>`;
}
function summaryView(items) {
  return `<div class="summary-grid">${items.map((lesson) => { const phase = phaseFor(lesson.phase); const status = lessonStatus(lesson); return `<article class="summary-card"><div class="summary-top"><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span class="status-pill ${status}">${status.replace('-', ' ')}</span></div><h2>${safe(detailedTitle(lesson))}</h2><p>${safe(lesson.focus)}</p><p class="lesson-meta">${safe(lesson.style)} · ${safe(visibleFrames(lesson))}</p><p class="lesson-meta">Open Detailed plan to log each task.</p></article>`; }).join('')}</div>`;
}
function phaseView() {
  return `<div class="phase-grid">${phases.map((phase) => { const phaseLessons = lessons.filter((lesson) => lesson.phase === phase.id); const progress = phaseLessons.filter((lesson) => lessonStatus(lesson) === 'done').length; return `<article class="phase-card"><span class="phase-number">0${phase.id}</span><div><p class="eyebrow">${phase.range}</p><h2>${phase.title}</h2><p>${phase.summary}</p><p class="lesson-meta">${progress}/${phaseLessons.length} lessons done</p></div><span class="principle-pill">${phase.principle}</span></article>`; }).join('')}</div>`;
}
function render() {
  overview(); const items = filteredLessons();
  $('#view-root').innerHTML = items.length ? (state.view === 'detail' ? detailView(items) : state.view === 'summary' ? summaryView(items) : phaseView()) : $('#empty-template').innerHTML;
  document.querySelectorAll('.task-log-button').forEach((button) => button.addEventListener('click', openProgress));
}
function openProgress(event) {
  const lesson = lessons.find((item) => item.id === Number(event.currentTarget.dataset.lesson)); const taskIndex = Number(event.currentTarget.dataset.task); const item = lesson.tasks[taskIndex];
  $('#lesson-id').value = lesson.id; $('#task-index').value = taskIndex; $('#dialog-title').textContent = `Lesson ${String(lesson.id).padStart(2, '0')} · ${item.type}: ${item.dance}`; $('#session-date').value = new Date().toISOString().slice(0, 10); $('#progress-dialog').showModal();
}
async function saveEntry(entry) {
  if (!state.config || !state.session) { state.entries = saveLocal(entry); setSync('Local draft · connect sync'); render(); return; }
  const payload = { lesson_id: entry.lesson_id, task_index: entry.task_index, instructor: entry.instructor, status: entry.status, session_date: entry.session_date, notes: entry.notes || null, video_urls: entry.video_urls || [], created_by: state.session.user.id };
  const response = await fetch(`${state.config.url}/rest/v1/progress_entries`, { method: 'POST', headers: { ...headers(), Prefer: 'return=representation' }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error('The entry could not be saved to shared sync.'); state.entries.unshift((await response.json())[0]); render();
}

const progressForm = $('#progress-form');
const freshProgressForm = progressForm.cloneNode(true);
progressForm.replaceWith(freshProgressForm);
$('#cancel-progress').addEventListener('click', () => $('#progress-dialog').close());
$('#add-video-link').addEventListener('click', () => $('#video-links').insertAdjacentHTML('beforeend', '<input class="video-url" type="url" placeholder="https://… (optional)" />'));
freshProgressForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const urls = [...document.querySelectorAll('.video-url')].map((input) => input.value.trim()).filter(Boolean);
  try { urls.forEach((url) => { const parsed = new URL(url); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); }); } catch { alert('Use valid http or https video links.'); return; }
  const form = new FormData(freshProgressForm); const entry = { lesson_id: Number(form.get('lesson-id')), task_index: Number(form.get('task-index')), instructor: form.get('instructor'), status: form.get('status'), session_date: form.get('date'), notes: form.get('notes').trim(), video_urls: urls, created_at: new Date().toISOString() };
  try { await saveEntry(entry); $('#progress-dialog').close(); freshProgressForm.reset(); $('#video-links').innerHTML = '<input class="video-url" type="url" placeholder="https://… (optional)" />'; } catch (error) { alert(error.message); }
});
function taskStyle(item, lesson) {
  if (item.type === 'Warm up') return 'NA';
  if (item.dance === 'All Smooth') return 'Smooth';
  if (item.dance === 'All Rhythm') return 'Rhythm';
  if (FIGURES[item.dance]) return ['Waltz', 'Tango', 'Foxtrot', 'Viennese Waltz'].includes(item.dance) ? 'Smooth' : 'Rhythm';
  return lesson.style;
}
function detailView(items) {
  return `<div class="lesson-list">${items.map((lesson) => { const phase = phaseFor(lesson.phase); return `<details class="lesson-card"><summary><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Style</th><th>Frame</th><th>Dance</th><th>Activity</th><th>Progress</th></tr></thead><tbody>${lesson.tasks.map((item, index) => { const entries = taskEntries(lesson.id, index); const status = taskStatus(lesson.id, index); return `<tr><td>${safe(item.minutes)}</td><td>${safe(item.type)}</td><td>${safe(taskStyle(item, lesson))}</td><td>${safe(displayFrame(item.frame))}</td><td>${safe(item.type === 'Warm up' ? 'NA' : item.dance)}</td><td>${safe(item.detail)}${item.figures ? `<br><span class="figures">${safe(item.figures)}</span>` : ''}</td><td><div class="task-action"><span class="status-pill ${status}">${safe(status.replace('-', ' '))}</span><button class="button button-quiet task-log-button" data-lesson="${lesson.id}" data-task="${index}">Log progress</button></div>${entryMarkup(entries)}</td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}</div>`;
}
function isNonDanceActivity(item) { return ['Warm up', 'Preview'].includes(item.type); }
function displayBlock(lesson, item, index) {
  if (lesson.id === 1 && index === 1 && item.type === 'Review') return 'New';
  if (lesson.id === 1 && index === 2 && item.type === 'Closed figures') return 'Practice';
  if (lesson.id === 2 && index === 1 && item.type === 'Review') return 'New';
  if (lesson.id === 2 && index === 2 && item.type === 'Closed figures') return 'Practice';
  if (lesson.id >= 3 && lesson.id <= 8 && (item.type === 'Review' || item.type === 'Preview')) return 'Review';
  if (lesson.id >= 3 && lesson.id <= 8 && item.type === 'Closed figures') return 'New';
  if (lesson.id >= 13 && lesson.id <= 19 && index === 1 && item.type === 'Review') return 'New';
  if (lesson.id >= 13 && lesson.id <= 19 && item.type === 'Closed figures') return 'Practice';
  if (lesson.id === 20 && index === 1 && item.type === 'Review') return 'New';
  if (lesson.id === 20 && index === 2 && item.type === 'Closed figures') return 'Practice';
  if (lesson.id === 20 && index === 3 && item.type === 'Closed figures') return 'New';
  if (lesson.id === 20 && index === 4 && item.type === 'Blending') return 'Practice';
  if (item.type === 'Open work') return 'Practice';
  return item.type;
}
function taskStyle(item, lesson) {
  if (lesson.id === 1 && item.type === 'Preview' && item.minutes === 5) return 'Smooth';
  if (lesson.id === 3 && item.type === 'Preview' && item.minutes === 5) return 'Smooth';
  if (isNonDanceActivity(item)) return 'NA';
  if (item.dance === 'All Smooth') return 'Smooth';
  if (item.dance === 'All Rhythm') return 'Rhythm';
  if (FIGURES[item.dance]) return ['Waltz', 'Tango', 'Foxtrot', 'Viennese Waltz'].includes(item.dance) ? 'Smooth' : 'Rhythm';
  return lesson.style;
}
function totalAllocated(lesson) {
  return lesson.tasks.reduce((total, item) => total + (Number.isFinite(Number(item.minutes)) ? Number(item.minutes) : 0), 0);
}
function detailView(items) {
  return `<div class="lesson-list">${items.map((lesson) => { const phase = phaseFor(lesson.phase); return `<details class="lesson-card"><summary><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><div class="lesson-action-bar"><span class="lesson-total">Total allocated: <b>${totalAllocated(lesson)} min</b></span><button class="button lesson-log-button" data-lesson="${lesson.id}">Log progress</button></div><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Frame</th><th>Style</th><th>Dance</th><th>Activity</th><th>Progress</th></tr></thead><tbody>${lesson.tasks.map((item, index) => { const entries = taskEntries(lesson.id, index); const status = taskStatus(lesson.id, index); const isLessonOnePreview = lesson.id === 1 && index === 4; const isLessonThreeReview = lesson.id === 3 && index === 1; const block = displayBlock(lesson, item, index); const figures = block === 'Practice' && item.type === 'Closed figures' ? '' : item.figures; const initialFoundationReview = (lesson.id === 1 || lesson.id === 2) && index === 1; const laterFoundationReview = lesson.id >= 3 && lesson.id <= 8 && block === 'Review'; const activity = initialFoundationReview || (block === 'New' && figures) ? 'Closed figures 1–3' : laterFoundationReview ? 'Review closed figures 1–3' : item.detail; return `<tr><td>${safe(item.minutes)}</td><td>${safe(block)}</td><td>${safe(isLessonOnePreview ? 'Open' : isLessonThreeReview ? 'Closed' : isNonDanceActivity(item) ? 'NA' : displayFrame(item.frame))}</td><td>${safe(taskStyle(item, lesson))}</td><td>${safe(isLessonOnePreview || isLessonThreeReview ? 'Waltz' : isNonDanceActivity(item) ? 'NA' : item.dance)}</td><td>${safe(activity)}${figures ? `<br><span class="figures">${safe(figures)}</span>` : ''}</td><td><span class="status-pill ${status}">${safe(status.replace('-', ' '))}</span>${entryMarkup(entries)}</td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}</div>`;
}
function openProgress(event) {
  const lesson = lessons.find((item) => item.id === Number(event.currentTarget.dataset.lesson));
  $('#lesson-id').value = lesson.id;
  $('#task-index').value = '0';
  $('#dialog-title').textContent = `Lesson ${String(lesson.id).padStart(2, '0')} · Log progress`;
  $('#session-date').value = new Date().toISOString().slice(0, 10);
  $('#progress-dialog').showModal();
}
function render() {
  overview(); const items = filteredLessons();
  $('#view-root').innerHTML = items.length ? (state.view === 'detail' ? detailView(items) : state.view === 'summary' ? summaryView(items) : phaseView()) : $('#empty-template').innerHTML;
  document.querySelectorAll('.lesson-log-button').forEach((button) => button.addEventListener('click', openProgress));
}
render();

const taskStatusStorageKey = 'dancesport30_task_statuses';
state.taskStatuses = JSON.parse(localStorage.getItem(taskStatusStorageKey) || '{}');
function taskStatusKey(lessonId, taskIndex) { return `${lessonId}:${taskIndex}`; }
function statusLabel(status) { return ({ 'not-started': 'Not Started', 'in-progress': 'In Progress', completed: 'Completed' })[status] || 'Not Started'; }
function taskStatus(lessonId, taskIndex) {
  const saved = (state.taskStatuses || {})[taskStatusKey(lessonId, taskIndex)];
  if (saved) return saved;
  const entry = taskEntries(lessonId, taskIndex)[0];
  return entry?.status === 'done' || entry?.status === 'mastered' || entry?.status === 'confident' ? 'completed' : entry?.status === 'needs-review' || entry?.status === 'practiced' ? 'in-progress' : 'not-started';
}
async function updateTaskStatus(lessonId, taskIndex, status) {
  state.taskStatuses[taskStatusKey(lessonId, taskIndex)] = status;
  localStorage.setItem(taskStatusStorageKey, JSON.stringify(state.taskStatuses));
  if (state.config && state.session) {
    const response = await fetch(`${state.config.url}/rest/v1/task_statuses?on_conflict=lesson_id,task_index`, { method: 'POST', headers: { ...headers(), Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify({ lesson_id: lessonId, task_index: taskIndex, status, updated_at: new Date().toISOString() }) });
    if (!response.ok) setSync('Status saved locally · shared sync needs update');
  }
  render();
}
function detailView(items) {
  return `<div class="lesson-list">${items.map((lesson) => { const phase = phaseFor(lesson.phase); return `<details class="lesson-card"><summary><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><div class="lesson-action-bar"><span class="lesson-total">Total allocated: <b>${totalAllocated(lesson)} min</b></span><button class="button lesson-log-button" data-lesson="${lesson.id}">Log progress</button></div><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Frame</th><th>Style</th><th>Dance</th><th>Activity</th><th>Progress</th></tr></thead><tbody>${lesson.tasks.map((item, index) => { const entries = taskEntries(lesson.id, index); const status = taskStatus(lesson.id, index); const isLessonOnePreview = lesson.id === 1 && index === 4; const isLessonThreeReview = lesson.id === 3 && index === 1; const block = displayBlock(lesson, item, index); const isPhaseThree = isPhaseThreeClosedFigureBlock(lesson, item, index, block); const figures = isPhaseThree ? phaseThreeFigureNames(lesson, item, index, block) : block === 'Practice' && item.type === 'Closed figures' ? '' : item.figures; const initialFoundationReview = (lesson.id === 1 || lesson.id === 2) && index === 1; const laterFoundationReview = lesson.id >= 3 && lesson.id <= 8 && block === 'Review'; const activity = isPhaseThree ? 'Closed figures 4–5' : initialFoundationReview || (block === 'New' && figures) ? 'Closed figures 1–3' : laterFoundationReview ? 'Review closed figures 1–3' : item.detail; const dance = lesson.id === 20 && index === 4 ? 'Mambo' : isLessonOnePreview || isLessonThreeReview ? 'Waltz' : isNonDanceActivity(item) ? 'NA' : item.dance; return `<tr><td>${safe(item.minutes)}</td><td>${safe(block)}</td><td>${safe(isLessonOnePreview ? 'Open' : isLessonThreeReview ? 'Closed' : isNonDanceActivity(item) ? 'NA' : displayFrame(item.frame))}</td><td>${safe(taskStyle(item, lesson))}</td><td>${safe(dance)}</td><td>${safe(activity)}${figures ? `<br><span class="figures">${safe(figures)}</span>` : ''}</td><td><select class="inline-status ${status}" data-lesson="${lesson.id}" data-task="${index}" aria-label="Progress status"><option value="not-started"${status === 'not-started' ? ' selected' : ''}>Not Started</option><option value="in-progress"${status === 'in-progress' ? ' selected' : ''}>In Progress</option><option value="completed"${status === 'completed' ? ' selected' : ''}>Completed</option></select>${entryMarkup(entries)}</td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}</div>`;
}
function render() {
  overview(); const items = filteredLessons();
  $('#view-root').innerHTML = items.length ? (state.view === 'detail' ? detailView(items) : state.view === 'summary' ? summaryView(items) : phaseView()) : $('#empty-template').innerHTML;
  document.querySelectorAll('.lesson-log-button').forEach((button) => button.addEventListener('click', openProgress));
  document.querySelectorAll('.inline-status').forEach((select) => select.addEventListener('change', (event) => updateTaskStatus(Number(event.target.dataset.lesson), Number(event.target.dataset.task), event.target.value)));
}
render();

function isPhaseThreeClosedFigureBlock(lesson, item, index, block) {
  if (lesson.id >= 13 && lesson.id <= 19) return (index === 1 && block === 'New') || item.type === 'Closed figures';
  return lesson.id === 20 && index >= 1 && index <= 4 && ['New', 'Practice'].includes(block);
}
function phaseThreeFigureNames(lesson, item, index, block) {
  return isPhaseThreeClosedFigureBlock(lesson, item, index, block) && block === 'New' ? figureText(item.dance, 4, 5) : '';
}
function detailView(items) {
  return `<div class="lesson-list">${items.map((lesson) => { const phase = phaseFor(lesson.phase); return `<details class="lesson-card"><summary><span class="lesson-number">Lesson ${String(lesson.id).padStart(2, '0')}</span><span><h2>${safe(detailedTitle(lesson))}</h2><p class="lesson-meta">${safe(phase.title)}</p></span><span class="phase-pill">${safe(phase.principle)}</span></summary><div class="lesson-body"><div class="lesson-action-bar"><span class="lesson-total">Total allocated: <b>${totalAllocated(lesson)} min</b></span><button class="button lesson-log-button" data-lesson="${lesson.id}">Log progress</button></div><table class="task-table"><thead><tr><th>Time</th><th>Block</th><th>Frame</th><th>Style</th><th>Dance</th><th>Activity</th><th>Progress</th></tr></thead><tbody>${lesson.tasks.map((item, index) => { const entries = taskEntries(lesson.id, index); const status = taskStatus(lesson.id, index); const isLessonOnePreview = lesson.id === 1 && index === 4; const isLessonThreeReview = lesson.id === 3 && index === 1; const block = displayBlock(lesson, item, index); const isPhaseThree = isPhaseThreeClosedFigureBlock(lesson, item, index, block); const figures = isPhaseThree ? phaseThreeFigureNames(lesson, item, index, block) : block === 'Practice' && item.type === 'Closed figures' ? '' : item.figures; const initialFoundationReview = (lesson.id === 1 || lesson.id === 2) && index === 1; const laterFoundationReview = lesson.id >= 3 && lesson.id <= 8 && block === 'Review'; const activity = isPhaseThree ? 'Closed figures 4–5' : initialFoundationReview || (block === 'New' && figures) ? 'Closed figures 1–3' : laterFoundationReview ? 'Review closed figures 1–3' : item.detail; const dance = lesson.id === 20 && index === 4 ? 'Mambo' : isLessonOnePreview || isLessonThreeReview ? 'Waltz' : isNonDanceActivity(item) ? 'NA' : item.dance; return `<tr><td>${safe(item.minutes)}</td><td>${safe(block)}</td><td>${safe(isLessonOnePreview ? 'Open' : isLessonThreeReview ? 'Closed' : isNonDanceActivity(item) ? 'NA' : displayFrame(item.frame))}</td><td>${safe(taskStyle(item, lesson))}</td><td>${safe(dance)}</td><td>${safe(activity)}${figures ? `<br><span class="figures">${safe(figures)}</span>` : ''}</td><td><span class="status-pill ${status}">${safe(status.replace('-', ' '))}</span>${entryMarkup(entries)}</td></tr>`; }).join('')}</tbody></table></div></details>`; }).join('')}</div>`;
}
render();
