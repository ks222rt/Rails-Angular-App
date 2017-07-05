angular.module('myApp')
    .directive('error', function(){
        return{
            template: '<div class="alert" role="alert" ng-show="error">'+
                        '<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>' +
                      '</div>',
            restrict: 'E',
            replace:true,
            scope:true
        }
    });
