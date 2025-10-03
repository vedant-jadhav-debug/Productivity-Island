let xp = 0, level = 1;
const xpEl = document.getElementById("xp");
const lvlEl = document.getElementById("level");
const avatar = document.getElementById("avatar");

function gainXP(amount) {
  xp += amount;
  xpEl.innerText = xp;
  if (xp >= 100 && level === 1) {
    level = 2;
    avatar.src = "https://i.ibb.co/wRwV4tj/avatar2.png";
  } else if (xp >= 200 && level === 2) {
    level = 3;
    avatar.src = "https://i.ibb.co/hVVwgdN/avatar3.png";
  }
  lvlEl.innerText = level;
}

// Polls
let currentPoll = null;
function createPoll() {
  const q = document.getElementById("poll-question").value;
  const opts = document.getElementById("poll-options").value.split(",").map(o=>o.trim());
  if (!q || opts.length < 2) return alert("Enter valid question and options");
  currentPoll = { question: q, options: opts.map(o=>({text:o,votes:0})) };
  renderPoll();
  gainXP(10);
}

function renderPoll() {
  const div = document.getElementById("poll-area");
  if (!currentPoll) { div.innerHTML = "<p>No active poll</p>"; return; }
  let html = `<h4>${currentPoll.question}</h4>`;
  currentPoll.options.forEach((opt,i)=>{
    html += `<div class="poll-option" onclick="vote(${i})">${opt.text} (${opt.votes})</div>`;
  });
  div.innerHTML = html;
}

function vote(i) {
  currentPoll.options[i].votes++;
  renderPoll();
  gainXP(5);
}

// Q&A
const qnaList = document.getElementById("qna-list");
let qna = [];
function askQuestion() {
  const text = document.getElementById("qna-input").value;
  if (!text) return;
  qna.push({text,votes:0});
  renderQna();
  document.getElementById("qna-input").value="";
  gainXP(10);
}
function renderQna() {
  qnaList.innerHTML = "";
  qna.forEach((q,i)=>{
    const div = document.createElement("div");
    div.className = "qna-item";
    div.innerHTML = `${q.text} <button onclick="upvote(${i})">▲ ${q.votes}</button>`;
    qnaList.appendChild(div);
  });
}
function upvote(i) {
  qna[i].votes++;
  renderQna();
  gainXP(3);
}