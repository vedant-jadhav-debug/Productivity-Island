// Quiz bank sample data
const QUIZ_BANK = [
  {q:"Which planet is known as the Red Planet?",a:2,opts:["Earth","Mars","Venus","Mercury"]},
  {q:"Who invented the light bulb?",a:1,opts:["Isaac Newton","Thomas Edison","Einstein","Nikola Tesla"]},
  {q:"Which is the largest organ in the human body?",a:3,opts:["Heart","Liver","Brain","Skin"]},
  {q:"Which programming language runs in web browsers?",a:4,opts:["Python","C++","Java","JavaScript"]},
  {q:"In which year did Chandrayaan-3 land on the Moon?", a:3,opts:["2021","2022","2023","2019"]},
  {q:"What color do you get by mixing yellow and blue?", a:2, opts:["Red","Green","Purple","Brown"]},
  {q:"Who wrote 'Harry Potter'?", a:1, opts:["J.K. Rowling","Rick Riordan","Ruskin Bond","Enid Blyton"]},
  {q:"What is 9 × 8?", a:4, opts:["64","88","71","72"]},
];
function getRandomQuiz() {
  let shuffled = [...QUIZ_BANK].sort(()=>Math.random()-.5);
  return shuffled.slice(0,3); // 3 random questions
}
let user = null;
let xp = 0;
let islandLvl = 1;
let quizIndex = 0, quizList = [];
let correctCount = 0;
let rewardPopup = '';

function renderLogin() {
  document.body.style.background = "linear-gradient(135deg, #e0e7ff 0%, #fffafd 100%)";
  main.innerHTML = `
  <div class="card centered" style="margin-top:3.5rem;">
    <h1>GenZ Productivity Island 🌴</h1>
    <div style="text-align:center;color:#444;font-size:1.07rem;margin-top:1rem;">
      <b>Turn tasks & quizzes into real rewards!</b><br>
      <span style="color:#6366f1;">Ages 11–18 • <span style="font-weight:bold;">Gamified learning, daily islands, fun quizzes, rewards</span></span>
    </div>
    <form id="signupForm" class="centered" style="width:100%;margin-top:1.3rem;">
      <input class="input" required placeholder="Full Name" name="name"/>
      <input class="input" required placeholder="Age (11–18)" name="age" type="number" min="11" max="18"/>
      <select class="input" required name="gender">
          <option value="">Select Gender</option>
          <option value="male">Boy</option>
          <option value="female">Girl</option>
      </select>
      <input class="input" placeholder="Your Interests (e.g. football, art)" name="interests"/>
      <button type="submit" class="answer-btn" style="background:linear-gradient(90deg,var(--accent-1),var(--accent-2));font-size:1.14em;">Start & Build Island</button>
    </form>
    <div style="font-size:.95rem;margin-top:1.1em;color:#959fbb;letter-spacing:.01em;">Your data is local-only.</div>
  </div>`;
  document.getElementById('signupForm').onsubmit = e=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    user = {
      name:fd.get('name').trim(), age:parseInt(fd.get('age')), gender:fd.get('gender'), interests:fd.get('interests').trim()
    };
    xp = 0; islandLvl = 1; quizIndex = 0; quizList = []; correctCount = 0; rewardPopup='';
    renderDashboard();
  };
}

function renderDashboard() {
  document.body.style.background = "linear-gradient(135deg, #c7d2fe 0%, #fef9c3 100%)";
  let islandState = "neutral";
  main.innerHTML = `
    <div class="card centered" style="max-width:900px;width:99%;">
      <div style="width:100%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap">
        <div style="flex:1;min-width:200px;">
          <div class="centered" style="gap:0.2em;">
            <div style="font-size:2.2rem;background-image:linear-gradient(90deg,var(--accent-1),var(--accent-2));-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight:800;">
              Hi, ${user.name ? user.name.split(' ')[0] : 'User'}!
            </div>
            <div style="color:#6b7280;font-size:1.04rem;margin-bottom:.35em;">
              Age ${user.age} • ${user.interests||''}
            </div>
          </div>
        </div>
        <button onclick="logout()" style="padding:.5em 1.2em;font-size:1.1em;color:#e11d48;background:#fee2e2;border:none;border-radius:.6em;cursor:pointer;font-weight:700;">
          Log out
        </button>
      </div>
    </div>
    <div class="island-stage" id="island-cont">
      <div id="islandView"></div>
    </div>
    <div class="xp-bar" style="width:${(xp%50)*2}%;"></div>
    <div class="centered" style="margin:1rem auto .5rem;">
      <span style="font-weight:700;color:#818cf8;">XP:</span> <span id="xpNum">${xp}</span> &nbsp; • &nbsp;
      <span style="font-weight:600;">Level:</span> <span id="islandLevel">${Math.floor(xp/50)+1}</span> &nbsp; • &nbsp; 
      <span>Progress: ${xp%50}/50 XP</span>
    </div>
    ${rewardPopup}
    <div style="display:flex;justify-content:center;">
      <div style="flex-basis:390px">
        <div id="quizZone"></div>
      </div>
    </div>
  `;
  renderIslandView("neutral");
  renderQuiz();
}

