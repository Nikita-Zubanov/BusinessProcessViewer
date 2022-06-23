class Filters {
    constructor(values, rootSchemaName, logicalOperation, isEnabled) {
        this.values = values;
        this.rootSchemaName = rootSchemaName;
        this.logicalOperation = this._getConstantByValue(LogicalOperation, logicalOperation);
        this.isEnabled = isEnabled;
    }

    reload() { }

    isEmpty() {
        return this.values == null &&
            this.rootSchemaName == null &&
            this.logicalOperation == null &&
            this.isEnabled == null;
    }

    equals(filters) {
        if (filters == null || filters.isEmpty()) {
            return false;
        }

        return this.rootSchemaName === filters.rootSchemaName &&
            this.logicalOperation.value === filters.logicalOperation.value &&
            this.logicalOperation.displayValue === filters.logicalOperation.displayValue &&
            this.isEnabled === filters.isEnabled &&
            this.values.every((filter, index) => {
                return filter.equals(filters.values[index]);
            });
    }

    _getConstantByValue(constantType, value) {
        if (value == null) {
            return;
        }

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
}