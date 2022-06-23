Vue.component("start-signal-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        },
        signal: {
            type: Signal,
            default: function() {
                return new Signal();
            }
        },
        entitySchema: {
            type: EntitySchema,
            default: function() {
                return new EntitySchema();
            }
        }
    },
    methods: {
        getParametersListStyle: function() {
            return {
                "list-style-type": "none",
                "text-align": "left"
            };
        },

        isShowFilters: function() {
            return this.filters != null &&
                this.filters instanceof Filters &&
                !this.filters.isEmpty();
        },

        isArbitrarySignal: function() {
            return this.signal.code != null && this.signal.code != "null";
        },

        isEntityChangedSignal: function() {
            return this.signal.entitySignalType.value == EntityChangeType.Updated.value;
        }
    },
    template: `
        <div class="start-signal-details">
        
            <label>Сигнал какого типа получен?</label></br>

            <div v-if="isArbitrarySignal()">
                <label>Получен произвольный сигнал</label></br></br>

                <label>Сигнал</label></br>
                <label>{{ signal.code }}</label>
            </div>
            <div v-else>
                <label>Получен сигнал от объекта</label></br></br>

                <label>Объект</label></br>
                <label v-if="!!filters.rootSchemaName">{{ filters.rootSchemaName }}</label>
                <label v-else>{{ entitySchema.value }}</label></br></br>
                
                <label>Какое событие должно произойти?</label></br>
                <label>{{ signal.entitySignalType.displayValue }}</label></br></br>

                <div v-if="isEntityChangedSignal()">
                    <label>Ожидать изменения</label></br>
                    <div v-if="signal.changedColumns.length == 0">
                        <label>Любого поля</label></br>
                    </div>
                    <div v-else>
                        <label>Любого поля из выбранных</label></br>
                        <ul :style="getParametersListStyle()">
                            <li v-for="changedColumn in signal.changedColumns">
                                <label>{{ changedColumn }}</label></br>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="filters" v-if="isShowFilters()">                
                    </br><label>Добавленная запись должна соответствовать условиям</label>
                    <filter-details :filters="filters"></filter-details>
                </div>
            </div>

        </div>`
});