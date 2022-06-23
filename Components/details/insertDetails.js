Vue.component("insert-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        },
        insertDetails: {
            type: InsertDetails,
            default: function() {
                return new InsertDetails();
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

        isShowSelectFunction: function() {
            return this.insertDetails != null &&
                this.insertDetails.recordAddMode != null &&
                this.insertDetails.recordAddMode.value !== 0;
        }
    },
    template: `
        <div class="insert-details">
            <label>В какой объект добавить данные?</label>
            </br><label>{{ entitySchema.value }}</label></br>
            
            </br><label>Какой режим добавления данных?</label>
            </br><label>{{ insertDetails.recordAddMode.displayValue }}</label></br>
            
            <div class="filters" v-if="isShowSelectFunction() && isShowFilters()">
                </br><label>Выборка по объекту</label>
                <label>{{ filters.rootSchemaName }}</label></br>
                
                </br><label>Условие фильтрации выборки</label>
                <filter-details :filters="filters"></filter-details>
            </div>
            
            </br><label>Какие значения колонок установить?</label>
            <ul :style="getParametersListStyle()">
                <li v-for="param in insertDetails.recordDefValues">
                    <label>{{ param.columnMetaPath.value }}: </label>
                    </br><label>{{ param.displayValue.value }}</label></br>
                </li>
            </ul>
        </div>`
});