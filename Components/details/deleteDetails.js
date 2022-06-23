Vue.component("delete-details", {
    props: {
        filters: {
            type: Filters,
            default: function() {
                return new Filters();
            }
        }
    },
    template: `
        <div class="delete-details">
            <label>Данные какого объекта удалить?</label>
            </br><label>{{ filters.rootSchemaName }}</label></br>
            
            </br><label>Изменить все записи, соответствующие условию</label>
            <filter-details :filters="filters"></filter-details>
        </div>`
});