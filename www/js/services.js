angular.module('starter.services', [])

  .factory('PropertiesService', function($http) {
    return {
      props: function() {
        return {
          ip: 'http://ec2-54-202-0-205.us-west-2.compute.amazonaws.com:3000',
          ip_: 'http://localhost:3000'
        };
      }
    };
  })

  .factory('CameraService', function($ionicLoading) {

    return {
      callCamera: function (success){
        if(navigator.camera){
          $ionicLoading.show({
            template: 'Loading...'
          }).then(function(){
          });

          function onSuccess(imageURI) {
            if (success){
              success("data:image/jpeg;base64," +imageURI);
            }
            $ionicLoading.hide();

          }
          function onFail(message) {
            $ionicLoading.hide();
          }

          navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
            correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL });
        }

      }
    };

  })

  .factory('UsuarioService', function($http,PropertiesService,$ionicLoading) {

    return {
      autenticar: function(usuario,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.post(PropertiesService.props().ip+'/rs/v1/usuarios/autenticar',usuario)
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      }
    };
  })

  .factory('AnimalService', function($http,PropertiesService, $ionicLoading) {
    return {
      findById: function(id,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/animais/'+id)
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },

      findAll: function (success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/animais/ativo')
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },

      save: function(animal,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.post(PropertiesService.props().ip+'/rs/v1/animais/salvar',animal)
          .success(function (res){
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      }
    };
  })

  .factory('AdotanteService', function($http,PropertiesService, $ionicLoading) {
    return {
      findById: function(id,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/adotantes/'+id)
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },

      findEnderecoByCep: function(cep,success){
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });

        $http.get(PropertiesService.props().ip+'/rs/v1/adotantes/cep/'+cep)
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },
      findAll: function (success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/adotantes')
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },
      findAllAtivo: function (success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/adotantes/ativo')
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },
      save: function(adotante,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.post(PropertiesService.props().ip+'/rs/v1/adotantes/salvar',adotante)
          .success(function (res){
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });

      }
    };
  })

  .factory('AdocaoService', function($http,PropertiesService, $ionicLoading) {
    return {
      findById: function(id,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/adocoes/'+id)
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },

      findAll: function (success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.get(PropertiesService.props().ip+'/rs/v1/adocoes/ativo')
          .success(function (res) {
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      },

      save: function(adocao,success) {
        $ionicLoading.show({
          template: 'Loading...'
        }).then(function(){
        });
        $http.post(PropertiesService.props().ip+'/rs/v1/adocoes/salvar',adocao)
          .success(function (res){
            if (success){
              success(res);
              $ionicLoading.hide();
            }
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert(err);
          });
      }
    };
  });
