angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($rootScope, $scope, AnimalService, $rootScope) {
    $rootScope.isSearching = false;
    $rootScope.headerVisible = false;
  })

  .controller('AnimaisCtrl', function($rootScope, $scope, AnimalService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    AnimalService.findAll(function (res) {
      $scope.animais = res;
    });

  })

  .controller('AnimalCtrl', function($rootScope, $scope, $stateParams, AnimalService, CameraService) {
    $scope.$on('$destroy', function() {
    });
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    if ($stateParams && $stateParams.animalId){
      AnimalService.findById($stateParams.animalId,function(res){
        $scope.animal = res;
      });
    } else {
      $scope.animal = {};
      $scope.animal.idade = 1;
      $scope.animal.urlImagem = "img/no-image.png";
      $scope.animal.tpAnimal = 'Cachorro';
      $scope.animal.sexo = 'Masculino';
      $scope.animal.vacinaV8 = false;
      $scope.animal.vacinaRaiva = false;
      $scope.animal.vermifugado = false;
      $scope.animal.castrado = false;
    }

    $scope.getCamera = function(){
      CameraService.callCamera(function(imagem){
        $scope.animal.urlImagem = imagem;
      });
    };
    $scope.salvar = function()  {
      AnimalService.save($scope.animal,function(res){
        $scope.animal = res;
      });
    };

  })

  .controller('AdocaoCtrl', function($rootScope, $scope, $stateParams, AdocaoService) {
    $scope.$on('$destroy', function() {
    });
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    if ($stateParams && $stateParams.adocaoId){
      AdocaoService.findById($stateParams.adocaoId,function(res){
        $scope.adocao = res;
      });
    } else {
      $scope.adocao = {};
      $scope.adocao.idade = 1;
      $scope.adocao.dtAdocao = new Date().toISOString().replace('Z','');

    }

    $scope.salvar = function()  {
      AdocaoService.save($scope.adocao,function(res){
        $scope.adocao = res;
      });
    };

  })

  .controller('AdotanteCtrl', function($rootScope, $scope, $stateParams, AdotanteService, CameraService) {
    $scope.$on('$destroy', function() {
    });
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    if ($stateParams && $stateParams.animalId){
      AdotanteService.findById($stateParams.animalId,function(res){
        $scope.adotante = res;
      });
    } else {
      $scope.adotante = {};
      $scope.adotante.urlImagem = "img/no-image.png";
      $scope.adotante.sexo = 'Masculino';
    }

    $scope.getCamera = function(){
      CameraService.callCamera(function(imagem){
        $scope.adotante.urlImagem = imagem;
      });
    };
    $scope.salvar = function()  {
      AdotanteService.save($scope.adotante,function(res){
        $scope.adotante = res;
      });
    };

  })

  .controller('AdotantesCtrl', function($rootScope, $scope, AdotanteService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    AdotanteService.findAll(function (res) {
      $scope.adotantes = res;
    });

  })

  .controller('AdocoesCtrl', function($rootScope, $scope, AdocaoService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();

    AdocaoService.findAll(function (res) {
      $scope.adocoes = res;
    });
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
  })

  .directive('visitaOcorrencia', function() {

    var ddo = {};

    ddo.restrict = "AE";
    ddo.transclude = false;
    ddo.templateUrl = 'templates/visitaocorrencia.html';
    ddo.scope = {
      qtVisitas: '@',
      qtOcorrencias : '@',
      qtDevolucoes : '@',
      idAdotante : '@',
      idAnimal : '@',
      idAdocao : '@'
    };
    ddo.controller = function($rootScope,$scope,$ionicModal, AdotanteService, AnimalService, AdocaoService  ){

      $scope.showVisitasModal = function(title){
        $scope.texto = '';
        if ($scope.idAdotante){
          AdotanteService.findById($scope.idAdotante,function(res){
            $scope.objeto = res;
            $scope.openModal(title);
          });
        }else if ($scope.idAnimal){
          AnimalService.findById($scope.idAnimal,function(res){
            $scope.objeto = res;
            $scope.openModal(title);
          });
        }else if($scope.idAdocao){
          AdocaoService.findById($scope.idAdocao,function(res){
            $scope.objeto = res;
            $scope.openModal(title);
          });
        }

        $scope.hideVisitasModal = function(){
          $scope.visitasModal.hide();
          $scope.visitasModal.remove();
        };

        $scope.openModal = function(title){
          $ionicModal.fromTemplateUrl('templates/visitas.html', {
            animation: 'slide-in-up',
            scope: $scope
          }).then(function(modal) {
            $scope.visitasModal = modal;
            $scope.visitasModalTitle = title;
            $scope.visitasModal.show();
          });
        };

        $scope.enviar = function(texto){
          console.log(texto);
          if ($scope.visitasModalTitle == 'Devoluções'){
            $scope.objeto.devolucoes.push({
              text : texto,
              data: new Date().toISOString().replace('Z',''),

            });
            $scope.qtDevolucoes++;
          }else if ($scope.visitasModalTitle == 'Ocorrências') {
            $scope.objeto.ocorrencias.push({
              text : texto,
              data: new Date().toISOString().replace('Z','')
            });
            $scope.qtOcorrencias++;
          }else if ($scope.visitasModalTitle == 'Visitas'){
            $scope.objeto.visitas.push({
              text : texto,
              data: new Date().toISOString().replace('Z','')
            });
            $scope.qtVisitas++;
          }

          if ($scope.idAdotante){
            AdotanteService.save($scope.objeto,function(res){
              $scope.objeto = res;
            });
          }else if ($scope.idAnimal){
            AnimalService.save($scope.objeto,function(res){
              $scope.objeto = res;
            });
          }else if($scope.idAdocao){
            AdocaoService.save($scope.objeto,function(res){
              $scope.objeto = res;
            });
          }
        };
      };

    };

    return ddo;
  })

  .directive('watchMenu', function($timeout, $ionicSideMenuDelegate) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        // Run in the next scope digest
        $timeout(function() {
          // Watch for changes to the openRatio which is a value between 0 and 1 that says how "open" the side menu is

          $scope.$watch(function() {
              return $ionicSideMenuDelegate.getOpenRatio();
            },
            function(ratio) {
              $scope.data=ratio;
              if( ratio > 0.5){

                StatusBar.hide();
                ionic.DomUtil.blurAll();

              }else{

                StatusBar.show();

              }

              cordova.plugins.Keyboard.close();

            });
        });
      }
    };
  })

  .directive('animateRatio', function($timeout, $ionicSideMenuDelegate) {

    return {
      restrict: 'A',
      scope: {
        animateRatio: '='
      },
      link: function (scope, element, attr) {

        $timeout(function () {
          scope.$watch(function () {
              return $ionicSideMenuDelegate.getOpenRatio();
            },
            function (ratio) {
              scope.animateRatio(element[0], ratio);
            });
        });
      }
    }

  })
;
