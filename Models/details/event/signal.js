class Signal {
    constructor(code, isWaitingRandomSignal, isWaitingEntitySignal, entitySignalType, newEntityChangedColumnsJson) {
        this.code = code;
        this.isWaitingRandomSignal = isWaitingRandomSignal;
        this.isWaitingEntitySignal = isWaitingEntitySignal;
        this.entitySignalType = this._getConstantByValue(EntityChangeType, entitySignalType);
        this.changedColumns = this._parseChangedColumnsJson(newEntityChangedColumnsJson);
    }

    isEmpty() {
        return (this.code == null || this.code == "") &&
            this.entitySignalType.value == null &&
            (this.changedColumns == null || this.changedColumns.length === 0);
    }

    _parseChangedColumnsJson(changedColumnsJson) {
        if (changedColumnsJson == null || changedColumnsJson == "") {
            return [];
        }

        var changedColumnsData = JSON.parse(changedColumnsJson);

        return changedColumnsData.$values;
    }

    _getConstantByValue(constantType, value) {
        if (value == null) {
            return {value: null, displayValue: null};
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