class Event {
    constructor(signal, message, timer) {
        this.signal = signal;
        this.message = message;
        this.timer = timer;
    }
    isEmpty() {
        return (this.signal == null || this.signal.isEmpty()) &&
            (this.message == null || this.message.isEmpty()) &&
            (this.timer == null || this.timer.isEmpty());
    }
} 