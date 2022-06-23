class UpdateDetails {
    constructor(parameters = []) {
        this.init(parameters);
    }

    init(parameters = []) {
        this.recordChangeValues = this._getParametersByName(parameters, "RecordColumnValues");
    }
    
    _getParametersByName(parameters, attributeName) {
        var recordColumnValues = parameters.values
            .find(p => {
                if (p.name === attributeName) {
                    return p;
                }
            });
        
        if (recordColumnValues == null ||
                recordColumnValues.value == null ||
                recordColumnValues.value == "" ||
                !this._isJson(recordColumnValues.value)) {
            return;
        }

        var changedColumnsData = JSON.parse(recordColumnValues.value);
        if (changedColumnsData == null || changedColumnsData.$values == null) {
            return;
        }

        return changedColumnsData.$values;
    }
    
    _isJson(string) {
        try {
            JSON.parse(string);

            return true;
        }
        catch {
            return false;
        }
    }
}