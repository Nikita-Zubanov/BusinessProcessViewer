class BodyPart {
    constructor(value, status) {
        this.value = value;
        this.status = status;
    }

    isEmpty() {
        return (this.value == null || this.value == "") &&
            (this.status == null || this.status == "");
    }
    
    equals(bodyPart) {
        if (bodyPart == null ||
            bodyPart.isEmpty()) {
            return false;
        }

        return this.value === bodyPart.value &&
            this.status === bodyPart.status;
    }
}