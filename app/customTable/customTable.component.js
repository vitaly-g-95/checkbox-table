import angular from 'angular';
import customTableModule from './customTable.module';

export default angular
  .module('customTable')
  .component('customTable', {
    templateUrl: 'customTable/customTable.component.html',
    bindings: {
      headers: '=',
      data: '='
    }
  });
