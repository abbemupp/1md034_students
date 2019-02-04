var vm = new Vue({
    el: "#menuGrid",
    data: {
        burgers: burgers
    }
})

vm = new Vue({
    el: "#placeOrder",
    data: {
        key: [],
        values: []
    },
    methods: {
        submitForm: function(key) {
            key = getOrderInfo();
            console.log(key);
        }
    }
})
