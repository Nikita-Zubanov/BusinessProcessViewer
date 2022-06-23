Vue.component("base-element", {
    props: {
        uId: String,
        name: String,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        group: String,
        status: String,
        additionalClass: String,
        elementStyle: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    methods: {
        getElementStyle() {
            var backgroundColor = "";
            var borderColor = "";
            switch(this.status){
                case ElementStatus.Changed:
                    backgroundColor = borderColor = "#E89605";
                    break;
                
                case ElementStatus.Deleted:
                    backgroundColor = borderColor = "#F20A05";
                    break;
                
                case ElementStatus.Added:
                    backgroundColor = borderColor = "#8ECB60";
                    break;
                
                case ElementStatus.NotChanged:
                    backgroundColor = borderColor = "#AEB5AF";
                    break;
                
                case ElementStatus.Undefined:
                    backgroundColor = borderColor = "#737373";
                    break;
                
                default:
                    throw `Элемент с uId "${this.uId}" группы "${this.group}" имеет неопределенный статус. Невозможно установить цвет элемента!`;
            }
            
            Object.assign(this.elementStyle, {
                "position": "relative",
                "height": this.height + "px",
                "width": this.width + "px",
                "left": this.x + "px",
                "top": this.y + "px",
                "background-color": backgroundColor,
                "border-color": borderColor
            });
            
            if (this.group === Group.OldProcess) {
                this.elementStyle["opacity"] = 0.5;
            }
            else {
                this.elementStyle["opacity"] = 1;
            }
    
            return this.elementStyle;
        },
        
        onClickElement: function() {
            this.closeOtherDetails();

            this.$emit("ClickElementEvent");

            if (this._getIsShowDetails()) {
                this.setDifference();
            }
            else {
                this.reloadDetails();
            }
        },

        _getIsShowDetails: function() {
            var parentEl = vm.$children.find(el => {
                if (el.uId === this.uId) {
                    return el;
                }
            });
            
            if (parentEl != null && parentEl.getIsShowDetails instanceof Function) {
                return parentEl.getIsShowDetails();
            }

            return false;
        },

        closeOtherDetails: function() {
            vm.$children
                .filter(el => {
                    return el.uId !== this.uId &&
                        el.getIsShowDetails instanceof Function && 
                        el.getIsShowDetails();
                })
                .forEach(el => {
                    if (el.setIsShowDetails instanceof Function) {
                        el.setIsShowDetails(false);
                    }
                });
        },

        reloadDetails: function() {
            vm.$children
                .forEach(el => {
                    if (el.reloadDetails instanceof Function) {
                        el.reloadDetails();
                    }
                });
        },

        setDifference: function() {
            var elements = vm.$children
                .filter(el => {
                    return el.uId === this.uId &&
                        el.getIsShowDetails instanceof Function && 
                        el.getIsShowDetails();
                });
            var currentEl = elements
                .find(el => {
                    return el.group === this.group;
                });
            var otherEl = elements
                .find(el => {
                    return el.group !== this.group;
                });
            
            if (currentEl != null && otherEl != null) {
                if (currentEl.body != null){
                    currentEl.body.setDifferent(otherEl.body);
                    otherEl.body.setDifferent(currentEl.body);
                    currentEl.body.setDifferent(otherEl.body);
                }
            }
        },

        getAdditionalClass: function() {
            return this.additionalClass;
        }
    },
    template: `
        <div class="base-element">
            <button
                v-on:click="onClickElement"
                :title="name"
                :class="getAdditionalClass()"
                :style="getElementStyle()"></button>
        </div>`
});