document.getElementById('toggleMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

const chatForm = document.getElementById('chatForm');
const chatbox = document.getElementById('chatbox');

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    // Show user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerText = `You: ${userInput}`;
    chatbox.appendChild(userMessage);

    // Show loading typing message
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('loading-message');
    loadingMessage.innerText = "Groq is typing...";
    chatbox.appendChild(loadingMessage);

    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_input: userInput })
        });
        const data = await response.json();

        loadingMessage.remove(); // remove loading once response is here

        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerText = `Groq: ${data.reply}`;
        chatbox.appendChild(botMessage);
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        loadingMessage.remove();
        console.error('Error:', error);
    }

    document.getElementById('userInput').value = '';
});
