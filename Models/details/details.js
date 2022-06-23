class Details {
    constructor(parameters, body, filters, event) {
        this.body = body;
        this.parameters = parameters;
        this.filters = filters;
        this.event = event;

        this.entitySchema = new EntitySchema(this.parameters);
        this.selectDetails = new SelectDetails(this.parameters);
        this.insertDetails = new InsertDetails(this.parameters);
        this.updateDetails = new UpdateDetails(this.parameters);
    }

    isEmpty() {
        return this.body.isEmpty() &&
            this.parameters.isEmpty() &&
            this.filters.isEmpty() &&
            this.signal.isEmpty() &&
            this.event.isEmpty();
    }
}