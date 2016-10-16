angular
  .module('directives', [])
  .directive('brand', function () {
    return {templateUrl: './static/views/brand.html'};
  })
  .directive('mainMenu', function () {
    return {templateUrl: './static/views/main-menu.html'};
  })
  .directive('contentPanel', function () {
    return {templateUrl: './static/views/content-panel.html'};
  })
  .directive('catalogPanel', function () {
    return {templateUrl: './static/views/catalog-panel.html'};
  })
  .directive('loginPanel', function () {
    return {templateUrl: './static/views/login-panel.html'};
  })
  .directive('publicationsPanel', function () {
    return {templateUrl: './static/views/publications-panel.html'};
  });
