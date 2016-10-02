angular
  .module('menu.controller', [])
  .run(function ($log) {
    $log.debug('menu controller running');
  })
  .controller('menu', function ($log, $feathers, $translate) {
    $log.debug('menu controller');
  });
