Vue.component("start-button-element", {
    props: {
        group: String
    },
    data: function () {
        return {
           value: ""
        };
    },
    mixins: [metadataAnalizator],
    methods: {
        onClick: function() {
            var metadataStrings = vm.$children
                .filter(c => {return c.isMetadata});

            if (metadataStrings.length === 0) {
                return;
            }

            // Сформировать из метаданных читабельный объект.
            metadataStrings
                .forEach(ms => {
                    var metadataString = ms.$el.childNodes[0].value;
                    
                    if (!metadataString) {
                        return;
                    }

                    this.initMetadata(ms.group, metadataString);
                });
            this.normalizeMetadata();

            // Разбить метаданные на группы и преобразовать в однотипные объекты.
            metadataStrings
                .forEach(ms => {
                    vm.groupFlowElements[ms.group] = this.getFlowElements(ms.group);
                });
            vm.$forceUpdate()
        }
    },
    template: `
        <div class="start-button-element">
            <button v-on:click="onClick">Показать</button>
        </div>`
});