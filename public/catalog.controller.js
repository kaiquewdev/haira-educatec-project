angular
  .module('catalog.controller', [])
  .run(function ($log, $feathers) {
    $log.debug('review controller running');
    var usersService = $feathers.service('users');
    usersService.create({
      email: 'sample@state.com',
      password: 'sample'
    })
    .then(console.log.bind(console))
    .catch(console.log.bind(console));
  })
  .controller('catalog', function ($log, $feathers, $scope, $sce, $translate, $window) {
    $log.debug('catalog controller');
    var usersService = $feathers.service('users');
    var publicationsService = $feathers.service('catalogs');
    usersService.timeout = 30000;

    $scope.user = { email: '', password: '' };
    $scope.userLogged = false;

    $scope.publications = [];

    $scope.currentFragmentPreview = '';
    $scope.getCurrentFragmentPreview = function () {
      return $scope.currentFragmentPreview;
    };
    $scope.setCurrentFragmentPreview = function (fragment) {
      $scope.currentFragmentPreview = $sce.trustAs('resourceUrl', fragment);
    };

    publicationsService.on('created', function (res) {
      $scope.publications.push(res);
    });

    $scope.signIn = function (user) {
      user = user || {};
      $feathers.authenticate({
        type: 'local',
        email: user.email,
        password: user.password,
      }).then(function (result) {
        console.log('Authenticate', result);
        $scope.userLogged = true;
        $scope.user.card = window.score.scorecard();
        publicationsService.find({}).then(function (res) {
          console.log(res);
          if (res.total === 0) {
            publicationsService.create({
              title: 'Education on Brazil',
              video: {
                watch_url: 'https://www.youtube.com/watch?v=rLSmU6deuPQ',
                embed_url: 'https://www.youtube.com/embed/rLSmU6deuPQ',
                embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/rLSmU6deuPQ" frameborder="0" allowfullscreen></iframe>',
              },
              description: 'Short history of education on Brazil',
              created_at: Date.now(),
              updated_at: Date.now(),
            })
            .then(console.log)
            .catch(console.log);
          } else {
            $scope.publications = res.data;
          }
          $scope.$digest();
        }).catch(console.log.bind(console));
      }).catch(function (error) {
        console.log('Error authenticating!', error);
        $scope.userLogged = false;
        $scope.$digest();
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
