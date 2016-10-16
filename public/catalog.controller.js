var pubSeeds = window.pubSeeds = [{
  title: 'Educação no Brasil',
  video: {
    watch_url: 'https://www.youtube.com/watch?v=rLSmU6deuPQ',
    embed_url: 'https://www.youtube.com/embed/rLSmU6deuPQ',
    embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/rLSmU6deuPQ" frameborder="0" allowfullscreen></iframe>',
  },
  description: 'Resumo da historia sobre educação no Brasil',
  created_at: Date.now(),
  updated_at: Date.now(),
}, {
  title: 'Pedagogia: Cotidiano escolar',
  video: {
    watch_url: 'https://www.youtube.com/watch?v=P5LRa8P6-Qk',
    embed_url: 'https://www.youtube.com/embed/P5LRa8P6-Qk',
    embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/P5LRa8P6-Qk" frameborder="0" allowfullscreen></iframe>',
  },
  description: 'Cotidiano escolar',
  created_at: Date.now(),
  updated_at: Date.now(),
}, {
  title: 'O que é educação? | Programa Educação',
  video: {
    watch_url: 'https://www.youtube.com/watch?v=tL28BWz3sRE',
    embed_url: 'https://www.youtube.com/embed/tL28BWz3sRE',
    embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/tL28BWz3sRE" frameborder="0" allowfullscreen></iframe>',
  },
  description: 'O que é Educação?',
  created_at: Date.now(),
  updated_at: Date.now(),
}, {
  title: 'O que aprendi com a desescolarização | Ana Thomaz',
  video: {
    watch_url: 'https://www.youtube.com/watch?v=QveTf5DekIo',
    embed_url: 'https://www.youtube.com/embed/QveTf5DekIo',
    embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/QveTf5DekIo" frameborder="0" allowfullscreen></iframe>',
  },
  description: 'Relato sobre a desescolarização',
  created_at: Date.now(),
  updated_at: Date.now(),
}, {
  title: 'Principais Fundamentos da Educação Infantil',
  video: {
    watch_url: 'https://www.youtube.com/watch?v=W4LWNfIHxzc',
    embed_url: 'https://www.youtube.com/embed/W4LWNfIHxzc',
    embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/W4LWNfIHxzc" frameborder="0" allowfullscreen></iframe>',
  },
  description: 'Relato sobre a desescolarização',
  created_at: Date.now(),
  updated_at: Date.now(),
}];

