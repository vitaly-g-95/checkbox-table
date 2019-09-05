import angular from 'angular';
import customFormModule from './customForm.module';

function CustomFormController($scope, $timeout) {
  $scope.showMessage = false;

  let timeout = null;

  $scope._onSubmit = () => {
    $timeout.cancel(timeout);

    $scope.showMessage = false;

    $scope.onSubmit();

    $scope.showMessage = true;

    timeout = $timeout(() => {
      $scope.showMessage = false;
    }, 5000);
  };
}

export default angular
  .module('customForm')
  .directive('customForm', () => ({
    restrict: 'E',
    transclude: true,
    templateUrl: 'customForm/customForm.component.html',
    controller: ['$scope', '$timeout', CustomFormController],
    scope: {
      data: '=',
      onSubmit: '&'
    }
  }));
