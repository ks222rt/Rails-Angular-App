angular.module('myApp')
    .factory('LoginFactory', LoginFactory);

function LoginFactory($http, myConfig, $sessionStorage, $state){
    var exports = {}

    var config = {
        headers: {
            'Authorization': 'Token token=' + myConfig.APIKEY,
            'username': '',
            'password': '',
            'Content-Type': 'Application/json'
        }
    };

    /*
        Tries to login on the API with username and password.
        If success the token will be sent back
    */
    exports.tryToLogin = function(login){
        config.headers.username = login.username;
        config.headers.password = login.password;

        return $http.get(myConfig.baseUrl + 'authenticate', config)
                        .error(function(data){
                            setErrorMsg(data);
                        });
    };

    /*
        Gets a creator by username
    */
    exports.getUserByUsername = function(){
        return $http.get(myConfig.baseUrl + 'creators/' + config.headers.username, config)
                    .error(function(data){
                        setErrorMsg(data);
                    });
    };

    /*
        Sets error or success msg to be shown
    */
    setErrorMsg = function(data){
        $sessionStorage.error.push({ type: 'danger', msg: data.error});
        $sessionStorage.errorExist = true;
        $state.go('all');
    };

    /*
        returns true if there is a token in the sessionStorage and isLoggedIn is true
        otherwise it returns false.
    */
    exports.getAuthentication = function(){
        return $sessionStorage.isLoggedIn && $sessionStorage.token !== null && $sessionStorage.token !== undefined;
    };

    return exports;
};
