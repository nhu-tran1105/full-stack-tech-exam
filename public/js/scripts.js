document.addEventListener('DOMContentLoaded', () => {

    const initBtn = document.getElementById('initBtn');
    const initStatus = document.getElementById('initStatus');

    if (initBtn) {
        initBtn.addEventListener('click', async () => {
            initStatus.style.display = 'block';
            initStatus.innerText = "Initializing...";
            
            try {
                const response = await fetch('/api/init-emoji');
                const data = await response.json();
                
                if (response.ok) {
                    initStatus.innerText = data.message;
                    initStatus.className = "success";
                } else {
                    initStatus.innerText = data.error || "Initialization failed";
                    initStatus.className = "error";
                }
            } catch (err) {
                initStatus.innerText = "Error: Cannot connect to server";
                initStatus.className = "error";
            }
        });
    }

    const nameForm = document.getElementById('nameForm');
    const resultParagraph = document.getElementById('result');

    if (nameForm) {
        nameForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const userName = document.getElementById('userName').value;
            resultParagraph.style.display = 'block';
            resultParagraph.textContent = 'Searching...';

            try {
                const response = await fetch('/api/get-name', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName }),
                });

                const data = await response.json();

                if (response.ok) {
                    resultParagraph.innerHTML = `Found: ${data.name} ${data.emoji}`;
                    resultParagraph.className = "success";
                } else {
                    resultParagraph.textContent = data.error || 'No result found';
                    resultParagraph.className = "error";
                }
            } catch (error) {
                resultParagraph.textContent = 'An error occurred. Please try again.';
                resultParagraph.className = "error";
            }
        });
    }
});