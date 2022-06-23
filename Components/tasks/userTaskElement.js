Vue.component("user-task-element", {
    props: {
        uId: String,
        name: String,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        group: String,
        status: String,
        details: {
            type: Details,
            default: function() {
                return new Details(new Parameters(), new Body(), new Filters());
            }
        },
        isShowDetailsInitial: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            _isShowDetails: this.isShowDetailsInitial
        }
    },
    methods: {
        reloadDetails: function() {
            this.$children
                .forEach(el => {
                    if (el.reload instanceof Function) {
                        el.reload();
                    }
                });
        },

        getIsShowDetails: function() {
            return this._data._isShowDetails;
        },

        setIsShowDetails: function(value) {
            this._data._isShowDetails = value;
        },

        changeIsShowDetails: function() {
            this._data._isShowDetails = !this._data._isShowDetails;
        },

        isShowSelectDetails: function() {
            return this.details.selectDetails != null &&
                (
                    this.details.selectDetails.resultType != null ||
                    this.details.selectDetails.functionType != null ||
                    this.details.selectDetails.aggregationColumnName != null
                );
        },

        isShowInsertDetails: function() {
            return this.details.insertDetails != null &&
                this.details.insertDetails.recordAddMode != null;
        },

        isShowUpdateDetails: function() {
            return this.details.updateDetails != null &&
                this.details.updateDetails.recordChangeValues != null;
        },

        isShowDeleteDetails: function() {
            return this.isAnyShow() &&
                this.isShowFilters() &&
                !this.isShowSelectDetails() &&
                !this.isShowInsertDetails() &&
                !this.isShowUpdateDetails();
        },

        isShowLinkEntityDetails: function() {
            return this.isShowParameters() &&
                !this.isShowDeleteDetails() &&
                !this.isShowSelectDetails() &&
                !this.isShowInsertDetails() &&
                !this.isShowUpdateDetails();
        },
        
        isAnyShow: function() {
            return this.isShowData() ||
                this.isShowParameters();
        },

        isShowData: function() {
            return this.body != null &&
                this.body instanceof Body &&
                !this.body.isEmpty();
        },

        isShowParameters: function() {
            return this.details.parameters != null &&
                this.details.parameters instanceof Parameters &&
                !this.details.parameters.isEmpty();
        },

        isShowFilters: function() {
            return this.details.filters != null &&
                this.details.filters instanceof Filters &&
                !this.details.filters.isEmpty();
        }
    },
    template: `
        <div class="user-task-element">

            <base-element
                class="task-element"
                :uId="uId"
                :name="name"
                :x="x"
                :y="y"
                :width="width"
                :height="height"
                :group="group"
                :status="status"
                :details="details"
                :isShowDetailsInitial="isShowDetailsInitial"
                @ClickElementEvent="changeIsShowDetails"></base-element>

            <details-element 
                v-if="getIsShowDetails()"
                :group="group">

                <select-details
                    v-if="isShowSelectDetails()"
                    :filters="details.filters"
                    :selectDetails="details.selectDetails"></select-details>
                
                <insert-details
                    v-if="isShowInsertDetails()"
                    :filters="details.filters"
                    :insertDetails="details.insertDetails"
                    :entitySchema="details.entitySchema"></insert-details>
                
                <update-details
                    v-if="isShowUpdateDetails()"
                    :filters="details.filters"
                    :updateDetails="details.updateDetails"></update-details>
                
                <delete-details
                    v-if="isShowDeleteDetails()"
                    :filters="details.filters"></delete-details>
                
                <link-entity-details
                    v-if="isShowLinkEntityDetails()"
                    :parameters="details.parameters"></link-entity-details>
                
            </details-element>
            
        </div>`
});