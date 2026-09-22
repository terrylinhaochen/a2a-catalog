const prompts = {
  crowdlisten: 'Use Skillshare to find the CrowdListen expert. I want to understand emerging use cases, recurring product feedback and topics worth watching for my product. Help me choose the correct workspace and saved workflow. Show the available sources, coverage limits, deliverable and exact price or budget. Discuss the scope with me before execution. Return the saved CrowdListen report, original evidence and usage receipt.',
  github: 'Use Skillshare to find the GitHub lead research expert. Research public MoneyPrinterTurbo stargazers or other directly evidenced project participants who may be relevant to a video-generation API for developers. Distinguish observed interest from inferred fit and do not substitute contributors for stargazers without discussing it. Start with up to five verified prospects, fewer if evidence is insufficient, with profiles, repository evidence, qualification gaps and a CSV. Show capabilities, access limits and cost, then discuss the exact scope with me before execution. No outreach.'
};
const dialog = document.querySelector('#request-dialog');
const request = document.querySelector('#request-text');
const toast = document.querySelector('#toast');
let toastTimer;
function announce(message) {
  if (dialog.open) {
    const status = dialog.querySelector('.dialog-note');
    status.setAttribute('role', 'status');
    status.textContent = message;
    return;
  }
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4200);
}
async function copy(text, fallback) {
  try {
    await navigator.clipboard.writeText(text);
    announce('Copied. Continue in your connected agent.');
  } catch {
    if (fallback instanceof HTMLTextAreaElement) { fallback.focus(); fallback.select(); }
    else {
      const range = document.createRange();
      range.selectNodeContents(fallback);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    announce('Select and copy the highlighted text.');
  }
}
for (const button of document.querySelectorAll('[data-prompt]')) {
  button.addEventListener('click', () => {
    request.value = prompts[button.dataset.prompt];
    dialog.querySelector('.dialog-note').textContent = 'Your agent will discuss the scope and ask for approval before execution.';
    dialog.showModal();
  });
}
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-connect').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.querySelector('#copy-request').addEventListener('click', () => copy(request.value, request));
document.querySelector('#copy-command').addEventListener('click', () => { const command = document.querySelector('#connect-command'); copy(command.textContent, command); });
