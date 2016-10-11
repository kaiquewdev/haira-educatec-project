angular
  .module('directives', [])
  .directive('brand', function () {
    return {templateUrl: './views/brand.html'};
  })
  .directive('mainMenu', function () {
    return {templateUrl: './views/main-menu.html'};
  })
  .directive('contentPanel', function () {
    return {templateUrl: './views/content-panel.html'};
  })
  .directive('catalogPanel', function () {
    return {templateUrl: './views/catalog-panel.html'};
  })
  .directive('loginPanel', function () {
    return {templateUrl: './views/login-panel.html'};
  })
  .directive('publicationsPanel', function () {
    return {templateUrl: './views/publications-panel.html'};
  });
