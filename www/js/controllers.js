angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($rootScope, $scope, AnimalService, $rootScope,UsuarioService) {
    $rootScope.isSearching = false;
    $rootScope.headerVisible = false;
    $scope.usuario = {};
    $scope.autenticar = function() {
      UsuarioService.autenticar($scope.usuario,function(res){
        if (res){
          $rootScope.goMap();
        }else{
          $scope.erro = 'Usuário ou senha inválido!';
        }

      });



    }
  })

  .controller('AnimaisCtrl', function($rootScope, $scope, AnimalService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
    $scope.query = undefined;
    AnimalService.findAll(function (res) {
      $scope.animais = res;
      $scope.animaisBackup = res;
    });

    $scope.filtrar = function (query){
      if (query && query.trim() !== '') {
        $scope.animais = $scope.animaisBackup
          .filter(function(animal){
            return animal.nome && animal.nome.toUpperCase().startsWith(query.toUpperCase());
          });
      }else{
        $scope.animais = $scope.animaisBackup;
      }

    };

  })

  .controller('AnimalCtrl', function($rootScope, $scope, $stateParams,
                                     AnimalService, CameraService, $ionicModal,
                                     AdotanteService, AdocaoService ) {
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
    $scope.adotar = function(){
      $scope.openPesquisarAdotante();

    };

    $scope.query = undefined;
    $scope.adotantesBackup = [];
    $scope.filtrarAdotante = function (query){
      if (query && query.trim() !== '') {
        $scope.adotantes = $scope.adotantesBackup
          .filter(function (adotante) {
            return (adotante.nome && adotante.nome.toUpperCase().startsWith(query.toUpperCase()))
              || (adotante.cpf && adotante.cpf.startsWith(query));
          });
      }else{
        $scope.adotantes = $scope.adotantesBackup;
      }
    };

    $scope.selecionarAdotante = function(adotante){
      var adocao = {
        animal : $scope.animal,
        adotante: adotante
      };
      AdocaoService.save(adocao,function(adocao){
        $scope.closePesquisarAdotante();
        $rootScope.goAcompanhamentos();
      });
    }

    $scope.openPesquisarAdotante = function() {

      AdotanteService.findAllAtivo(function (res) {
        $scope.adotantes = res;
        $scope.adotantesBackup = res;

        $ionicModal.fromTemplateUrl('templates/adotantesmodal.html', {
          animation: 'slide-in-up',
          scope : $scope

        }).then(function(modal) {
          $scope.pesquisarAdotante = modal;
          $scope.pesquisarAdotante.show();
        });
      });

    };
    $scope.closePesquisarAdotante = function() {
      $scope.pesquisarAdotante.hide();
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

    $scope.loadCep = function(){
      if ($scope.adotante.cep && $scope.adotante.cep !== ''){
        AdotanteService.findEnderecoByCep($scope.adotante.cep, function(res){
          $scope.adotante.bairro = res.bairro;
          $scope.adotante.logradouro  = res.logradouro;
          $scope.adotante.cidade  = res.localidade;
        });
      }
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
    $scope.query = undefined;
    AdotanteService.findAll(function (res) {
      $scope.adotantes = res;
      $scope.adotantesBackup = res;
    });

    $scope.filtrar = function (query){
      if (query && query.trim() !== '') {
        $scope.adotantes = $scope.adotantesBackup
          .filter(function (adotante) {
            return (adotante.nome && adotante.nome.toUpperCase().startsWith(query.toUpperCase()))
              || (adotante.cpf && adotante.cpf.startsWith(query));
          });
      }else{
        $scope.adotantes = $scope.adotantesBackup;
      }
    };

  })

  .controller('AdocoesCtrl', function($rootScope, $scope, AdocaoService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();

    AdocaoService.findAll(function (res) {
      $scope.adocoes = res;
    });
    $rootScope.isSearching = false;
    $rootScope.headerVisible = true;
  })

  .controller('LocalizacaoCtrl', function($rootScope, $scope, AdocaoService, $rootScope) {
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.headerVisible = true;

    $scope.loadScript = function() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA4raLcSftr4D_f0-hyb-DeMiVZnNhzOUc';
      document.body.appendChild(script);

      $scope.initialize = function() {

        navigator.geolocation.getCurrentPosition($scope.showPosition);

      }

      $scope.showPosition = function(position)  {
        console.log(position);
        var mapOptions = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("mapagoogle"),
          mapOptions);
      //  document.getElementsByClassName('gm-svpc')[0].style.visibility = 'hidden';
      }


      setTimeout(function() {
        $scope.initialize();
        AdocaoService.findAll(function (res) {
          $scope.adocoes = res;
          console.log($scope.adocoes);
          $scope.adocoes.forEach(function(ado){
            var ponto = new google.maps.LatLng(ado.adotante.location.y,ado.adotante.location.x);
            var marker = new google.maps.Marker({
              position: ponto,//seta posição
              map: $scope.map,//Objeto mapa
              title:ado.adotante.nome + '(' + ado.animal.nome + ')',//string que será exibida quando passar o mouse no marker
              icon: 'img/logoico.png'
            });
            if (!ado.adotante.dtUltAcomp){
              ado.adotante.dtUltAcomp = ' - ';
            }
            var content = '<div>' +
   /*           '          <img src=' + ado.adotante.urlImagem+'>\n' +*/
              '          <p>Adotante: ' + ado.adotante.nome + '</p>' +
              '          <p>Animal: ' + ado.animal.nome+' (' + ado.animal.tpAnimal + ')</p>\n' +
              '          <p>Endereço:' + ado.adotante.cidade +', '+ado.adotante.logradouro+ ', ' + ado.adotante.numero +', ' + ado.adotante.bairro+'</p>\n' +
              '          <p>Última visita: ' + ado.adotante.dtUltAcomp +'</p>\n' +
              '        </div>';

            var infowindow = new google.maps.InfoWindow(), marker;
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(content);
                infowindow.open($scope.map, marker);
              };
            })(marker));
          });
        });
      }, 2000);
    };

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
      idAdocao : '@',
      efetuacomentario: '@'
    };
    ddo.controller = function($rootScope,$scope,$ionicModal,
                              AdotanteService, AnimalService, AdocaoService  ){

      $scope.showVisitasModal = function(title){
        $scope.texto = '';
        if ($scope.idAdotante) {
          AdotanteService.findById($scope.idAdotante,function(res){
            $scope.objeto = res;
            $scope.openModal(title);
          });
        } else if ($scope.idAnimal) {
          AnimalService.findById($scope.idAnimal,function(res){
            $scope.objeto = res;
            $scope.openModal(title);
          });
        } else if($scope.idAdocao) {
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
          if ($scope.visitasModalTitle == 'Devoluções'){
            $scope.objeto.devolucoes.push({
              text : texto,
              data: new Date().toISOString().replace('Z',''),
              nova: true
            });
            $scope.qtDevolucoes++;
          }else if ($scope.visitasModalTitle == 'Ocorrências') {
            $scope.objeto.ocorrencias.push({
              text : texto,
              data: new Date().toISOString().replace('Z',''),
              nova: true
            });
            $scope.qtOcorrencias++;
          }else if ($scope.visitasModalTitle == 'Visitas'){
            $scope.objeto.visitas.push({
              text : texto,
              data: new Date().toISOString().replace('Z',''),
              nova: true
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
