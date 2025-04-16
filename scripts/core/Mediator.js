class Mediator {
    constructor() {
      this.channels = {};
    }
  
    //----------------------------------------------------------------------------------
    // Método para suscribir un callback en un canal específico
    subcribe(channel, context, callback) {
      if (!this.channels[channel]) {
        this.channels[channel] = [];
      }
      this.channels[channel].push({ context, callback });
    }

    //----------------------------------------------------------------------------------
    // Método para desuscribir un callback de un canal específico
    unsubscribe(channel, context) {
      if (!this.channels[channel]) return;
      this.channels[channel] = this.channels[channel].filter((subscription) => subscription.context !== context);
    }
  
    //----------------------------------------------------------------------------------
    // Método para publicar (notificar) un canal
    publish(channel, ...args) {
      if (!this.channels[channel]) return;
      this.channels[channel].forEach((subscription) => {
          subscription.callback.apply(subscription.contexto, args);
      });
    }
  }