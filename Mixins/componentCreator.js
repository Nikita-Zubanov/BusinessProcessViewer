var componentCreator = {
    methods: {
        getScriptTaskElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.ScriptTask;
                })
                .map(el => {
                    return createElementCallback(`script-task-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            body: el.body,
                            width: Number(el.width),
                            height: Number(el.height),
                            x: Number(el.x),
                            y: Number(el.y),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },
        
        getUserTaskElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.UserTask;
                })
                .map(el => {
                    return createElementCallback(`user-task-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            width: Number(el.width),
                            height: Number(el.height),
                            x: Number(el.x),
                            y: Number(el.y),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getFormulaTaskElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.FormulaTask;
                })
                .map(el => {
                    return createElementCallback(`formula-task-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            width: Number(el.width),
                            height: Number(el.height),
                            x: Number(el.x),
                            y: Number(el.y),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getConditionalElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.ExclusiveGateway;
                })
                .map(el => {
                    return createElementCallback(`conditional-element`, {
                        props: {
                            uId: el.uId,
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getStartEventElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.StartEvent;
                })
                .map(el => {
                    return createElementCallback(`start-event-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getStartSignalEventElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.StartSignalEvent;
                })
                .map(el => {
                    return createElementCallback(`start-signal-event-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getStartMessageEventElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.StartMessageEvent;
                })
                .map(el => {
                    return createElementCallback(`start-message-event-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getStartTimerEventElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.StartTimerEvent;
                })
                .map(el => {
                    return createElementCallback(`start-timer-event-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getTerminateEventElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.TerminateEvent;
                })
                .map(el => {
                    return createElementCallback(`terminate-event-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            details: new Details(el.parameters, el.body, el.filters, el.event),
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: el.status
                        }
                    });
                });
        },

        getSequenceFlows: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return el.type === ElementType.SequenceFlow ||
                        el.type === ElementType.ConditionalFlow;
                })
                .map(el => {
                    var positions = el.positions
                        .map(function(position) {
                            return `${position.x},${position.y}`;
                        })
                        .join(" "); 
                    
                    return createElementCallback(`flow-element`, {
                        props: {
                            sourceUId: el.sourceUId,
                            targetUId: el.targetUId,
                            positions: positions,
                            group: group
                        }
                    });
                });
        },

        getUndefinedElements: function(flowElements, group, createElementCallback) {
            if (flowElements == null) {
                return;
            }

            return flowElements
                .filter(el => {
                    return !Object.values(ElementType).includes(el.type);
                })
                .map(el => {
                    return createElementCallback(`undefined-element`, {
                        props: {
                            uId: el.uId,
                            name: el.name,
                            x: Number(el.x),
                            y: Number(el.y),
                            width: Number(el.width),
                            height: Number(el.height),
                            group: group,
                            status: ElementStatus.Undefined
                        }
                    });
                });
        },

        getFilterDetailsElement: function(createElementCallback, filters) {
            return createElementCallback(`details-filter-element`, {
                    props: {
                        filters: filters
                    }
                });
        },
        
        getProcessMetadata: function(group, createElementCallback) {
            return createElementCallback(`input-metadata-element`, {
                    props: {
                        group: group
                    }
                });
        },
        
        getProcessShowButton: function(createElementCallback) {
            return createElementCallback(`start-button-element`, {});
        },

        shiftFlowElements: function(newFlowElements, x, y) {
            if (newFlowElements == null) {
                return;
            }

            newFlowElements
                .forEach(newEl => {
                    switch(newEl.type){
                        case ElementType.ConditionalFlow:
                        case ElementType.SequenceFlow:
                            newEl.positions
                                .forEach(function(position) {
                                    position.x += x;
                                    position.y += y;
                                });
                            break;
                        
                        default:
                            newEl.x += x;
                            newEl.y += y;
                    }
                });
        },

        setPosistionsPolylines: function(flowElements) {
            if (!Array.isArray(flowElements) || flowElements.length === 0) {
                return;
            }

            var sequenceFlows = flowElements
                .filter(el => {
                    return el.type === ElementType.SequenceFlow ||
                        el.type === ElementType.ConditionalFlow;
                });
            
            sequenceFlows.forEach(sf => {
                var sourseEl = flowElements
                    .filter(el => {
                        return el.uId === sf.sourceUId;
                    })[0];
                var targetEl = flowElements
                    .filter(el => {
                        return el.uId === sf.targetUId;
                    })[0];
                
                var firstPosition = this._getPositionBySide(
                    sf.sourceSidePosition.x,
                    sf.sourceSidePosition.y,
                    sourseEl.x,
                    sourseEl.y,
                    sourseEl.width,
                    sourseEl.height,
                    true
                );
                
                var lastPosition = this._getPositionBySide(
                    sf.targetSidePosition.x,
                    sf.targetSidePosition.y,
                    targetEl.x,
                    targetEl.y,
                    targetEl.width,
                    targetEl.height
                );

                sf.positions.unshift(firstPosition);
                sf.positions.push(lastPosition);
            });
        },

        _getPositionBySide: function(sidePositionX, sidePositionY, positionX, positionY, width, height, isSourceElement = false) {
            // Левая сторона.
            if (sidePositionX == -1 && sidePositionY == 0) {
                return {
                    x: Number(positionX),
                    y: Number(positionY) + (Number(height) / 2)
                };
            }
            // Правая сторона.
            else if (sidePositionX == 1 && sidePositionY == 0) {
                return {
                    x: Number(positionX) + Number(width),
                    y: Number(positionY) + (Number(height) / 2)
                };
            }
            // Верхняя сторона.
            else if (sidePositionX == 0 && sidePositionY == -1) {
                return {
                    x: Number(positionX) + (Number(width) / 2),
                    y: Number(positionY)  + Number(height)
                };
            }
            // Нижняя сторона.
            else if (sidePositionX == 0 && sidePositionY == 1) {
                return {
                    x: Number(positionX) + (Number(width) / 2),
                    y: Number(positionY)
                };
            }
            else {
                // По умолчанию правая сторона для элемента-источника.
                if (isSourceElement) {
                    return {
                        x: Number(positionX) + Number(width),
                        y: Number(positionY)  + (Number(height) / 2)
                    };
                }
                // По умолчанию левая сторона для элемента-следствия.
                else {
                    return {
                        x: Number(positionX),
                        y: Number(positionY)  + (Number(height) / 2)
                    };
                }
            }
        },
        
        setStatusFlowElements: function(oldFlowElements, newFlowElements) {
            if ((oldFlowElements == null || !Array.isArray(oldFlowElements)) &&
                (newFlowElements == null || !Array.isArray(newFlowElements))) {
                return;
            }

            if (!Array.isArray(oldFlowElements) || oldFlowElements.length === 0) {
                newFlowElements
                    .forEach(el => {
                        el.status = ElementStatus.NotChanged;
                    });
                return;
            }
            else if (!Array.isArray(newFlowElements) || newFlowElements.length === 0) {
                oldFlowElements
                    .forEach(el => {
                        el.status = ElementStatus.NotChanged;
                    });
                return;
            }

            newFlowElements
                .forEach(newEl => {
                    var identicalOldEl = oldFlowElements.find(oldEl => {
                        if (oldEl.uId === newEl.uId) {
                            if (oldEl.parameters != null && 
                                newEl.parameters != null &&
                                !oldEl.parameters.isEmpty() &&
                                !newEl.parameters.isEmpty()) {
                                if (oldEl.parameters.equals(newEl.parameters)) {
                                    newEl.status = ElementStatus.NotChanged;
                                    oldEl.status = ElementStatus.NotChanged;
                                }
                                else {
                                    newEl.status = ElementStatus.Changed;
                                    oldEl.status = ElementStatus.Changed;
                                }
                            }
                            else if (oldEl.body != null && 
                                newEl.body != null &&
                                !oldEl.body.isEmpty() &&
                                !newEl.body.isEmpty()) {
                                if (oldEl.body.equals(newEl.body)) {
                                    newEl.status = ElementStatus.NotChanged;
                                    oldEl.status = ElementStatus.NotChanged;
                                }
                                else {
                                    newEl.status = ElementStatus.Changed;
                                    oldEl.status = ElementStatus.Changed;
                                }
                            }
                            else if (oldEl.filters != null && 
                                newEl.filters != null &&
                                !oldEl.filters.isEmpty() &&
                                !newEl.filters.isEmpty()) {
                                if (oldEl.filters.equals(newEl.filters)) {
                                    newEl.status = ElementStatus.NotChanged;
                                    oldEl.status = ElementStatus.NotChanged;
                                }
                                else {
                                    newEl.status = ElementStatus.Changed;
                                    oldEl.status = ElementStatus.Changed;
                                }
                            }
                            else {
                                newEl.status = ElementStatus.NotChanged;
                                oldEl.status = ElementStatus.NotChanged;
                            }
                            
                            return oldEl;
                        }
                    });

                    if (identicalOldEl == null) {
                        newEl.status = ElementStatus.Added;
                        return;
                    }
                });
            oldFlowElements
                .filter(oldEl => {
                    return !newFlowElements.some(newEl => {
                        return newEl.uId === oldEl.uId;
                    });
                })
                .forEach(oldEl => {
                    oldEl.status = ElementStatus.Deleted;
                });
        }
    }
};