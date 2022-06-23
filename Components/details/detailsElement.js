Vue.component("details-element", {
    props: {
        group: String
    },
    methods: {
        getElementStyle: function() {
            return {
                "z-index": "3",
                "background-color": "#FFFFFF",
                "position": "fixed",
                "right": "0vh",
                "transform": this.group === Group.OldProcess ? "translateX(-100%)" : null,
                "border": "rosybrown 1px",
                "width": "auto",
                "height": "auto"
            };
        }
    },
    template: `
        <div class="details-element" :style="getElementStyle()">
            <slot></slot>
        </div>`
});