class Parameters {
    constructor(parameters = []) {
        this.init(parameters);
    }

    init(parameters = []) {
        this.values = parameters;
    }

    reload() {
        this.init(this.values);
    }

    setDifferent(otherParameters) {

    }

    isEmpty() {
        return this.values.length === 0;
    }

    equals(parameters) {
        if (parameters == null) {
            return false;
        }

        return this.values.length === parameters.values.length &&
            this.values.every((parameter, index) => {
                return parameter.equals(parameters.values[index]);
            });
    }
}