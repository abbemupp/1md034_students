/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
    el: '#orders',
    data: {
        orders: {},
        statuses: ["Not handled", "Preparing", "On the way", "Done"]
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
        changeStatus: function (order) {
            if (order.statusId < 3)
                {
                    order.statusId += 1;
                    socket.emit("changeStatus", order);
                }
            
            else
                socket.emit("removeOrder", order);
        }
    }
});
