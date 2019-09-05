import angular from 'angular';
import checkboxTableModule from './checkboxTable.module';

function CheckboxTableController($scope, data) {
  data($scope);
}

export default angular
  .module('checkboxTable')
  .component('checkboxTable', {
    templateUrl: 'checkboxTable/checkboxTable.component.html',
    controller: ['$scope', 'data', CheckboxTableController]
  });
