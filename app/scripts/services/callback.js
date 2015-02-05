/*global angular */
angular.module('Scoreboard').provider('Callback', [function () {

    var Callback = function (eventName, callbackName) {
        this.event = eventName;
        this.callback = callbackName;
    };
    
    this.Callback = Callback;

    this.$get = [function () {
        return Callback;
    }];
}]);