let path = '';
let quizRoutes = {};
let quiz = {}

//-------------------------------------------------------------------------------
document.getElementById('subject-selector').addEventListener('change', renderQuizzesOptions);
document.getElementById('load-quiz-button').addEventListener('click', () => {
    let subjectSelector = document.getElementById('subject-selector');
    let quizSelector = document.getElementById('quiz-selector');
    let selectedSubject = subjectSelector.value;
    let selectedQuiz = quizSelector.value;

    path = `scripts/data/courses/${selectedSubject}/${selectedQuiz}.json`;
    loadQuiz(path);
});



//-------------------------------------------------------------------------------
loadQuizRoutes();

//-------------------------------------------------------------------------------
function loadQuiz(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            quiz = data;
            renderTitle();
            renderDescription();
            setTitlePage();
        });
}

//-------------------------------------------------------------------------------
/*
    - Seleccionar curso
    - Seleccionar test

    - Cargar titulo y descripción del test

    - Dependiendo del tipo de test, las preguntas se renderizará de una forma u otra.
    - Para test single choice
    - Para test multiple choice
    - Para test open question
    - Para test de respuesta corta
    - ...

*/

//-------------------------------------------------------------------------------
function renderTitle() {
    let title = document.getElementById('title-quiz').innerHTML = quiz.title;
}

//-------------------------------------------------------------------------------
function renderDescription() {
    let description = document.getElementById('description-quiz').innerHTML = quiz.description;
}

//-------------------------------------------------------------------------------
function setTitlePage() {
    document.title = quiz.title;
}

//-------------------------------------------------------------------------------
function loadQuizRoutes() {
    fetch('scripts/data/courses/quizRoutes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            quizRoutes = data;
            activeQuizSelector();
            renderSubjectsOptions();
        });
}

//-------------------------------------------------------------------------------
function activeQuizSelector() {
    document.getElementById('subject-selector').disabled = false;
    document.getElementById('quiz-selector').disabled = false;
    document.getElementById('load-quiz-button').disabled = false;
}

//-------------------------------------------------------------------------------
function renderSubjectsOptions() {
    let subjectSelector = document.getElementById('subject-selector');
    let subjects = quizRoutes.subjects;

    subjects.forEach(subject => {
        let option = document.createElement('option');
        option.value = subject.folderName;
        option.textContent = subject.folderName;
        subjectSelector.appendChild(option);
    });
}

//-------------------------------------------------------------------------------
function renderQuizzesOptions() {
    let subjectSelector = document.getElementById('subject-selector');
    let quizSelector = document.getElementById('quiz-selector');
    let selectedSubject = subjectSelector.value;

    // Limpiar opciones anteriores
    quizSelector.innerHTML = '';

    // Obtener las rutas de los quizzes para el tema seleccionado
    let quizzes = quizRoutes.subjects.find(subject => subject.folderName === selectedSubject).quizzes;

    quizzes.forEach(quiz => {
        let option = document.createElement('option');
        option.value = quiz;
        option.textContent = quiz;
        quizSelector.appendChild(option);
    });
}