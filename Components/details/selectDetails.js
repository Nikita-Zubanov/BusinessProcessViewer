Vue.component("select-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        },
        selectDetails: {
            type: SelectDetails,
            default: function() {
                return new SelectDetails();
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
            return this.selectDetails != null &&
                this.selectDetails.resultType != null &&
                this.selectDetails.resultType.value !== 0;
        },

        isShowColumnsOrder: function() {
            return this.selectDetails != null &&
                Array.isArray(this.selectDetails.orderInfo) &&
                this.selectDetails.orderInfo.length > 0;
        },

        isShowSelectColumns: function() {
            return this.selectDetails != null &&
                Array.isArray(this.selectDetails.entityColumnMetaPathes) &&
                this.selectDetails.entityColumnMetaPathes.length > 0;
        }
    },
    template: `
        <div class="select-details">
            <label>Какой режим чтения данных использовать?</label>
            <div v-if="!isShowSelectFunction()">
                <label>{{ selectDetails.resultType.displayValue }}</label>
            </div>
            <div v-else>
                <label>
                    {{ selectDetails.resultType.displayValue }} "{{ selectDetails.functionType.displayValue }}"
                </label>
                <div v-if="!!selectDetails.aggregationColumnName">
                    <label>По колонке: </label>
                    </br><label>{{ selectDetails.aggregationColumnName }}</label>
                </div>
            </div>
            
            <div class="filters" v-if="isShowFilters()">
                </br><label>Из какого объекта читать данные?</label>
                </br><label>{{ filters.rootSchemaName }}</label></br>
                
                </br><label>Как отфильтровать записи?</label>
                <filter-details :filters="filters"></filter-details>
            </div>

            </br><label>Как отсортировать записи?</label>
            <div v-if="isShowColumnsOrder()">
                <ul :style="getParametersListStyle()">
                    <li v-for="orderInfo in selectDetails.orderInfo">
                        <label>{{ orderInfo.propertyName }}</label> <label>{{ orderInfo.value.displayValue }}</label></br>
                    </li>
                </ul>
            </div>
            <div v-else>
                <label>А никак!</label></br>
            </div>
            
            </br><label>Значение каких колонок вычитать?</label>
            <div v-if="isShowSelectColumns()">
                <label>Только выбранных колонок</label>
                <ul :style="getParametersListStyle()">
                    <li v-for="columnId in selectDetails.entityColumnMetaPathes">
                        <label>{{ columnId }}</label></br>
                    </li>
                </ul>
            </div>
            <div v-else>
                <label>Всех колонок</label></br>
            </div>
        </div>`
});