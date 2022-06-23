class FilterRightExpression {
    constructor(value, expressionType, functionType, macrosType) {
        this.value = value;

        this.expressionType = expressionType;
        this.functionType = functionType;
        this.macros = this._getConstantByValue(MacrosType, macrosType);
    }

    isEmpty() {
        return (this.value == null || this.value == "") &&
            (this.expressionType == null || this.expressionType == "") &&
            (this.functionType == null || this.functionType == "") &&
            this.macros.value == null;
    }
    
    equals(filterRightExpression) {
        return this.value === filterRightExpression.value &&
            this.expressionType === filterRightExpression.expressionType &&
            this.functionType === filterRightExpression.functionType &&
            this.macros.value === filterRightExpression.macros.value &&
            this.macros.displayValue === filterRightExpression.macros.displayValue;
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
}