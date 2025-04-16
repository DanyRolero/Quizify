//---------------------------------------------------------------------------------
// Definición del mediador
class Mediador {
  constructor() {
    this.canales = {};
  }

  // Método para suscribir un callback en un canal específico
  suscribir(canal, contexto, callback) {
    if (!this.canales[canal]) {
      this.canales[canal] = [];
    }
    this.canales[canal].push({ contexto, callback });
  }

  // Método para publicar (notificar) un canal
  publicar(canal, ...args) {
    if (!this.canales[canal]) return;
    this.canales[canal].forEach((subscripcion) => {
      subscripcion.callback.apply(subscripcion.contexto, args);
    });
  }
}

//---------------------------------------------------------------------------------
// Módulo encargado de cargar el quiz
class QuizLoader {
  constructor(mediador) {
    this.mediador = mediador;
  }

  cargarQuiz() {
    const quizConfig = { id: 1, type: "single", title: "Quiz de Ejemplo" };
    console.log("QuizLoader: Quiz cargado", quizConfig);
    // Notifica a los otros módulos que el quiz se ha cargado
    this.mediador.publicar("quizCargado", quizConfig);
  }
}

//---------------------------------------------------------------------------------
// Módulo encargado de renderizar el quiz (UI)
class QuizRenderer {
  constructor(mediador) {
    this.mediador = mediador;
    // Se suscribe al canal "quizCargado"
    this.mediador.suscribir("quizCargado", this, this.actualizarUI);
  }

  actualizarUI(quizConfig) {
    console.log("QuizRenderer: Actualizando UI con", quizConfig);
    // Aquí se implementaría la lógica para actualizar la interfaz
  }
}

//---------------------------------------------------------------------------------
// Creación del Mediador y de los módulos que interactúan a través de él
const mediador = new Mediador();
const loader = new QuizLoader(mediador);
const renderer = new QuizRenderer(mediador);

// Emular el proceso de carga del Quiz
loader.cargarQuiz();
