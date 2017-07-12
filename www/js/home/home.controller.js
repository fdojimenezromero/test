(function(){
  'use strict';
  angular.module('app.controllers')
  .controller('homeCtrl', ['$scope', '$stateParams','storageFactory',

function ($scope, $stateParams, storageFactory) {
  console.log($stateParams);
  var user = storageFactory.getData("user");
  if (user) {
    console.log("Usuario: ", user);
    //Numero de crash
    if (user.crash) {
      $scope.userCrash = Object.keys(user.crash);
    }else{
      $scope.userCrash = 0;
    }

  }else{
    $state.go('login');
  }

}])

})();


