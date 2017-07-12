(function () {
    'use strict';
    angular
      .module('app.services')
      .factory('test', [function(){
        var promise;
        var service = {
          save:save
        };

      return service;

      function save(data) {
        return "adios"+data;
      }
    }
  ])
});


