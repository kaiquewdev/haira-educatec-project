angular
  .module('hasItem.factory', [])
  .run(function ($log) {
    $log.debug('has item factory');
  })
  .factory('hasItem', function () {
    return function (refs, item, key) {
      refs = refs || [];
      item = item || {};
      key = key || '';
      return !!refs.filter(function (it) { return item[key] === it[key] }).length;
    };
  });
