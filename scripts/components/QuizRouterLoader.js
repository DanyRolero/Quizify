class QuizRouterLoader {
    constructor(pathQuizRouterJSON, mediator) {
        this.pathQuizRouterJSON = pathQuizRouterJSON;
        this.quizRoutesData = null;
        this.mediator = mediator;
        //"scripts/data/courses/quizRoutes.json"    
    }

    //-------------------------------------------------------------------------------
    loadQuizRoutes() {
        fetch(this.pathQuizRouterJSON)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error path on load quiz router: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                this.quizRoutesData = data;
                this.mediator.publish("quizRouterLoaded", data);
            });
    }
}
