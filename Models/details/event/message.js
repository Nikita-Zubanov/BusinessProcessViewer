class Message {
    constructor(code) {
        this.code = code;
    }

    isEmpty() {
        return this.code == null || this.code == "";
    }
}