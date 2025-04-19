class SingleChoiceQuizRenderer {
    constructor(quizData) {
        this.quizData = quizData;
        this.quizElementContainer = document.getElementById("quiz-container");
    }

    //-------------------------------------------------------------------------------
    render() {
        
        let quizFormElement = this._createQuizFormElement();
        this.quizElementContainer.appendChild(quizFormElement);

        let question = this._createQuestionElement(0);
        quizFormElement.appendChild(question);
        
        let questionTextElement = this._createQuestionTextElement(0);
        question.appendChild(questionTextElement);

        for (let i = 0; i < this.quizData.questions[0].options.length; i++) {
            let answerOptionElement = this._createAnswerOptionElement(0, i);
            question.appendChild(answerOptionElement);
        }

    }

    //-------------------------------------------------------------------------------
    _createQuizFormElement() {
        let quizFormElement = document.createElement("form");
        quizFormElement.id = "quiz-form";
        quizFormElement.className = "quiz-form";

        return quizFormElement;
    }

    //-------------------------------------------------------------------------------
    _createQuestionElement(questionIndex) {
        let questionElement = document.createElement("div");
        questionElement.dataset.questionIndex = questionIndex;

        return questionElement;
    }

    //-------------------------------------------------------------------------------
    _createQuestionTextElement(questionIndex) {
        let questionTextElement = document.createElement("p");
        questionTextElement.innerText = Number(questionIndex + 1) + ". " + this.quizData.questions[questionIndex].question;
    
        return questionTextElement;
    }

    //-------------------------------------------------------------------------------
    _createAnswerOptionElement(questionIndex, optionIndex) {
        let answerPelement = document.createElement("p");

        let answerLabelElement = document.createElement("label");

        let answerInputElement = document.createElement("input");
        answerInputElement.type = "radio";
        answerInputElement.name = "question-" + questionIndex;
        answerInputElement.value = optionIndex;

        let textOptionAnswer = this.quizData.questions[questionIndex].options[optionIndex].option;
        let answerTextOptionElement = document.createTextNode(textOptionAnswer);
                
        answerLabelElement.appendChild(answerInputElement);
        answerLabelElement.appendChild(answerTextOptionElement);
        answerPelement.appendChild(answerLabelElement);

        return answerPelement;
    }

}