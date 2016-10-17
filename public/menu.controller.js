angular
  .module('menu.controller', [])
  .run(function ($log) {
    $log.debug('menu controller running');
  })
  .controller('menu', function ($log, $feathers, $translate, $scope, $window, rx) {
    $log.debug('menu controller');
    $log.debug($window.currentUserLogged);
    $scope.userLogged = $window.currentUserLogged;
    $scope.$on('userLogged', function (e, data) {
        $log.debug(data);
        $scope.userLogged = data.logged;
        $scope.$digest();
    });
    $scope
      .$createObservableFunction('logout')
      .subscribe(function (res) {
        $log.debug('log out');
        return res;
      });
  });
