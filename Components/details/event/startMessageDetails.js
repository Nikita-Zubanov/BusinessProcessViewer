Vue.component("start-message-details", {
    props: {
        message: {
            type: Message,
            default: function() {
                return new Message();
            }
        }
    },
    methods: {},
    template: `
        <div class="start-message-details">
        
            <label>При получении какого сообщения запускать процесс?</label></br>
            <label>{{ message.code }}</label>

        </div>`
});