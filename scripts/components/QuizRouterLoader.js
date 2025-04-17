class QuizRouterLoader {
    constructor(path, mediator) {
        this.path = path;
        this.routerData = null;
        this.mediator = mediator;
    }

    //-------------------------------------------------------------------------------
    load() {
        fetch(this.path)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error on load json: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                this.routerData = data;
                this.mediator.publish("quizRouterLoaded", data);
                console.log("Quiz router loaded:", data);
            });
    }
}
