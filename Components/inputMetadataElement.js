Vue.component("input-metadata-element", {
    props: {
        group: String,
        isMetadata: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getElementStyle() {
            var style = {
                "left": this.group === Group.NewProcess ? "50%" : "0%",
                "width": "49%",
                "top": "90vh",
                "height": "10vh"
            };

            return style;
        }
    },
    template: `
        <div class="input-metadata-element">
            <textarea :style="getElementStyle()"></textarea>
        </div>`
});