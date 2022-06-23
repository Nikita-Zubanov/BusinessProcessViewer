class Timer {
    constructor(type, cronExpression, startDateTime, endDateTime, timeZoneOffset, isIgnoreMisfires) {
        this.type = this._getConstantByValue(TimerExpressionTypes, type);
        this.cronExpression = cronExpression;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.timeZoneOffset = timeZoneOffset;
        this.isIgnoreMisfires = isIgnoreMisfires;
    }

    isEmpty() {
        return this.type.value == null &&
            (this.cronExpression == null || this.cronExpression == "") &&
            Date.parse(this.startDateTime) != NaN &&
            Date.parse(this.endDateTime) != NaN &&
            (this.timeZoneOffset == null || this.timeZoneOffset == "");
    }
    
    hasStartDate() {
        return !isNaN(Date.parse(this.startDateTime));
    }
    
    hasEndDate() {
        return !isNaN(Date.parse(this.endDateTime));
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