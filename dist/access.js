const accessGate = document.querySelector('#access-gate');
const accessForm = document.querySelector('#access-form');
const accessPasscode = document.querySelector('#access-passcode');
const accessMessage = document.querySelector('#access-message');
const accessKey = 'dancesport30_access_granted';

function openPlan() {
  accessGate.hidden = true;
}

function lockPlan() {
  localStorage.removeItem(accessKey);
  accessPasscode.value = '';
  accessMessage.textContent = '';
  accessGate.hidden = false;
  accessPasscode.focus();
}

if (localStorage.getItem(accessKey) === 'true') {
  openPlan();
}

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (accessPasscode.value.trim() === 'julia') {
    localStorage.setItem(accessKey, 'true');
    openPlan();
    return;
  }
  accessMessage.textContent = 'That passcode does not match. Please try again.';
  accessPasscode.select();
});

document.querySelector('#lock-app-button').addEventListener('click', lockPlan);
