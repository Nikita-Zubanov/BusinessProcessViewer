class EntitySchema {
    constructor(parameters = []) {
        this.init(parameters);
    }

    init(parameters = []) {
        var entitySchema = parameters.values
            .find(p => {
                if (p.name === "EntitySchemaUId" || p.name === "EntitySchemaId") {
                    return p;
                }
            });
        
        Object.assign(this, entitySchema);
    }
}