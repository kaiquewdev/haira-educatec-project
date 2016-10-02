angular
  .module('unique.filter', [])
  .run(function ($log) {
    $log.debug('unique filter');
  })
  .filter('unique', function ($log, hasItem) {
    return function (stashes) {
      stashes = stashes || [];
      var out = [];
      stashes.map(function (m) {
        if (!hasItem(out, m, 'reference')) {
          out.push(m);
        }
      })
      return out;
    }
  });
