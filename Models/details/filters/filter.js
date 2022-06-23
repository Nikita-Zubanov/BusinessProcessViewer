class Filter {
    constructor(uId, filterType, comparisonType, isEnabled, isAggregative, leftExpressionCaption, filterRightExpression, subFilters) {
        this.uId = uId;

        this.filterType = filterType;
        this.comparisonType = this._getConstantByValue(ComparisonType, comparisonType);

        this.isEnabled = isEnabled;
        this.isAggregative = isAggregative;

        this.leftExpressionCaption = leftExpressionCaption;
        this.filterRightExpression = filterRightExpression;

        this.subFilters = subFilters;
    }

    isEmpty() {
        return this.uId == null &&
            this.filterType == null &&
            this.comparisonType.value == null && 
            this.isEnabled == null &&
            this.isAggregative == null &&
            (this.leftExpressionCaption == null || this.leftExpressionCaption == "") &&
            (this.filterRightExpression == null || this.filterRightExpression.isEmpty()) &&
            (this.subFilters == null || this.subFilters.isEmpty());
    }

    equals(filter) {
        if (filter == null || filter.isEmpty()) {
            return false;
        }

        return this.uId === filter.uId &&
            this.filterType === filter.filterType &&
            this.comparisonType.value === filter.comparisonType.value &&
            this.comparisonType.displayValue === filter.comparisonType.displayValue &&
            this.isEnabled === filter.isEnabled &&
            this.isAggregative === filter.isAggregative &&
            this.leftExpressionCaption === filter.leftExpressionCaption &&
            this.filterRightExpression.equals(filter.filterRightExpression) &&
            this.subFilters.equals(filter.subFilters);
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