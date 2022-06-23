var metadataAnalizator = {
    methods: {
        initMetadata: function(group, metadataString) {
            if (!group || !metadataString) {
                return;
            }

            if (this.metadata == null) {
                this.metadata = {};
            }

            if (this.localizedParameters == null) {
                this.localizedParameters = {};
            }

            if (this.metadata[group] != null) {
                this.metadata[group] = null;
            }

            if (this.localizedParameters[group] == null) {
                this.localizedParameters[group] = [];
            }

            try {
                this.metadata[group] = JSON.parse(metadataString);
            }
            catch(ex) {
                alert("Ты бы мне ещё консервных банок насобирал!");
                throw `При парсинге метаданных бизнес-процесса возникла ошибка: ${ex}`;
            }
        },

        normalizeMetadata: function() {
            Object
                .keys(this.metadata)
                .forEach(group => {
                    this.metadata[group] = this._getNormalizedMetadata(this.metadata[group]);
                    this._setLocalizedParameters(this.metadata[group].MetaData.Schema, group);
                });
        },
        
        getFlowElements: function(group) {
            if (group == null || this.metadata[group] == null) {
                return;
            }
            
            var flowMetaElements = this.metadata[group].MetaData.Schema.FlowElements;

            if (flowMetaElements == null) {
                return;
            }

            return flowMetaElements.map(metaElement => {
                    var position = this._parsePosition(metaElement.PositionString);
                    var sourceSidePosition = this._parsePosition(metaElement.SourceSequenceFlowPointLocalPosition);
                    var targetSidePosition = this._parsePosition(metaElement.TargetSequenceFlowPointLocalPosition);
                    var size = this._parseSize(metaElement.SizeString);

                    var positions = [];
                    if (metaElement.PolylinePointPositions != null) {
                        positions = Object.entries(metaElement.PolylinePointPositions)
                            .map(p => {
                                var value = p[1];
                                return this._parsePosition(value);
                            })
                    }
                    
                    var filters = new Filters();
                    var parameters = [];
                    if (metaElement.Parameters != null && metaElement.Parameters.length > 0) {
                        parameters = metaElement.Parameters
                            .map(p => {
                                return this._parseParameter(p, group);
                            });
                                         
                            parameters
                            .forEach(p => {
                                if (p.name === "DataSourceFilters") {
                                    var metadataString = p.value;
                                    if (metadataString == null || metadataString == "") {
                                        return;
                                    }

                                    var metadata = JSON.parse(metadataString);
                                    if (metadata.serializedFilterEditData == null || metadata.serializedFilterEditData == "") {
                                        var metadataSourceFilters = JSON.parse(metadata.dataSourceFilters);
                                        filters = this.getFilters(metadataSourceFilters);
                                        
                                        return;
                                    }

                                    var serializedFilterEditMetadata = JSON.parse(metadata.serializedFilterEditData);
                                    filters = this.getFilters(serializedFilterEditMetadata);
                                }
                            });
                    }

                    // Добавить фильтры для сигнала.
                    if (metaElement.EntityFilters != null && metaElement.EntityFilters != "null") {
                        var entityFilters = JSON.parse(metaElement.EntityFilters);
                        var serializedFilterEditMetadata = JSON.parse(entityFilters.serializedFilterEditData);
                        filters = this.getFilters(serializedFilterEditMetadata);
                    }

                    // Добавить данные сущности для сигнала.
                    if (metaElement.EntitySchemaUId != null) {
                        parameters.push(new Parameter("EntitySchemaUId", null, metaElement.EntitySchemaUId));
                    }

                    var event = new Event();
                    switch(metaElement.TypeName) {
                        case ElementType.StartSignalEvent:
                            var signal = new Signal(
                                metaElement.Signal,
                                metaElement.WaitingRandomSignal,
                                metaElement.WaitingEntitySignal,
                                metaElement.EntitySignal,
                                metaElement.NewEntityChangedColumns);
                            event = new Event(signal);
                            break;

                        case ElementType.StartMessageEvent:
                            var message = new Message(metaElement.Message);
                            event = new Event(null, message);
                            break;

                        case ElementType.StartTimerEvent:
                            var timer = new Timer(
                                metaElement.ExpressionType,
                                metaElement.CronExpression,
                                new Date(metaElement.StartDateTime),
                                new Date(metaElement.EndDateTime),
                                metaElement.TimeZoneOffset,
                                !metaElement.MisfireInstruction);
                            event = new Event(null, null, timer);
                            break;
                    }

                    return {
                        uId: metaElement.UId,
                        name: metaElement.Name,
                        type: metaElement.TypeName,
                        body: new Body(metaElement.Body),
                        parameters: new Parameters(parameters),
                        filters: filters,
                        event: event,
                        positions: positions,
                        x: Number(position.x),
                        y: Number(position.y),
                        width: Number(size.width),
                        height: Number(size.height),
                        sourceUId: metaElement.SourceRefUId, 
                        targetUId: metaElement.TargetRefUId, 
                        sourceSidePosition: sourceSidePosition,
                        targetSidePosition: targetSidePosition
                    };
                });
        },

        getFilters: function(metadata) {
            var items = [];
            
            Object.entries(metadata.items)
                .map(i => {
                    return i[1];
                })
                .forEach(item => {
                    var leftExpressionCaption = item.leftExpressionCaption != null
                        ? item.leftExpressionCaption
                        : item.leftExpression != null
							? item.leftExpression.columnPath
							: null;
                    
                    var rightExpressionFilter = null;
                    if (item.rightExpression != null) {
                        var rightExpressionValue = !!item.rightExpression.functionArgument
                            ? item.rightExpression.functionArgument.parameter.value
                            : !!item.rightExpression.parameter
                                ? !!item.rightExpression.parameter.value.displayValue
                                    ?   item.rightExpression.parameter.value.displayValue
                                    : !!item.rightExpression.parameter.value
                                        ? item.rightExpression.parameter.value
                                        : null
                                : null;

                        rightExpressionFilter = new FilterRightExpression(
                            rightExpressionValue,
                            item.rightExpression.expressionType,
                            item.rightExpression.functionType,
                            item.rightExpression.macrosType);
                    }
                    else if (Array.isArray(item.rightExpressions)) {
                        var valuesString = item.rightExpressions
                            .map(rightExpression => {
                                return rightExpression.parameter == null
                                    ? null
                                    : (rightExpression.parameter.value.displayValue == null ||
                                        rightExpression.parameter.value.displayValue == "")
                                        ? rightExpression.parameter.value.value
                                        : rightExpression.parameter.value.displayValue;
                            })
                            .join("; ");

                        rightExpressionFilter = new FilterRightExpression(valuesString);
                    }

                    var subFilters = null;
                    if (item.subFilters != null) {
                        subFilters = this.getFilters(item.subFilters);
                    }

                    var filter = new Filter(
                        item.key,
                        item.filterType,
                        item.comparisonType,
                        item.isEnabled,
                        item.isAggregative,
                        leftExpressionCaption,
                        rightExpressionFilter,
                        subFilters
                    );

                    items.push(filter);
                });

            return new Filters(
                items,
                metadata.rootSchemaName,
                metadata.logicalOperation,
                metadata.isEnabled
            );
        },

        _getNormalizedMetadata: function(metadata) {
            if (this._isArray(metadata)) {
                return metadata.map(e => {
                    if (this._isSimpleType(e)) {
                        return e;
                    }
                    else {
                        var neVal = this._getNormalizedMetadata(e);
                        return neVal;
                    }
                }); 
            }
            else if (this._isObject(metadata)) {
                var objectEmtries = Object.entries(metadata)
                    .map(v => {
                        var code = v[0];
                        var value = v[1];

                        var metainfo = Metadata
                            .find(md => {
                                var isEqual = code === md.Code;
                                var isMatch = md.Code instanceof RegExp && code.match(md.Code);
                                
                                return isEqual || isMatch;
                            });

                        if (metainfo == null) {
                            if (this._isObject(value))
                            {
                                var inNewObj = this._getNormalizedMetadata(value);
                                return [code, inNewObj];
                            }
                            else {
                                return;
                            }
                        }
                        
                        var isMatch = metainfo.Code instanceof RegExp && code.match(metainfo.Code);
                        var normalName = isMatch
                            ? code
                            : metainfo.Name;

                        if (this._isSimpleType(value)) {
                            return [normalName, value];
                        }
                        else {
                            var inNewObj = this._getNormalizedMetadata(value);
                            return [normalName, inNewObj];
                        }
                    });
                
                if (this._isArray(objectEmtries)) {
                    var notEmptyEntries = objectEmtries.filter(v => {return v != null;});
                    return Object.fromEntries(notEmptyEntries);
                }
                else {
                    return objectEmtries;
                }
            }
            else if (this._isSimpleType(metadata)) {
                return metadata;
            }
            else {
                throw `Не удалось определить тип значения в метаданных. Значение: "${metadata}"`;
            }
        },

        _isObject: function(value) {
            return value != null && !Array.isArray(value) && typeof(value) === "object";
        },

        _isArray: function(value) {
            return Array.isArray(value);
        },

        _isSimpleType: function(value) {
            return typeof(value) === "boolean" || typeof(value) === "string" || typeof(value) === "number";
        },

        _isJson(string) {
            try {
                JSON.parse(string);

                return true;
            }
            catch {
                return false;
            }
        },

        _parsePosition: function(positionString) {
            if (positionString == null) {
                return {x: 0, y: 0};
            }

            var positions = positionString.split(";");
            return {
                x: Number(positions[0]),
                y: Number(positions[1])
            }
        },

        _parseSize: function(sizeString) {
            if (sizeString == null) {
                return {width: 0, height: 0};
            }

            var size = sizeString.split(";");
            return {
                width: Number(size[0]),
                height: Number(size[1])
            }
        },

        _parseParameter: function(metaParameter, group) {
            if (metaParameter == null) {
                return new Parameter();
            }

            var mappingParameter = this.metadata[group].MetaData.Schema.Mapping
                .find(v => {
                    return v.TargetUId === metaParameter.UId;
                });
            var sourseParameter = mappingParameter != null
                ? mappingParameter
                : metaParameter;
            var sourseParameterValue = !!sourseParameter.SourceValue
                    ? sourseParameter.SourceValue.Value
                    : metaParameter.SourceValue.Value;
            var parameter = this._getLocalizedParameter(sourseParameterValue, group);

            return new Parameter(
                metaParameter.Name,
                metaParameter.DataValueTypeId,
                sourseParameterValue,
                parameter != null ? parameter.displayValue : null);
        },

        _getLocalizedParameter(parameterValue, group) {
            if (parameterValue == null) {
                return;
            }

            var parameter = this.localizedParameters[group]
                .find(parameter => {
                    if (parameter.value == parameterValue) {
                        return parameter;
                    }
                });
            
            // Если не удалось найти значение напрямую, то найти соответствие.
            if (parameter == null && parameterValue != null) {
                parameter = this.localizedParameters[group]
                    .find(parameter => {
                        var value = parameterValue.match(/Parameter:{(.*)}/);

                        if (value == null || value[1] == null) {
                            return;
                        }

                        var parameterValueUId = value[1];
                        if (parameter.value.includes(parameterValueUId)) {
                            return parameter;
                        }
                    });
            }

            return parameter;
        },

        _setLocalizedParameters(object, group) {
            if (object == null) {
                return;
            }

            if (this._isObject(object)) {
                if (object.value != null && object.displayValue != null) {
                    var value = object.value.value != null
                        ? object.value.value
                        : object.value;
                    var displayValue = object.displayValue.value != null
                        ? object.displayValue.value
                        : object.displayValue;

                    if (this._isSimpleType(value) && this._isSimpleType(displayValue)) {
                        this.localizedParameters[group].push({ value: value, displayValue: displayValue});
                    }

                    return;
                }
            }

            Object.entries(object)
                .forEach(entry => {
                    var propertyValue = entry[1];

                    if (this._isArray(propertyValue)) {
                        propertyValue
                            .forEach(propertyItem => {
                                this._setLocalizedParameters(propertyItem, group);
                            })
                    }
                    else if (this._isObject(propertyValue)) {
                        this._setLocalizedParameters(propertyValue, group);
                    }
                    else if (this._isJson(propertyValue)) {
                        var propertyJsonValue = JSON.parse(propertyValue);
                        this._setLocalizedParameters(propertyJsonValue, group);
                    }
                });
        }
    }
};