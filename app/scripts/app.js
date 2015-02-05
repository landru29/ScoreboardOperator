/*global angular */

angular.module('Scoreboard', [
    'ngRoute',
    'xeditable',
    'ui.sortable',
    'ngStorage',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngAnimate',
    'frapontillo.bootstrap-switch'
]);

angular.module('Scoreboard').config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    'use strict';
    $routeProvider.when('/', {
        templateUrl: 'views/backoffice.html',
        controller: 'BackofficeCtrl'
    }).otherwise({
        redirectTo: '/'
    });
    
    $translateProvider.useStaticFilesLoader({
      prefix: '/data/',
      suffix: '.json'
    });
    
    $translateProvider.preferredLanguage('en');
}]);

angular.module('Scoreboard').run(['editableOptions', function (editableOptions) {
    'use strict';
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);