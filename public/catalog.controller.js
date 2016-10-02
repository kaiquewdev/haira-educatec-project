angular
  .module('catalog.controller', [])
  .run(function ($log) {
    $log.debug('review controller running');
  })
  .controller('catalog', function ($log, $feathers, $scope, $sce, $translate, $window) {
    $log.debug('profile controller');
    var usersService = $feathers.service('users');
    usersService.timeout = 30000;

    $scope.user = { email: '', password: '' };
    $scope.userLogged = true;

    $scope.signIn = function (user) {
      user = user || {};
      $feathers.authenticate({
        type: 'local',
        email: user.email,
        password: user.password,
      }).then(function (result) {
        console.log('Authenticate', result);
        alert('Success!');
      }).catch(function (error) {
        console.log('Error authenticating!', error);
        alert('Error');
      });
    };

    $scope.currentLang = currentLanguage;
    $scope.currentQuote = function () {
      return window.score.scorecard().quote;
    };
    $scope.changeLang = function () {
      if ($scope.currentLang === 'ptBr') $scope.currentLang = 'en';
      else $scope.currentLang = 'ptBr';
      $translate.use($scope.currentLang);
    }
  });