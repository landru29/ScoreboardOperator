/*global angular */
angular.module('Scoreboard').controller('BackofficeCtrl', ['$scope', 'Board', 'Chronometer', 'Trigger', 'Storage',
    function ($scope, Board, Chronometer, Trigger, Storage) {
        "use strict";

        $scope.board = new Board();
        $scope.trig = new Trigger();

        $scope.pushChronometer = function () {
            $scope.board.chronometers.push(new Chronometer());
        };

        $scope.deleteChronometer = function (chronometer) {
            $scope.board.chronometers.splice($scope.chronometers.indexOf(chronometer), 1);
        };
        
        $scope.$on('menu-trigger', function (event, args) {
            switch (args.action) {
            case 'trash':
                
                break;
            case 'clone':
                
                break;
            case 'new':
                
                break;
            case 'open':
                $scope.board = new Board(Storage.loadData());
                break;
            case 'save':
                Storage.saveData($scope.board);
                break;
            case 'export':
                
                break;
            default:
                break;
            }
        });

}]);