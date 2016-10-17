angular
  .module('profile.controller', [])
  .run(function ($log) {
    $log.debug('profile controller running');
  })
  .controller('profile', function ($log, $feathers, $scope, $sce, $translate) {
    $log.debug('profile controller');
    var usersService = $feathers.service('users');
    usersService.timeout = 30000;

    usersService.create({
      email: 'john@doe.com',
      password: 'doe',
    }).then(function (res) {
      $feathers.authenticate({
        type: 'local',
        email: 'john@doe.com',
        password: 'doe'
      }).then(function (result) {
        console.log('Authenticate', result);
      }).catch(function (error) {
        console.log('Error authenticating!', error);
      });
    }).catch(function (error) {
      console.log('Error to create user!', error);
    });

    $scope.currentLang = currentLanguage;
    $scope.currentQuote = function () {
      return window.score.scorecard().quote;
    };
    $scope.changeLang = function () {
      if ($scope.currentLang === 'ptBr') $scope.currentLang = 'en';
      else $scope.currentLang = 'ptBr';
      $translate.use($scope.currentLang);
    }
  })
