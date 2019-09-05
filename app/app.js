import angular from 'angular';
import checkboxTableComponent from './checkboxTable/checkboxTable.component';

angular
  .module('myApp', [
    'checkboxTable'
  ])
  .run(['$rootScope', '$window', ($rootScope, $window) => {
    angular.element($window).bind('load scroll resize', () => $rootScope.$apply());

    $rootScope.$watch(() => $window.matchMedia('(max-width: 479px)').matches, isMobile => {
      $rootScope.isMobile = isMobile;
    });
  }])
  .filter('camelCaseToDash', () => str => str.replace(/[A-Z]/g, c => '-' + c.toLowerCase()))
  .filter('capitalize', () => str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase())
  .directive('dynamicElement', ['$compile', 'camelCaseToDashFilter', ($compile, camelCaseToDashFilter) => ({
    restrict: 'E',
    replace: true,
    scope: {
      data: '='
    },
    link(scope, element, attrs) {
      const { data } = scope;

      const el = typeof data !== 'object'
        ? data
        : (() => {
          const component = camelCaseToDashFilter(data.component);

          return $compile(`
            <${component}
              ${Object.keys(data)
                .filter(key => key !== 'component')
                .map(key => `${camelCaseToDashFilter(key)}="data.${key}"`)
                .join(' ')}
            ></${component}>
          `)(scope);
        })();

      element.replaceWith(el);
    }
  })]);
