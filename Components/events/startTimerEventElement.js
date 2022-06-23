Vue.component("start-timer-event-element", {
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
                return new Details(new Parameters(), new Body(), new Filters(), new Event());
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
        getElementStyle: function() {
            var elementStyle = {
                "border-radius": "50%"
            };

            return elementStyle;
        },

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
        }
    },
    template: `
        <div class="start-timer-event-element">

            <base-element
                :uId="uId"
                :name="name"
                :x="x"
                :y="y"
                :width="width"
                :height="height"
                :group="group"
                :status="status"
                :elementStyle="getElementStyle()"
                :details="details"
                :isShowDetailsInitial="isShowDetailsInitial"
                @ClickElementEvent="changeIsShowDetails"></base-element>
            
            <details-element 
                v-if="getIsShowDetails()"
                :group="group">

                <start-timer-details
                    :timer="details.event.timer"></start-timer-details>

            </details-element>

        </div>`
});