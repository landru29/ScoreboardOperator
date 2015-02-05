/*global angular */
angular.module('Scoreboard').controller('BackofficeCtrl', ['$scope', 'Chronometer', 'Trigger',
    function ($scope, Chronometer, Trigger) {
        "use strict";

        $scope.chronometers = [];
        $scope.trig = new Trigger();
        Chronometer.prototype.setAvailableTriggers($scope.chronometers, 'chronometers');

        $scope.chronometerSortOptions = {
            containment: '#sortable-container',
            dragStart: function (event) {
                event.source.itemScope.chronometer.$moving = true;
            },
            dragEnd: function (event) {
                delete(event.source.itemScope.chronometer.$moving);
            }
        };

        $scope.pushChronometer = function () {
            $scope.chronometers.push(new Chronometer());
        };

        $scope.deleteChronometer = function (chronometer) {
            $scope.chronometers.splice($scope.chronometers.indexOf(chronometer), 1);
        };

        $scope.select = function() {
            return [
            {
                caption: 'hop1',
                value: 'hip1'
            },
            {
                caption: 'hop2',
                value: 'hip2'
            },
            {
                caption: 'hop3',
                value: 'hip3'
            },
        ];
        };

}]);