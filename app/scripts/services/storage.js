/*global angular */
angular.module('Scoreboard').provider('Storage', [function () {

    var cleanObject = function (obj) {
            for (var i in obj) {
                if (i[0] === '$') {
                    delete obj[i];
                } else if ('object' === typeof obj[i]) {
                    cleanObject(obj[i]);
                }
            }
            return obj;
        };

    this.$get = ['$localStorage', function ($localStorage) {
        return {
            saveData: function (data) {
                var clone = JSON.parse(JSON.stringify(data));
                $localStorage.scoreboard = JSON.stringify(cleanObject(clone));
            },
            loadData: function() {
                return JSON.parse($localStorage.scoreboard);
            }
        };
    }];
}]);