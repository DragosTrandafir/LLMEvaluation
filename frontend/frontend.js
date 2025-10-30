document.getElementById('submit-button').addEventListener('click', parseAndSendQuestion);
document.getElementById('evaluate-button').addEventListener('click', runEvaluation); // New listener

function parseAndSendQuestion() {
    const inputField = document.getElementById('question-input');
    const question = inputField.value.trim();
    const responseContainer = document.getElementById('response-container');
    const loadingMessage = document.getElementById('loading-message');
    const submitButton = document.getElementById('submit-button');
    const evaluateButton = document.getElementById('evaluate-button'); // Get new button

    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    // 1. Prepare UI for request
    responseContainer.innerHTML = '';
    loadingMessage.style.display = 'block';
    submitButton.disabled = true;
    evaluateButton.disabled = true; // Disable both buttons

    // 2. Define the data to send
    const dataToSend = {
        question: question
    };

    // 3. Send the request to the Flask backend
    fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend) // Parse the question input to the backend
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // 4. Handle and display the successful response
        loadingMessage.style.display = 'none';

        if (data.error) {
            responseContainer.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            return;
        }

        let htmlContent = '';
        // Iterate over the models and their responses
        for (const [model, reply] of Object.entries(data)) {
            htmlContent += `
                <div class="model-response">
                    <strong>Model: ${model}</strong>
                    <p>${reply.replace(/\n/g, '<br>')}</p>
                </div>
            `;
        }
        responseContainer.innerHTML = htmlContent;
    })
    .catch(error => {
        // 5. Handle network or parsing errors
        loadingMessage.style.display = 'none';
        responseContainer.innerHTML = `<p style="color: red;">Failed to fetch response: ${error.message}. Make sure your Flask backend is running.</p>`;
    })
    .finally(() => {
        // Re-enable the buttons
        submitButton.disabled = false;
        evaluateButton.disabled = false;
    });
}

function runEvaluation() {
    // 1. Get the question from the input field
    const questionInput = document.getElementById('question-input');
    const userQuestion = questionInput.value.trim(); // Get the current text

    if (userQuestion === "") {
        alert("Please enter a question in the input field before running the evaluation.");
        return;
    }

    const responseContainer = document.getElementById('response-container');
    const evaluationMessage = document.getElementById('evaluation-message');
    const submitButton = document.getElementById('submit-button');
    const evaluateButton = document.getElementById('evaluate-button');

    // 2. Prepare UI for request
    responseContainer.innerHTML = '<p>Initiating LLM evaluation process...</p>';
    evaluationMessage.style.display = 'block';
    submitButton.disabled = true;
    evaluateButton.disabled = true;

    // 3. Define the data to send (including the question)
    const dataToSend = {
        question: userQuestion
    };

    // 4. Send the request to the new Flask evaluation endpoint
    fetch('http://127.0.0.1:5000/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend) // Send the question to the backend
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // 5. Handle successful response (UI changes remain the same)
        evaluationMessage.style.display = 'none';

        if (data.status === "success") {
            responseContainer.innerHTML = `<p style="color: green;">✅ Evaluation successful! Scores saved to: <strong>${data.file_path}</strong></p>`;
        } else {
            responseContainer.innerHTML = `<p style="color: red;">Evaluation failed: ${data.message || data.error}</p>`;
        }
    })
    .catch(error => {
        // 6. Handle network or parsing errors
        evaluationMessage.style.display = 'none';
        responseContainer.innerHTML = `<p style="color: red;">Failed to run evaluation: ${error.message}. Check the Flask server logs.</p>`;
    })
    .finally(() => {
        // Re-enable the buttons
        submitButton.disabled = false;
        evaluateButton.disabled = false;
    });
}