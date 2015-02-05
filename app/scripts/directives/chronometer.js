/*global angular */
angular.module('Scoreboard').directive('chronometer', [function () {

    return {
        restrict: 'A',
        scope: {
            chronometer: '=',
            'delete': '&',
        },
        template: '<div class="chronometer">' +
            '<div class="title" >' +
            '<a href="#" editable-text="chronometer.name" title="{{\'Name\' | translate}}">{{ chronometer.name || "No name" }}</a>' +
            '<span class="close-button" ng-click="deleteMe()" title="{{\'Delete\' | translate}}"></span>' +
            '<span ng-class="{\'reduce-button\':!(chronometer.$reduced), \'expand-button\':chronometer.$reduced}" ng-click="toggleMe()" title="{{\'Reduce\' | translate}}"></span>' +
            '</div>' +
            '<div class="detail" ng-hide="chronometer.$reduced">' +
            '<div class="form-line"><span>{{ \'Upper\' | translate}}</span> <a href="#" editable-chronometer="chronometer.upper" title="{{\'Upper\' | translate}}">{{ chronometer.upper | date : \'HH:mm:ss\' : \'UTC\' }}</a></div>' +
            '<div class="form-line"><span>{{ \'Lower\' | translate}}</span> <a href="#" editable-chronometer="chronometer.lower" title="{{\'Lower\' | translate}}">{{ chronometer.lower | date : \'HH:mm:ss\' : \'UTC\' }}</a></div>' +
            '<div class="form-line">' +
            '<span>{{ \'Direction\' | translate}}</span> ' +
            '<input bs-switch ng-model="chronometer.direction" type="checkbox" switch-size="mini" switch-animate="true" switch-on-text="{{ \'down\' | translate }}" switch-off-text="{{ \'up\' | translate }}">' +
            '</div>' +
            '<div class="form-line"><span>{{ \'Triggers\' | translate}}</span><ul class="trigger-list">' +
            '<li ng-repeat="trigger in chronometer.triggers">' +
            '<a href="#" editable-select="trigger.event" e-ng-options="name for name in chronometer.events()">{{ trigger.event || "none" }}</a>' +
            ' - ' +
            '<a href="#" editable-select="trigger.callback" e-ng-options="s.value as s.caption for s in selectData">{{ showAction(trigger.callback) || "none" }}</a>' +
            //'<a href="#" editable-select="trigger.callback" e-ng-options="s.value as s.caption for s in chronometer.getAvailableTriggers()">{{ trigger.callback || "none" }}</a>' +
            '</li>' +
            '<li><span ng-click="addTrigger()" class="add-button"></span></li>' +
            '</div>' +
            '</div>' +
            '</div>',
        controller: ['$scope', 'Callback', function ($scope, Callback) {

            $scope.toggleMe = function () {
                $scope.chronometer.$reduced = !($scope.chronometer.$reduced);
            };

            $scope.deleteMe = function () {
                $scope.delete({
                    $chronometer: $scope.chronometer
                });
            };

            $scope.addTrigger = function () {
                $scope.chronometer.triggers.push(new Callback());
            };

            $scope.$watch('chronometer.$triggerCollection', function (newVal, oldVal) {
                var allTriggers = $scope.chronometer.getAvailableTriggers();
                $scope.selectData = [];
                for (var i in allTriggers) {
                    var explosion = allTriggers[i].value.match(/(\w*)\.(\w*)/);
                    if (explosion[1] !== $scope.chronometer.uuid) {
                        $scope.selectData.push(allTriggers[i]);
                    }
                }
            }, true);

            $scope.showAction = function (data) {
                if (!data) return;
                var explosion = data.match(/(\w*)\.(\w*)/);
                return $scope.chronometer.getNameById(explosion[1]) + '.' + explosion[2];
            };
        }],
        link: function (scope, element, attrs) {}
    };
}]);