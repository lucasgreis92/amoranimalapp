angular.module('starter', ['ionic', 'ion-floating-menu','starter.controllers', 'starter.services'])

  .run(function($ionicPlatform,$rootScope,$state,$ionicModal) {

    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }



      $rootScope.goAnimal = function(animalId){
        $state.go('tab.animal',{animalId:animalId});
      }
      $rootScope.goAdotante = function(animalId){
        $state.go('tab.adotante',{animalId:animalId});
      }
      $rootScope.goAdocao = function(adocaoId){
        $state.go('tab.adocao',{adocaoId:adocaoId});
      }
      $rootScope.stopSearch = function(){
        $rootScope.isSearching = false;
        $rootScope.headerVisible = true;
      };

      $rootScope.startSearch = function(){
        $rootScope.isSearching = true;
        $rootScope.headerVisible = true;
      };
      $rootScope.goMap = function(){
        $rootScope.headerVisible = true;
        $state.go('tab.loc');
      }
      $rootScope.goAcompanhamentos = function(){
        $rootScope.headerVisible = true;
        $state.go('tab.acompanhamentos');
      }
      $rootScope.goLogin = function(){
        $rootScope.headerVisible = false;
        $state.go('login');
      }
      $rootScope.showImageModal = function(image,title){
        $rootScope.image = image;
        $ionicModal.fromTemplateUrl('templates/fullimage.html', {
          animation: 'slide-in-up',
          scope: $rootScope
        })
          .then(function(modal) {
            $rootScope.fullimage = modal;
            $rootScope.imageTitle = title;
            $rootScope.fullimage.show();
          });
      }
      $rootScope.hideImageModal = function(){
        $rootScope.fullimage.hide();
        $rootScope.fullimage.remove();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.animais', {
        url: '/animais',
        cache:false,
        views: {
          'tab-animais': {
            templateUrl: 'templates/animais.html',
            controller: 'AnimaisCtrl'
          }
        }
      })
      .state('tab.animal', {
        url: '/animal/:animalId',
        cache:false,
        views: {
          'tab-animais': {
            templateUrl: 'templates/animal.html',
            controller: 'AnimalCtrl'
          }
        }
      })
      .state('tab.adotantes', {
        url: '/adotantes',
        cache:false,
        views: {
          'tab-adotantes': {
            templateUrl: 'templates/adotantes.html',
            controller: 'AdotantesCtrl'
          }
        }
      })
      .state('tab.adotante', {
        url: '/adotante/:animalId',
        cache:false,
        views: {
          'tab-adotantes': {
            templateUrl: 'templates/adotante.html',
            controller: 'AdotanteCtrl'
          }
        }
      })


      .state('tab.acompanhamentos', {
        url: '/acompanhamentos',
        cache:false,
        views: {
          'tab-acompanhamentos': {
            templateUrl: 'templates/acompanhamentos.html',
            controller: 'AdocoesCtrl'
          }
        }
      })
      .state('tab.adocao',{
        url: '/adocao/:idAdocao',
        cache:false,
        views: {
          'tab-acompanhamentos':{
            templateUrl: 'templates/adocao.html',
            controller: 'AdocaoCtrl'
          }
        }
      })
      .state('tab.loc',{
        url: '/localizacao',
        cache:false,
        views: {
          'tab-loc':{
            templateUrl: 'templates/map.html',
            controller: 'LocalizacaoCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        cache:false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
