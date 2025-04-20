class Quiz {
    constructor(quizData) {
        if (!quizData) throw new Error("Quiz - constructor: quizData is required");

        this.quizData = quizData;
        this.quizTypeRenderer = this.setRenderder(quizData.type);
        this.quizTypeCorrector = this.setCorrector(quizData.type);
        this.quizElement = document.getElementById("quiz-form");

        this.isCompleted = false;
        this.isRedered = false;
        this.isCorrected = false;
        this.result = 0;
    }

    //-------------------------------------------------------------------------------
    setRenderder(quizType) {
        switch (quizType) {
            case "single-choice": return new SingleChoiceQuizRenderer(this.quizData);
            case "multiple-choice": return MultipleChoiceQuizRenderer(this.quizData);
            case "true-false": return new TrueFalseQuizRenderer(this.quizData);
            case "short-answer": return new ShortAnswerQuizRenderer(this.quizData);
            case "fill-in-the-blank": return new FillInTheBlankQuizRenderer(this.quizData);
            case "explanation": return new ExplanationQuizRenderer(this.quizData);
            case "matching": return new MatchingQuizRenderer(this.quizData);
            case "drag-and-drop": return new DragAndDropQuizRenderer(this.quizData);
            case "essay": return new EssayQuizRenderer(this.quizData);

            default: throw new Error(`Unknown quiz type: ${quizType}`);
        }
    }

    //-------------------------------------------------------------------------------
    setCorrector(quizType) {

        switch (quizType) {
            case "single-choice": return new SingleChoiceQuizCorrector(this.quizData);
            case "multiple-choice": return MultipleChoiceQuizCorrector(this.quizData);
            case "true-false": return new TrueFalseQuizCorrector(this.quizData);
            case "short-answer": return new ShortAnswerQuizCorrector(this.quizData);
            case "fill-in-the-blank": return new FillInTheBlankQuizCorrector(this.quizData);
            case "explanation": return new ExplanationQuizCorrector(this.quizData);
            case "matching": return new MatchingQuizCorrector(this.quizData);
            case "drag-and-drop": return new DragAndDropQuizCorrector(this.quizData);
            case "essay": return new EssayQuizCorrector(this.quizData);

            default: throw new Error(`Unknown quiz type: ${quizType}`);
        }
    }

    //-------------------------------------------------------------------------------
    render() {
        if (!this.quizTypeRenderer) throw new Error("Quiz.render(): quizTypeRenderer is not set");
        
        let quizTitleText = this.quizData.subject + " - " + this.quizData.title;
        document.getElementById("title-quiz").innerText = quizTitleText;
        document.getElementById("description-quiz").innerText = this.quizData.description;
        
        this.quizTypeRenderer.render();
    }

    //-------------------------------------------------------------------------------
    correctQuiz(quizElement) {
        if (!this.quizTypeCorrector) throw new Error("Quiz.correctQuiz(): quizTypeRenderer is not set");
        
        this.result = this.quizTypeRenderer.correctQuiz(this.quizData, quizElement);
        this.isCorrected = true;
    }

    //-------------------------------------------------------------------------------
    saveQuizResult(formElement) {
        if (!isCorrected) throw new Error("Quiz - saveQuizResult: quiz is not corrected");
    }
}