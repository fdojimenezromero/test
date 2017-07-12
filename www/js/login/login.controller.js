(function(){
  'use strict';
  angular.module('app.controllers')
  .controller('loginCtrl', ['$scope', '$stateParams','$state', 'storageFactory', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, storageFactory, $window) {
    var provider = new firebase.auth.GoogleAuthProvider();
    var userData;
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    if ($window.localStorage['user']) {
     var userData = JSON.parse($window.localStorage['user']);
     storageFactory.saveData("user",userData);
     $state.go('menu.home', {userId:userData.uid});
    } else {
      activate();
      getCredentialsGoogle();
  
    }
    
    //getCredentialsFacebook(); //TODO Next implementation



    //Activate login controller
    function activate(){

      //Funcion que realiza la llamada para el login con Google.
      $scope.googleLogin = function () {
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        };
    }

    // FUNCION callback que escucha el retorno de google
    function getCredentialsGoogle(){
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            var token = result.credential.accessToken;
          }
          // The signed-in user info.
          var user = result.user;
          if (user) {
            var promise = getUser(user);
            promise.then(function(data) { //MANEJAR EL ERROR DE LA PROMESA
                userData = data;
                console.log(userData);
                //PASAR A LA SIGUIENTE VISTA
                $scope.userData = userData;
                storageFactory.saveData("user",userData);
                $window.localStorage['user'] = JSON.stringify(userData);
                $state.go('menu.home', {userId:userData.uid});
            });
          };
        }).catch(function(error) {
              // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
              // The email of the user's account used.
          var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
            // ...
        });
    };

    //Get user data
    function getUser(user){
      // Recuperamos el user de db
        var user;
        // Si no existe lo creamos en db
        var database = firebase.database();
        console.log(database);

        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          if (snapshot.val()) {
            user = snapshot.val(); //snapshot.val() retorna todo el objeto por el id
          }else{
            console.log("El usuario con uid "+userId+" no existe en la db, hay que crearlo");
            //create user
            user = writeUserDataAndSave(user);
          };
          return user;
        });

    };

    //Save user in db
    function writeUserDataAndSave(data) {
      var user = {
        name: data.displayName,
        email: data.email,
        urlImg:data.photoURL,
        uid:data.uid
      };
      firebase.database().ref('users/' + data.uid).set(user);

      return user;
    }


}])

})();


