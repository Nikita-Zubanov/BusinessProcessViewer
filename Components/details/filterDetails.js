Vue.component("filter-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        }
    },
    methods: {
        reload() {},

        getElementStyle: function() {
            return {
                "display": "flex",
                "flex-direction": "row",
                "text-align": "center"
            };
        },

        getLeftStyle: function() {
            return {
                "max-width": "100%",
                "min-width": "70px",
                "max-height": "100%",
                "min-height": "70px",
                "border-right": "2px solid #8ECB60"
            };
        },

        getRightStyle: function() {
            return {
                "max-width": "100%",
                "min-width": "300px",
                "max-height": "100%",
                "min-height": "70px"
            };
        },

        getFilterListStyle: function() {
            return {
                "list-style-type": "none",
                "text-align": "left"
            };
        },
        
        isShowValue: function(filterRightExpression) {
            return filterRightExpression != null &&
                filterRightExpression.value != null;
        },
        
        isShowMacros: function(filterRightExpression) {
            return filterRightExpression != null &&
                filterRightExpression.macros != null &&
                filterRightExpression.macros.value != null;
        },
        
        isShowSubFilters: function(filter) {
            return filter != null &&
                filter.subFilters != null;
        }
    },
    template: `
        <div class="filter-details" :style="getElementStyle()">
            <div class="left" :style="getLeftStyle()">
                <input type="checkbox" v-model="filters.isEnabled" required>
                <label>{{ filters.logicalOperation.displayValue }}</label>
            </div>
            <div class="right" :style="getRightStyle()">
                <ul :style="getFilterListStyle()">
                    <li v-for="filter in filters.values">
                        <input type="checkbox" v-model="filter.isEnabled" required>
                        <label>{{ filter.leftExpressionCaption }}</label>
                        <label>{{ filter.comparisonType.displayValue }}</label>
                        <div class="filter-right-expression">
                            <div class="filter-right-expression-macros" v-if="isShowMacros(filter.filterRightExpression)">
                                {{ filter.filterRightExpression.macros.displayValue }}
                            </div>
                            <div class="filter-right-expression-value" v-if="isShowValue(filter.filterRightExpression)">
                                {{ filter.filterRightExpression.value }}
                            </div>
                        </div>
                        <div class="sub-filters" v-if="isShowSubFilters(filter)">
                            <filter-details :filters="filter.subFilters"></filter-details>
                        </div>
                    </li>
                </ul>
            </div>
        </div>`
});