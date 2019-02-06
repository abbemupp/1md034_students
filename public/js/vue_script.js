var vm = new Vue({
    el: "#menuGrid",
    data: {
        burgers: burgers
    }
})

vm = new Vue({
    el: "#placeOrder",
    data: {
        values: []
    },
    methods: {
        submitForm: function(values) {
            this.values = getOrderInfo();
        }
    }
})
