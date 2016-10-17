angular
  .module('stash.controller', [])
  .run(function ($log) {
    $log.debug('stash controller running');
  })
  .controller('stash', function ($log, $feathers, $scope, $sce, $translate) {
    var reviewsService = $feathers.service('reviews');
    reviewsService.timeout = 60000;
    var referencesService = $feathers.service('references');
    referencesService.timeout = 60000;
    var videosService = $feathers.service('videos');
    videosService.timeout = 120000;
    var reviewsStructure = {
      url: 'http://www.polygon.com/',
      slug: '2012/10/19/3526568/spelunky-review-digging-deep',
      category: 'reviews',
      format: {
        reviews: {
          listItem: '.m-review__body',
          data: {
            photo: {
              selector: '.photo',
              attr: 'src',
              eq: 0,
            },
            paragraphs: {
              selector: 'p'
            }
          }
        }
      }
    };
    var referencesStructure = {
      url: 'http://www.polygon.com/',
      slug: 'game/gone-home/11272',
      category: 'games',
      format: {
        reference: {
          selector: '.m-block__meta > h2 > a',
          attr: 'href',
        }
      }
    };
    var videosStructure = {
      url: 'https://www.youtube.com/',
      slug: 'results',
      category: 'videos',
      format: {
        listItem: '.x-scope',
        data: {
          title: {
            selector: '#video-title',
          },
          reference: {
            selector: 'a#title',
            attr: 'href',
          }
        }
      }
    };

    $scope.search = {
      keyword: '',
      aspect: 'sentiment.score',
      reverse: false,
      csl: '',
      pbs: '',
      dev: ''
    };
    $scope.preview = { current: '' };
    $scope.currentCategory = 'games';
    $scope.stashes = [];
    $scope.currentStash = {};

    $scope.selectCurrent = function (stash) {
      videosStructure.slug = 'results?search_query=[Game]+' + stash.title;
      videosService.create(videosStructure).then(function (res) {
        $log.debug("videos service creation");
        $log.debug(res);
        $scope.currentStash = stash;
        $scope.currentStash.videos = res.data;
      });
    };

    var stashesService = $feathers.service('stashes');
    stashesService.timeout = 30000;
    var stashesStructure = {
      url: 'http://www.polygon.com/',
      //slug: 'games/reviewed',
      slug: 'games?sort=just_released',
      category: 'games',
      format: {
        stashes: {
          listItem: 'ul.m-game--index__list li',
          data: {
            score: {
              selector: '.m-game--index__game__score.score'
            },
            cover: {
              selector: 'a.m-game--index__game.game_img',
              attr: 'data-original'
            },
            title: {
              selector: '.m-game--index__game__body.body > h3 > a',
              eq: 0,
            },
            reference: {
              selector: '.m-game--index__game__body > h3 > a',
              eq: 0,
              attr: 'href',
            },
            review: {
              selector: '.review_link',
              attr: 'href',
            },
            meta_consoles: {
              selector: '.m-game--index__game__meta.meta > ul > li',
              eq: 0,
            },
            meta_release: {
              selector: '.m-game--index__game__meta > ul > li',
              eq: 1
            },
            meta_publisher: {
              selector: '.m-game--index__game__meta > ul > li',
              eq: 2
            },
            meta_developer: {
              selector: '.m-game--index__game__meta > ul > li',
              eq: 3
            },
            meta_reviewed: {
              selector: '.m-game--index__game__meta > ul > li',
              eq: 4
            },
          }
        }
      }
    };

    stashesService.on('created', function (stash) {
      console.log(stash);
    });

    console.log($scope.currentCategory);

    stashesService.find({ query: { category: $scope.currentCategory, title: { $exists: true }, $sort: { 'score': -1 } }}).then(function (res) {
      console.log('finding stashes...');
      console.log(res);
      if (res.total) {
        console.log('populating...');
        $scope.stashes = res.data;
        $scope.$digest();
        res.data.map(function (item) {
          if (item.title === '') {
            stashesService
              .remove(item['_id']);
          }
        });
      } else {
        stashesService
          .create(stashesStructure)
          .then(function (res) {
            $log.debug('stashing...');
            stashesService.find({ query: { category: $scope.currentCategory, title: { $exists: true } }}).then(function (res) {
              console.log('finding stashes...');
              $scope.stashes = res.data.map(function (item) {
                return item.meta_consoles.map(function (token) {
                  $log.debug(token);
                  return token;
                });
              });
              $scope.$digest();
              res.data.map(function (item) {
                if (item.title === '') {
                  stashesService
                    .remove(item['_id']);
                }
              });
            });
          });
      }

    $scope.currentLang = currentLanguage;
    $scope.changeLang = function () {
      if ($scope.currentLang === 'ptBr') $scope.currentLang = 'en';
      else $scope.currentLang = 'ptBr';
      $translate.use($scope.currentLang);
    };

    $scope.toggleAspect = function (aspect) {
      if ($scope.search.aspect === aspect) {
        $scope.search.aspect = '-updated_at';
      } else {
        $scope.search.aspect = aspect;
      }
    };

    $scope.grabReferenceContent = function (slug) {
      console.log('grabbing references');
      var structure = angular.copy(referencesStructure);
      var subStructure = angular.copy(reviewsStructure);
      structure.category = 'references';
      structure.slug = (slug.split('/').slice(3).join('/')) || '';
      referencesService
        .create(structure)
        .then(function (res) {
          $log.debug('reference response');
          subStructure.category = 'reviews';
          subStructure.slug = '/' + res.reference.split('/').slice(3).join('/');
          reviewsService.create(subStructure).then(function (res) {
            $log.debug('reviews response');
            $log.debug(res.data);
          })
          .catch(console.log.bind(console));
        })
        .catch(console.log.bind(console));
    };

    $scope.developerCounter = 0;
    $scope.filterDeveloper = function (term) {
      var a = null;
      if ($scope.developerCounter) {
        a = document.createElement('a');
        a['href'] = 'https://www.youtube.com/results?search_query=' + term.split(' ').join('+');
        a['target'] = '_blank';
        document.body.appendChild(a);
        a.click();
        return document.body.removeChild(a);
      }
      $scope.search.dev = term;
      $scope.developerCounter += 1;
    };
  });
});
