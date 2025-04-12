//Cargar json
let coursePath = 'courses/sample-course/';
let quizName = 'sample-quiz-single.json';
let path = coursePath + quizName;
let quiz = {};
fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => { quiz = data;});