(function(){
  'use strict';
  angular.module('app.controllers')
 .controller('newCrashCtrl', ['$scope','$http','$stateParams','storageFactory',
 // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, storageFactory) {

  var provider = new firebase.auth.GoogleAuthProvider();
  var user = storageFactory.getData("user");
  var database = firebase.database();
  var car_a, car_b;
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    activate();

    function activate(){
      $scope.save = function () {
        var vm = this;
        vm.user = storageFactory.getData("user");
        if (user == null) {
          console.log("HAY QUE LOGAR DE NUEVO");
        };
        vm.car_a = {
          uid:vm.a_uid,
          brand:vm.a_brand,
          model:vm.a_model,
          color:vm.a_color
        };
        vm.car_b = {
          uid:vm.b_uid,
          brand:vm.b_brand,
          model:vm.b_model,
          color:vm.b_color
        };
        vm.other_info = {
          date:vm.o_date,
          city:vm.o_city,
          adress:vm.o_adress
        };


        //STAR PROCESS
        var promise_a = _getCardByUid(vm.car_a), promise_b = _getCardByUid(vm.car_b);

        promise_a.then(function(response) {
          vm.stored_a = response;
          promise_b.then(function(response){
            vm.stored_b = response;
            vm.data ={
              stored_a: vm.stored_a,
              stored_b: vm.stored_b,
              car_a: vm.car_a,
              car_b: vm.car_b,
              other_info : vm.other_info,
              user:vm.user
            };
            _createCrash(vm.data);
          });
        });
      };

    }

    // ---- PRIVATE METHODS --- //
    function _getCardByUid(car){
      return firebase.database().ref('/cars/'+car.uid).once('value').then(function(snapshot) {
          var data;
          if (snapshot.val()) {
            data = snapshot.val();
          } else{
            firebase.database().ref('/cars/' + car.uid).set(car);
            data = car;
          }
          return data;
        });
    }

    function _createCrash(data){
      console.log("GUARDAMOS CRASH DE : ",stored_a, stored_b);
      var car_a = data.car_a,
          car_b = data.car_b,
          other = data.other_info,
          stored_b = data.stored_b,
          stored_a = data.stored_a;

      //Los datos del crash se generan con la info que el usuario rellena por pantalla
      var crash = {
          "a_brand" : car_a.brand,
          "a_color" : car_a.color,
          "a_model" : car_a.model,
          "a_uid"   : stored_a.uid,
          "adress"  : other.adress,
          "b_brand" : car_b.brand,
          "b_color" : car_b.color,
          "b_model" : car_b.model,
          "b_uid"   : stored_b.uid,
          "city" : other.city,
          "date" : other.date,
          "description" : "description",
          "hour" : "12:56",
          "reporter": data.user.uid
        };

      //creamos el crash
      firebase.database().ref('/crash/').push(crash);

      //asignamos el crash
      if (data.stored_a.user) {
        return firebase.database().ref('/users/'+data.stored_a.user).once('value').then(function(user) {
          var userInfo =  user.val();
          var crash_data = {
            car:car_a.uid,
            view:false
          };
          firebase.database().ref('/users/'+userInfo.uid+"/"+"crash").push(crash_data);
        });
       }


    }
}

])

})();


