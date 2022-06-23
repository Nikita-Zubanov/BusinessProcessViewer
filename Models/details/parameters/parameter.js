class Parameter {
    constructor(name, type, value, displayValue) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.displayValue = displayValue;
    }

    isEmpty() {
        return (this.name == null || this.name == "") &&
            (this.type == null || this.type == "") &&
            (this.value == null || this.value == "");
    }

    equals(parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return false;
        }

        return this.name === parameters.name &&
            this.type === parameters.type &&
            this.value === parameters.value;
    }

    getDisplayValue() {
        return this.displayValue != null
            ? this.displayValue
            : this.value;
    }
}