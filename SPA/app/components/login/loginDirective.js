angular.module('myApp')
    .directive('login', function(){
        return{
            template: '<div class="container">' +
                        '<div class="row">' +
                            '<div class="col-md-offset-5 col-md-3 col-xs-5">' +
                                '<div id="form-login">' +
                                    '<form role="form" ng-submit="loginUser()">' +
                                        '<div class="form-group">' +
                                            '<label for="username">Username</label>' +
                                            '<input type="text" class="form-control" id="username" placeholder="Enter username" ng-model="login.username" required/>' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            '<label for="password">Password</label>' +
                                            '<input type="password" class="form-control" id="password" placeholder="Password" ng-model="login.password" required/>' +
                                        '</div>' +
                                        '<button type="submit" class="btn btn-default">Login</button>' +
                                       '</form>' +
                                       '</div>' +
                                '</div>' +
                            '</div>',
            restrict: 'E',
            replace:true,
            scope:true
        }
    });
