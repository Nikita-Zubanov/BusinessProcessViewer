Vue.component("link-entity-details", {
    props: {
        parameters: {
            type: Parameters,
            default: function() {
                return new Parameters();
            }
        }
    },
    methods: {
        getLinkEntityCaption: function() {
            var linkEntity =  this.parameters.values
                .find(parameter => {
                    if (parameter.name === "EntitySchemaId") {
                        return parameter;
                    }
                });
            
            return linkEntity == null
                ? "[Объект не найден]"
                : linkEntity.getDisplayValue();
        },

        getLinkEntityRowCaption: function() {
            var linkEntityRow =  this.parameters.values
                .find(parameter => {
                    if (parameter.name === "EntityId") {
                        return parameter;
                    }
                });
            
            return linkEntityRow == null
                ? "[Запись объекта не найдена]"
                : linkEntityRow.getDisplayValue();
        }
    },
    template: `
        <div class="link-entity-details">
            <label>К какой записи привязать процесс?</label></br></br>
            
            <label>Объект привязки</label></br>
            <label>{{ getLinkEntityCaption() }}</label></br></br>

            <label>Запись объекта привязки</label></br>
            <label>{{ getLinkEntityRowCaption() }}</label>
        </div>`
});