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
        orderCoords: {},
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
        addOrder: function (event) {
            this.submitForm();
            for (var i = 0; i < this.deliveryInfo.length; ++i)
            {
                if (this.deliveryInfo[i] == "")
                    throw "You have to fill out all the fields!";
            }
            if (this.orderItems.length == 0)
                throw "You have to actually order a burger!";
            if (this.orderCoords.x == null && this.orderCoords.y == null)
                throw "You have to set a location on the map!";
            socket.emit("addOrder", { details: { x: this.orderCoords.x,
                                                 y: this.orderCoords.y,
                                                 name: this.deliveryInfo[0],
                                                 email: this.deliveryInfo[1],
                                                 paym: this.deliveryInfo[2],
                                                 gender: this.deliveryInfo[3]
                                               },
                                      orderItems: this.orderItems
                                    });
        },
        displayOrder: function (event) {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                          y: event.currentTarget.getBoundingClientRect().top};
            this.orderCoords = { x: event.clientX - 10 - offset.x,
                                 y: event.clientY - 10 - offset.y };
        },
        submitForm: function() {
            this.deliveryInfo = getOrderInfo();
            this.orderItems = getBurgerOrder();
        }
    }
});
