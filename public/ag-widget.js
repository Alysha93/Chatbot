(function () {
  // Configured via standard variables defined by the host site before the script loads
  const SITE_ID = window.AG_SITE_ID || 'site_demo';
  const API_URL = window.AG_API_URL || 'http://localhost:3000/api/chat';

  const rootId = 'ag-chat-root';
  if (!document.getElementById(rootId)) {
    const root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
  }
  
  const root = document.getElementById(rootId);

  const style = document.createElement("style");
  style.innerHTML = `
    .ag-chat-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 999px;
      background: linear-gradient(135deg, #7b2ff7, #f107a3);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      z-index: 9999;
      font-size: 24px;
      transition: transform 0.2s;
    }
    .ag-chat-launcher:hover {
      transform: scale(1.05);
    }
    .ag-chat-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 360px;
      height: 500px;
      max-height: calc(100vh - 120px);
      background: #0f172a;
      border: 1px solid rgba(139, 92, 246, 0.2);
      color: #f8fafc;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      transition: opacity 0.3s, transform 0.3s;
      transform-origin: bottom right;
    }
    .ag-chat-window.hidden {
      opacity: 0;
      transform: scale(0.9);
      pointer-events: none;
    }
    .ag-chat-header {
      padding: 16px;
      background: linear-gradient(135deg, #4c1d95, #7e22ce);
      font-weight: 600;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ag-chat-close {
      cursor: pointer;
      font-size: 18px;
      opacity: 0.8;
    }
    .ag-chat-close:hover { opacity: 1; }
    .ag-chat-messages {
      padding: 16px;
      flex: 1;
      overflow-y: auto;
      font-size: 14px;
      background: #020617;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ag-chat-message {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 16px;
      line-height: 1.5;
    }
    .ag-chat-message.user {
      align-self: flex-end;
      background: #6d28d9;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .ag-chat-message.bot {
      align-self: flex-start;
      background: #1e293b;
      border: 1px solid #334155;
      color: #f1f5f9;
      border-bottom-left-radius: 4px;
    }
    .ag-chat-input-row {
      display: flex;
      padding: 12px;
      border-top: 1px solid #1e293b;
      background: #0f172a;
      gap: 8px;
    }
    .ag-chat-input-row input {
      flex: 1;
      border: 1px solid #334155;
      outline: none;
      padding: 10px 14px;
      border-radius: 999px;
      font-size: 14px;
      background: #020617;
      color: #f8fafc;
      transition: border-color 0.2s;
    }
    .ag-chat-input-row input:focus {
      border-color: #8b5cf6;
    }
    .ag-chat-input-row button {
      border: none;
      border-radius: 999px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      background: linear-gradient(135deg, #7b2ff7, #f107a3);
      color: white;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .ag-chat-input-row button:hover {
      transform: scale(1.05);
    }
    .ag-chat-input-row button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("div");
  launcher.className = "ag-chat-launcher";
  launcher.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  root.appendChild(launcher);

  const chatWindow = document.createElement("div");
  chatWindow.className = "ag-chat-window hidden";
  chatWindow.innerHTML = `
    <div class="ag-chat-header">
      <span>AI Assistant</span>
      <span class="ag-chat-close">&times;</span>
    </div>
    <div class="ag-chat-messages"></div>
    <div class="ag-chat-input-row">
      <input type="text" placeholder="Type your message..." />
      <button><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
    </div>
  `;
  root.appendChild(chatWindow);

  const messagesEl = chatWindow.querySelector(".ag-chat-messages");
  const inputEl = chatWindow.querySelector("input");
  const buttonEl = chatWindow.querySelector("button");
  const closeBtn = chatWindow.querySelector(".ag-chat-close");

  let chatHistory = [];

  function addMessage(text, role) {
    const div = document.createElement("div");
    div.className = "ag-chat-message " + role;
    div.innerText = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    
    addMessage(text, "user");
    inputEl.value = "";
    buttonEl.disabled = true;

    addMessage("...", "bot");
    const thinkingEl = messagesEl.lastChild;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: SITE_ID,
          message: text,
          history: chatHistory
        })
      });
      const data = await res.json();
      messagesEl.removeChild(thinkingEl);
      
      const answer = data.answer || "Sorry, I couldn't process that.";
      addMessage(answer, "bot");
      
      chatHistory.push({ role: 'user', content: text });
      chatHistory.push({ role: 'assistant', content: answer });
    } catch (e) {
      messagesEl.removeChild(thinkingEl);
      addMessage("Error talking to the assistant.", "bot");
    } finally {
      buttonEl.disabled = false;
      inputEl.focus();
    }
  }

  const toggleChat = () => {
    chatWindow.classList.toggle("hidden");
    if (!chatWindow.classList.contains("hidden")) inputEl.focus();
  };

  launcher.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  buttonEl.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Initial greeting
  addMessage("Hi! How can I help you today?", "bot");
})();
