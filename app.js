document.addEventListener('DOMContentLoaded', () => {
    const questionsList = document.getElementById('questionsList');
    const askQuestionForm = document.getElementById('askQuestionForm');
    const questionDetails = document.getElementById('questionDetails');
    const questionForm = document.getElementById('questionForm');
    const responseForm = document.getElementById('responseForm');
    const resolveButton = document.getElementById('resolveButton');
    let questions = [];
    let currentQuestionIndex = null;

    
    askQuestionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('questionTitle').value;
        const questionText = document.getElementById('questionText').value;

    
        const newQuestion = {
            title: title,
            questionText: questionText,
            responses: []
        };
        questions.push(newQuestion);
        displayQuestions();

    
        askQuestionForm.reset();
    });

    
    function displayQuestions() {
        questionsList.innerHTML = '';
        questions.forEach((question, index) => {
            const questionItem = document.createElement('li');
            questionItem.textContent = question.title;
            questionItem.addEventListener('click', () => displayQuestionDetails(index));
            questionsList.appendChild(questionItem);
        });
    }

    
    function displayQuestionDetails(index) {
        currentQuestionIndex = index;
        const selectedQuestion = questions[index];
        document.getElementById('displayQuestionTitle').textContent = selectedQuestion.title;
        document.getElementById('displayQuestionText').textContent = selectedQuestion.questionText;
        questionDetails.classList.remove('hidden');
        questionForm.classList.add('hidden');
        displayResponses(selectedQuestion.responses);
    }

    
    function displayResponses(responses) {
        const responsesList = document.getElementById('responsesList');
        responsesList.innerHTML = '';
        responses.forEach(response => {
            const responseItem = document.createElement('li');
            responseItem.textContent = `${response.name}: ${response.comment}`;
            responsesList.appendChild(responseItem);
        });
    }

    
    responseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('responderName').value;
        const comment = document.getElementById('responseText').value;

    
        const newResponse = { name, comment };
        questions[currentQuestionIndex].responses.push(newResponse);
        displayResponses(questions[currentQuestionIndex].responses);

    
        responseForm.reset();
    });

    
    resolveButton.addEventListener('click', () => {
    
        questions.splice(currentQuestionIndex, 1);
        displayQuestions();

        
        questionDetails.classList.add('hidden');
        questionForm.classList.remove('hidden');
    });
});
