/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
    el: "#menuGrid",
    data: {
        burgers: burgers
    }
});

vm = new Vue({
    el: '#mapOrder',
    data: {
        orders: {},
        orderCoord: {},
        deliveryInfo: [],
        orderItems: []
    },
    created: function () {
        socket.on('initialize', function (data) {
            this.orders = data.orders;
        }.bind(this));

        socket.on('currentQueue', function (data) {
            this.orders = data.orders;
        }.bind(this));
    },
    methods: {
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function (event) {
            this.submitForm();
            socket.emit("addOrder", { orderId: this.getNext(),
                                      details: { x: this.orderCoord.x,
                                                 y: this.orderCoord.y,
                                                 name: this.deliveryInfo[0],
                                                 email: this.deliveryInfo[1],
                                                 paym: this.deliveryInfo[2],
                                                 gender: this.deliveryInfo[3]
                                               },
                                      orderItems: this.orderItems
                                    });
        },
        displayOrder: function (event) {
            console.log(event);
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
            this.orderCoord = { x: event.clientX - 10 - offset.x,
                                y: event.clientY - 10 - offset.y };
        },
        submitForm: function() {
            this.deliveryInfo = getOrderInfo();
            this.orderItems = getBurgerOrder();
        }
    }
});
