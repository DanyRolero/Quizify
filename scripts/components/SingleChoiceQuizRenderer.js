class SingleChoiceQuizRenderer {
    constructor(quizData) {
        this.quizData = quizData;
        this.quizFormElement = document.getElementById("quiz-form");
    }

    //-------------------------------------------------------------------------------
    render() {
        for (let i = 0; i < this.quizData.questions.length; i++) {
            let questionElement = this._createQuestionElement(i);
            this.quizFormElement.appendChild(questionElement);

            let questionTextElement = this._createQuestionTextElement(i);
            questionElement.appendChild(questionTextElement);

            for (let j = 0; j < this.quizData.questions[i].options.length; j++) {
                let answerOptionElement = this._createAnswerOptionElement(i, j);
                questionElement.appendChild(answerOptionElement);
            }
        }
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