function renderIslandView(state) {
  let man =
    state === "happy"
      ? `<div class="man happy" style="left:62%;" title="Happy Man">👋😀</div>`
      : state === "sad"
      ? `<div class="man sad" style="left:62%;" title="Sad Man">👋😕</div>`
      : `<div class="man" style="left:61.7%;">👋🙂</div>`;
  let scale = state === "grow" || state === "happy" ? 1.21 : (state === "shrink" || state === "sad" ? 0.83 : 1);
  let animClass =
    state === "grow" || state === "happy"
      ? "grow"
      : state === "shrink" || state === "sad"
      ? "shrink"
      : "";

  document.getElementById("islandView").innerHTML = `
  <svg viewBox="0 0 300 180" width="99%" class="island-art ${animClass}" style="transform: scale(${scale});">
    <!-- Water -->
    <ellipse cx="150" cy="158" rx="82" ry="22" fill="#a7f3d0"/>
    <!-- Main island blob -->
    <ellipse cx="146" cy="144" rx="62" ry="25" fill="#fde68a" stroke="#fbbf24" stroke-width="2"/>
    <!-- Palm trunk -->
    <rect x="202" y="105" width="12" height="44" rx="5.9" fill="#b87b3e"/>
    <!-- Palm leaves -->
    <ellipse cx="206" cy="98" rx="24" ry="9.8" fill="#4ade80" transform="rotate(13 206 98)" />
    <ellipse cx="211" cy="96" rx="17" ry="7" fill="#22d3ee" transform="rotate(-10 211 96)"/>
    <ellipse cx="209" cy="100" rx="15" ry="6" fill="#a3e635" transform="rotate(20 209 100)"/>
    <!-- Coconuts -->
    <circle cx="209" cy="114" r="4.1" fill="#683b17"/>
    <circle cx="202.4" cy="113.5" r="3" fill="#7b4a22"/>
    <!-- Man on island -->
  </svg>
  ${man}
  `;
}

function renderQuiz() {
  quizZone.innerHTML = '';
  if (quizList.length === 0 || quizIndex >= quizList.length) {
    quizList = getRandomQuiz();
    quizIndex = 0;
    correctCount = 0;
    setTimeout(()=>renderNewQuiz(),400);
  } else {
    renderNewQuiz();
  }
}
function renderNewQuiz() {
  if(quizIndex>=quizList.length){
    xp += correctCount * 10; // XP per correct
    rewardPopup = '';
    let emotion = correctCount == quizList.length ? "happy" : (correctCount==0 ? "sad" : (correctCount>=2?"happy":"sad"));
    renderIslandView(emotion);
    setTimeout(()=>renderIslandView(emotion),30);
    let msg = correctCount==quizList.length
        ? `Awesome! All correct 👏`
        : (correctCount>0
            ? `Nice try! ${correctCount} correct out of ${quizList.length}`
            : `Don't worry! Try next quiz!`);
    let reward = '';
    if (xp%50<10 && xp>0) { 
      reward = `<div class='reward-card'>🎁 <b>Congrats!</b> Coupon unlocked: <span style="font-family:monospace;">COUPON${Math.floor(Math.random()*9999)}</span></div>`;
    }
    rewardPopup = reward;
    setTimeout(()=>{
      quizZone.innerHTML = `<div class="quiz-card" style="text-align:center;">
        <div style="font-size:1.7em;font-weight:700;color:#38bdf8;">${msg}</div>
        <div style="font-size:1.12em;margin:.8em 0 1.1em 0;">XP Earned: ${correctCount*10}</div>
        <button class="answer-btn" onclick="startNewQuiz()">Next Quiz Set 🏝️</button>
        ${reward}
      </div>`;
      document.getElementById('xpNum').textContent = xp;
      document.getElementById('islandLevel').textContent = Math.floor(xp/50)+1;
    },800);
    return;
  }
  const quiz = quizList[quizIndex];
  quizZone.innerHTML = `
    <div class="quiz-card">
      <div style="font-size:1.13em;color:#375ad7;font-weight:700;">Q${quizIndex+1}: ${quiz.q}</div>
      <form id="quizForm" style="margin-top:.9em;">
        ${quiz.opts.map((opt,i)=>`
            <button type="button" class="answer-btn" onclick="pickAns(${i+1})">${opt}</button>
        `).join("")}
      </form>
    </div>
    <div style="text-align:center;margin-top:1em;color:#64748b;font-size:.98em;">XP per correct: 10 • Answer to grow your island!</div>
  `;
}
function pickAns(idx) {
  const quiz = quizList[quizIndex];
  if(idx==quiz.a){ correctCount++; renderIslandView("grow"); setTimeout(()=>renderIslandView("happy"),300);}
  else { renderIslandView("shrink"); setTimeout(()=>renderIslandView("sad"),300);}
  quizIndex++;
  setTimeout(()=>renderQuiz(),1100);
}
window.pickAns = pickAns;
function startNewQuiz() {
  quizIndex = 0; quizList = getRandomQuiz(); correctCount = 0; rewardPopup = '';
  renderDashboard();
}
window.startNewQuiz = startNewQuiz;
function logout() { user = null; xp=0; rewardPopup=''; renderLogin(); }
window.logout = logout;

const main = document.getElementById('main');
renderLogin();
