import angular from 'angular';
import checkboxModule from './checkbox.module';

export default angular
  .module('checkbox')
  .component('checkbox', {
    templateUrl: 'checkbox/checkbox.component.html',
    bindings: {
      value: '=',
      disabled: '<',
      label: '<',
      labelMobile: '<'
    }
  });
