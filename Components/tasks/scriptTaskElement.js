Vue.component("script-task-element", {
    props: {
        uId: String,
        name: String,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        group: String,
        status: String,
        body: {
            type: Body,
            default: function() {
                return new Body();
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

        getBodyPartStyle: function(part) {
            var bodyPartColor = "";
            switch(part.status)
            {
                case BodyPartStatus.Changed:
                    bodyPartColor = "#E89605";
                    break;

                case BodyPartStatus.NotChanged:
                    bodyPartColor = "#FFFFFF";
                    break;
            }

            return {
                "background-color": bodyPartColor
            };
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
        <div class="script-task-element">
        
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
                :isShowDetailsInitial="isShowDetailsInitial"
                @ClickElementEvent="changeIsShowDetails"></base-element>

            <details-element 
                v-if="getIsShowDetails()"
                :group="group">

                <div class="body">
                    <pre><span v-for="part in body.bodyParts" :style="getBodyPartStyle(part)">{{ part.value }}</span></pre>
                </div>

            </details-element>

        </div>`
});