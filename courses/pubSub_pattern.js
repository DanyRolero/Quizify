// Definición del bus de eventos
class EventBus {
    constructor() {
        this.events = {};
    }

    // Método para suscribir un listener a un evento
    subscribe(eventString, listener) {
        if (!this.events[eventString]) {
            this.events[eventString] = [];
        }
        this.events[eventString].push(listener);
    }

    // Método para eliminar una suscripción (opcional)
    unsubscribe(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    // Método para publicar un evento con datos
    publish(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
}

// Uso de EventBus: se crea una instancia y se registran suscripciones
const eventBus = new EventBus();

// Componente que se suscribe al evento "quizCargado"
eventBus.subscribe("quizCargado", (quizData) => {
    console.log("Pub/Sub: Quiz recibido:", quizData);
});

// Emulación de la carga de un cuestionario y publicación del evento
const quizData = { id: 1, title: "Cuestionario de ejemplo" };
eventBus.publish("quizCargado", quizData);