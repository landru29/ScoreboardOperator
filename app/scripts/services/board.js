/*global angular */
angular.module('Scoreboard').provider('Board', [function () {
    this.$get = ['Chronometer', function (Chronometer) {
        var Board = function(data) {
            this.chronometers = [];
            if (Object.prototype.toString.call(data) === '[object Object]') {
            for (var objType in data) {
                switch (objType) {
                    case 'chronometers':
                        for(var j in data.chronometers) {
                            this.chronometers.push(new Chronometer(data.chronometers[j]));
                        }
                        break;
                    default:
                        this[objType] = data[objType];
                        break;
                }
                
            }
            Chronometer.prototype.setAvailableTriggers(this.chronometers, 'chronometers');
        }
        };
        return Board;
    }];
}]);