Vue.component("flow-element", {
    props: {
        sourceUId: String,
        targetUId: String,
        positions: String
    },
    template: `
        <svg id="flow-element" width="3000" height="2000">
            <polyline :points="positions" fill="none" stroke="black" />
        </svg>`
});