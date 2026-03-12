const userForm = document.getElementById('userForm');
const responseDisplay = document.getElementById('serverResponse');

userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop page refresh
    
    const usernameInput = document.getElementById('username').value;

    try {
        const response = await fetch('/api/greet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameInput })
        });

        const data = await response.json();
        
        // Display response in the DOM
        responseDisplay.textContent = data.message;
        responseDisplay.className = "success-message";
    } catch (error) {
        responseDisplay.textContent = "Error: Could not connect to the server.";
        responseDisplay.className = "error-message";
        console.error('Fetch error:', error);
    }
});