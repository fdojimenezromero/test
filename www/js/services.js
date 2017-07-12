angular.module('app.services', [])

.factory('storageFactory', [function(){
  var module = {};
  /* Creamos el objeto donde iremos almacenando las cosas */
  module.storage = {};
  /* Un método para guardar las cosas, que recibe dos parámetros, el primero para la clave y el segundo para el valor */
  module.saveData = function(key, value) {
    this.storage[key] = value;
  };
  /* Otro para recuperar los datos */
  module.getData = function(key) {
    var temp = ( this.storage.hasOwnProperty(key) ) ? this.storage[key] : null;
    return temp;
  };
  return module;
}])





.service('BlankService', [function(){

}]);
