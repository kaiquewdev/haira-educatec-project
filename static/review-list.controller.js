angular
  .module('reviewList.controller', [])
  .run(function ($log) {
    $log.debug('review list controller running');
  })
  .controller('reviewList', function ($log, $feathers, $scope, $sce, $translate, $window) {
    var reviewsService = $feathers.service('reviews');
    var referencesService = $feathers.service('references');
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
    $scope.search = { keyword: '', aspect: '-sentiment.score' };
    $scope.currentCategory = 'reviews';
    $scope.reviews = [];

    $scope.showReview = function (e, target) {
      $log.debug('show review');
      e.preventDefault();
      $window.location.href = target;
      $window.location.target = '_';
    };

    $scope.grabReviewContent = function (d) {
      $log.debug(d);
      slug = d;
      var structure = angular.copy(reviewsStructure);
      structure.slug = slug;
      reviewsService
        .create(structure)
        .then(function (res) {
          $log.debug('review structure');
          reviewsService.find({ query: { category: $scope.currentCategory, }}).then(function (res) {
            console.log('finding reviews...');
            $scope.reviews = res.data;
            $scope.$digest();
          });
        })
        .catch(console.log.bind(console));
    };

    $scope.grabReferenceContent = function (slug) {
      $log.debug(slug);
      var structure = angular.copy(referencesStructure);
      slug = slug || '';
      if (slug) {
        structure.slug = slug;
      }
      referencesService
        .create(structure)
        .then(function (res) {
          $log.debug('references structure');
          $log.debug(res);
        })
        .catch(console.log.bind(console));
    };

    $scope.getParagraph = function (review) {
      return review.paragraphs;
    };

    $scope.getCharCounter = function (review) {
      return review.paragraphs.length;
    };

    $scope.currentLang = currentLanguage;
    $scope.changeLang = function () {
      if ($scope.currentLang === 'ptBr') $scope.currentLang = 'en';
      else $scope.currentLang = 'ptBr';
      $translate.use($scope.currentLang);
    }

    $scope.toggleAspect = function (aspect) {
      if ($scope.search.aspect === aspect) {
        $scope.search.aspect = '-updated_at';
      } else {
        $scope.search.aspect = aspect;
      }
    };

    reviewsService.on('created', function (review) {
      $log.debug(review);
      $scope.reviews.push(review);
      $scope.$digest();
    });

    reviewsService.find({ query: { category: $scope.currentCategory, }}).then(function (res) {
      console.log('finding reviews...');
      console.log(res);
      if (res.total) {
        console.log('populating...');
        $scope.reviews = res.data;
        $scope.$digest();
      }
      // } else {
      //   reviewsService
      //     .create(reviewsStructure)
      //     .then(function (res) {
      //       $log.debug('loading...');
      //       reviewsService.find({ query: { category: $scope.currentCategory, }}).then(function (res) {
      //         console.log('finding reviews...');
      //         $scope.reviews = res.data;
      //         $scope.$digest();
      //       });
      //     });
      // }
    });
  });
