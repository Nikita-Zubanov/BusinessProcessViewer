class SelectDetails {
    constructor(parameters = []) {
        this.init(parameters);
    }

    init(parameters = []) {
        this.resultType = parameters.values
            .filter(p => { 
                return p.name === "ResultType"; 
            })
            .map(p => {
                return this._getConstantByValue(SelectResultType, Number(p.value));
            })[0];
        
        this.functionType = parameters.values
            .filter(p => { 
                return p.name === "FunctionType"; 
            })
            .map(p => {
                return this._getConstantByValue(SelectFunctionType, Number(p.value));
            })[0];

        this.aggregationColumnName = parameters.values
            .filter(p => { 
                return p.name === "AggregationColumnName"; 
            })
            .map(p => {
                return p.value;
            })[0];
        
        this.orderInfo = parameters.values
            .filter(p => { 
                return p.name === "OrderInfo"; 
            })
            .map(p => {
                if (p.value == null || p.value == "") {
                    return null;
                }

                var ordersInfo = p.value.split(",");

                return ordersInfo
                    .map(v => {
                        var orderInfo = v.split(":");
                        var propertyName = orderInfo[0];
                        var value = orderInfo[1];

                        var constant = this._getConstantByValue(SelectOrderInfo, Number(value));
                        
                        return {
                            propertyName: propertyName,
                            value: constant
                        };
                    });
            })[0];
        
        this.entityColumnMetaPathes = parameters.values
            .filter(p => { 
                return p.name === "EntityColumnMetaPathes"; 
            })
            .map(p => {
                if (p.value == null || p.value == "") {
                    return null;
                }
    
                return p.value.split(";");
            })[0];
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