angular
  .module('catalog.controller', [])
  .run(function ($log, $feathers) {
    $log.debug('review controller running');
    var usersService = $feathers.service('users');
    usersService.timeout = 120000;
    usersService.create({
      email: 'sample@state.com',
      password: 'sample'
    })
    .then(console.log.bind(console))
    .catch(console.log.bind(console));
  })
  .controller('catalog', function ($log, $feathers, $scope, $sce, $translate, $window, rx) {
    $log.debug('catalog controller');
    var usersService = $feathers.service('users');
    var publicationsService = $feathers.service('catalogs');
    usersService.timeout = 30000;

    $scope.user = { email: '', password: '' };
    $scope.userLogged = false;

    $scope.publications = [];

    $scope.currentFragmentPreview = '';
    $scope.currentDescriptionPreview = '';
    $scope.getCurrentFragmentPreview = function () {
      return $scope.currentFragmentPreview;
    };
    $scope.getCurrentTitlePreview = function () {
      return $scope.currentTitlePreview;
    };
    $scope.getCurrentDescriptionPreview = function () {
      return $scope.currentDescriptionPreview;
    };
    $scope.setCurrentFragmentPreview = function (pub) {
      $scope.currentTitlePreview = pub.title;
      $scope.currentDescriptionPreview = pub.description;
      $scope.currentFragmentPreview = $sce.trustAs('resourceUrl', pub.video.embed_url);
    };

    publicationsService.on('created', function (res) {
      $scope.publications.push(res);
    });

    function authenticateUser(credentials) {
      credentials = credentials || {};
      return rx
               .Observable
               .fromPromise($feathers.authenticate({
                 type: 'local',
                 email: credentials.email,
                 password: credentials.password,
               }))
               .map(function (res) {
                 $log.debug(res);
                 return res;
               });
    }

    function findPublication() {
      return rx
               .Observable
               .fromPromise(publicationsService.find({}))
               .map(function (res) {
                 $log.debug(res);
                 return res;
               });
    }

    function createPublication(contentList) {
      return rx
               .Observable
               .fromPromise(publicationsService.create(contentList))
               .map(function (res) {
                 $log.debug(res);
                 return res;
               });
    }

    $scope
      .$createObservableFunction('createPublicationObserver')
      .flatMapLatest(createPublication)
      .subscribe(function (result) {
          return result;
      });

    $scope
      .$createObservableFunction('findPublicationObserver')
      .flatMapLatest(findPublication)
      .subscribe(function (res) {
        if (res.total === 0) {
          $log.debug('populating publications');
          $scope.createPublicationObserver(pubSeeds);
        } else {
          $log.debug('retrieving publications');
          $scope.publications = res.data;
          $scope.$digest();
        }
      })

    $scope
      .$createObservableFunction('signIn')
      .map(function (credentials) { return credentials; })
      .flatMapLatest(authenticateUser)
      .subscribe(function (result) {
        $scope.userLogged = true;
        $scope.user.card = window.score.scorecard();
        $log.debug(result);
        $scope.findPublicationObserver();
      });

    // $scope.signIn = function (user) {
    //   user = user || {};
    //   $feathers.authenticate({
    //     type: 'local',
    //     email: user.email,
    //     password: user.password,
    //   }).then(function (result) {
    //     console.log('Authenticate', result);
    //     $scope.userLogged = true;
    //     $scope.user.card = window.score.scorecard();
    //     publicationsService.find({}).then(function (res) {
    //       console.log(res);
    //       if (res.total === 0) {
    //         publicationsService.create([{
    //           title: 'Educação no Brasil',
    //           video: {
    //             watch_url: 'https://www.youtube.com/watch?v=rLSmU6deuPQ',
    //             embed_url: 'https://www.youtube.com/embed/rLSmU6deuPQ',
    //             embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/rLSmU6deuPQ" frameborder="0" allowfullscreen></iframe>',
    //           },
    //           description: 'Resumo da historia sobre educação no Brasil',
    //           created_at: Date.now(),
    //           updated_at: Date.now(),
    //         }, {
    //           title: 'Pedagogia: Cotidiano escolar',
    //           video: {
    //             watch_url: 'https://www.youtube.com/watch?v=P5LRa8P6-Qk',
    //             embed_url: 'https://www.youtube.com/embed/P5LRa8P6-Qk',
    //             embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/P5LRa8P6-Qk" frameborder="0" allowfullscreen></iframe>',
    //           },
    //           description: 'Cotidiano escolar',
    //           created_at: Date.now(),
    //           updated_at: Date.now(),
    //         }, {
    //           title: 'O que é educação? | Programa Educação',
    //           video: {
    //             watch_url: 'https://www.youtube.com/watch?v=tL28BWz3sRE',
    //             embed_url: 'https://www.youtube.com/embed/tL28BWz3sRE',
    //             embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/tL28BWz3sRE" frameborder="0" allowfullscreen></iframe>',
    //           },
    //           description: 'O que é Educação?',
    //           created_at: Date.now(),
    //           updated_at: Date.now(),
    //         }, {
    //           title: 'O que aprendi com a desescolarização | Ana Thomaz',
    //           video: {
    //             watch_url: 'https://www.youtube.com/watch?v=QveTf5DekIo',
    //             embed_url: 'https://www.youtube.com/embed/QveTf5DekIo',
    //             embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/QveTf5DekIo" frameborder="0" allowfullscreen></iframe>',
    //           },
    //           description: 'Relato sobre a desescolarização',
    //           created_at: Date.now(),
    //           updated_at: Date.now(),
    //         }, {
    //           title: 'Principais Fundamentos da Educação Infantil',
    //           video: {
    //             watch_url: 'https://www.youtube.com/watch?v=W4LWNfIHxzc',
    //             embed_url: 'https://www.youtube.com/embed/W4LWNfIHxzc',
    //             embed_fragment: '<iframe class="embed-responsive-item" width="560" height="315" ng-src="https://www.youtube.com/embed/W4LWNfIHxzc" frameborder="0" allowfullscreen></iframe>',
    //           },
    //           description: 'Relato sobre a desescolarização',
    //           created_at: Date.now(),
    //           updated_at: Date.now(),
    //         }])
    //         .then(console.log)
    //         .catch(console.log);
    //       } else {
    //         $scope.publications = res.data;
    //       }
    //       $scope.$digest();
    //     }).catch(console.log.bind(console));
    //   }).catch(function (error) {
    //     console.log('Error authenticating!', error);
    //     $scope.userLogged = false;
    //     $scope.$digest();
    //   });
    // };

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
