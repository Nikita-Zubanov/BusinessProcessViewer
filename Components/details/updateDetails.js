Vue.component("update-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        },
        updateDetails: {
            type: UpdateDetails,
            default: function() {
                return new UpdateDetails();
            }
        }
    },
    methods: {
        getParametersListStyle: function() {
            return {
                "list-style-type": "none",
                "text-align": "left"
            };
        }
    },
    template: `
        <div class="update-details">
            <label>Данные какого объекта изменить?</label>
            </br><label>{{ filters.rootSchemaName }}</label></br>
            
            </br><label>Изменить все записи, соответствующие условию</label>
            <filter-details :filters="filters"></filter-details>

            </br><label>Какие значения полей установить для измененных записей?</label>
            <ul :style="getParametersListStyle()">
                <li v-for="param in updateDetails.recordChangeValues">
                    <label>{{ param.columnMetaPath.value }}: </label>
                    </br><label>{{ param.displayValue.value }}</label></br>
                </li>
            </ul>
        </div>`
});