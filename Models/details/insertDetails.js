class InsertDetails {
    constructor(parameters = []) {
        this.init(parameters);
    }

    init(parameters = []) {
        this.recordAddMode = parameters.values
            .filter(p => { 
                return p.name === "RecordAddMode"; 
            })
            .map(p => {
                return this._getConstantByValue(RecordAddMode, Number(p.value));
            })[0];
        
        this.recordDefValues = this._getParametersByName(parameters, "RecordDefValues");
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
    
    _getConstantByValue(constantType, value) {
        var findedConstant = Object.entries(constantType)
            .find(v => {
                var constant = v[1];
                if (constant == null || constant.value == null) {
                    return null;
                }

                return constant.value === value;
            });
        
        if (findedConstant == null) {
            return {value: null, displayValue: "[значение не найдено]"};
        }

        return findedConstant[1];
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