var vm = new Vue({
    el: "#line",
    mixins: [componentCreator],
    data: function() {
        return {
            groupFlowElements: {},
            oldProcessMetadataElement: null,
            newProcessMetadataElement: null,
            showButtonElement: null
        }
    },
    render: function(createElementCallback) {
        var processElements = [];
        var groupFlowElementCount = Object.keys(this.groupFlowElements).length;
        if (groupFlowElementCount > 0) {
            this.setPosistionsPolylines(this.groupFlowElements[Group.OldProcess]);
            this.setPosistionsPolylines(this.groupFlowElements[Group.NewProcess]);

            this.shiftFlowElements(this.groupFlowElements[Group.NewProcess], 10, 10);
            this.setStatusFlowElements(this.groupFlowElements[Group.OldProcess], this.groupFlowElements[Group.NewProcess]);

            var oldScriptTasks = this.getScriptTaskElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newScriptTasks = this.getScriptTaskElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            var oldUserTasks = this.getUserTaskElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newUserTasks = this.getUserTaskElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            var oldFormulaTasks = this.getFormulaTaskElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newFormulaTasks = this.getFormulaTaskElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);
            
            var oldConditionalElements = this.getConditionalElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newConditionalElements = this.getConditionalElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            var oldStartEventElements = this.getStartEventElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newStartEventElements = this.getStartEventElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            var oldStartMessageEventElements = this.getStartMessageEventElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var oldStartSignalEventElements = this.getStartSignalEventElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var oldStartTimerEventElements = this.getStartTimerEventElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var oldTerminateEventElements = this.getTerminateEventElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);

            var newStartMessageEventElements = this.getStartMessageEventElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);
            var newStartSignalEventElements = this.getStartSignalEventElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);
            var newStartTimerEventElements = this.getStartTimerEventElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);
            var newTerminateEventElements = this.getTerminateEventElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            var oldPolylines = this.getSequenceFlows(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newPolylines = this.getSequenceFlows(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);
            
            var oldUndefinedElements = this.getUndefinedElements(this.groupFlowElements[Group.OldProcess], Group.OldProcess, createElementCallback);
            var newUndefinedElements = this.getUndefinedElements(this.groupFlowElements[Group.NewProcess], Group.NewProcess, createElementCallback);

            processElements = processElements.concat(
                oldScriptTasks, newScriptTasks,
                oldUserTasks, newUserTasks,
                oldFormulaTasks, newFormulaTasks,
                oldPolylines, newPolylines,
                oldConditionalElements, newConditionalElements,
                oldStartEventElements, newStartEventElements,
                oldStartMessageEventElements, newStartMessageEventElements,
                oldStartSignalEventElements, newStartSignalEventElements,
                oldStartTimerEventElements, newStartTimerEventElements,
                oldTerminateEventElements, newTerminateEventElements,
                oldUndefinedElements, newUndefinedElements);
        }

        if (this.oldProcessMetadataElement == null) {
            this.oldProcessMetadataElement = this.getProcessMetadata(Group.OldProcess, createElementCallback);
        }

        if (this.newProcessMetadataElement == null) {
            this.newProcessMetadataElement = this.getProcessMetadata(Group.NewProcess, createElementCallback);
        }

        if (this.showButtonElement == null) {
            this.showButtonElement = this.getProcessShowButton(createElementCallback);
        }
        
        return createElementCallback('div', [
            processElements,
            this.oldProcessMetadataElement,
            this.newProcessMetadataElement,
            this.showButtonElement
        ]);
    }
});