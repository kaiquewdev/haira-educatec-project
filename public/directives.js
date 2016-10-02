angular
  .module('directives', [])
  .directive('mainMenu', function () {
    return {templateUrl: './views/main-menu.html'};
  })
  .directive('loginPanel', function () {
    return {templateUrl: './views/login-panel.html'};
  })
  .directive('profilePanel', function () {
    return {templateUrl: './views/profile-panel.html'};
  })
  .directive('previewReviewPanel', function () {
    return {templateUrl: './views/preview-review-panel.html'};
  })
  .directive('previewListPanel', function () {
    return {templateUrl: './views/preview-list-panel.html'};
  })
  .directive('stashPanel', function () {
    return {templateUrl: './views/stash-panel.html'};
  })
  .directive('videoPreviewListModal', function () {
    return {templateUrl: './views/video-preview-list-modal.html'};
  });
