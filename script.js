// Handle Chat Bot Interactions
document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const chatWindow = document.getElementById('chat-window');

    // Add user message to chat window
    const userMessage = document.createElement('p');
    userMessage.textContent = "You: " + userInput;
    chatWindow.appendChild(userMessage);

    // Simulate bot response
    const botMessage = document.createElement('p');
    botMessage.textContent = "Bot: Thanks for your query! We'll process it shortly.";
    chatWindow.appendChild(botMessage);

    // Clear input
    document.getElementById('user-input').value = '';
});

// Handle Google Sign-In
function handleCredentialResponse(response) {
    // Extract the ID token from the response
    const idToken = response.credential;

    // Send the token to the backend for verification
    fetch('http://127.0.0.1:5000/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Login successful! Welcome, ${data.user.name}`);
        } else {
            alert(`Login failed: ${data.message}`);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Initialize Google Sign-In
window.onload = function () {
    google.accounts.id.initialize({
        client_id: '170380945132-rrsnussubru3orhg4ssl5gal54ivuoob.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt(); // Show the prompt if necessary
};
