class QuizLoader {
    constructor(mediator) {
        this.mediator = mediator;
        this.quizData = null;
    }
    
    
    //------------------------------------------------------------------------------
    load(path) {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error on load quiz: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                this.quizData = data;
                console.log("Quiz loaded:", data);
                this.mediator.publish("quizLoaded", data);
            });
    }
}