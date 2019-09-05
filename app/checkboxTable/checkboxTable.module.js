import angular from 'angular';
import customFormComponent from '../customForm/customForm.component';
import customTableComponent from '../customTable/customTable.component';
import checkboxComponent from '../checkbox/checkbox.component';
import checkboxTableDataService from './checkboxTableData.service';

export default angular
  .module('checkboxTable', [
    'customForm',
    'customTable',
    'checkbox'
  ])
  .factory('data', () => scope => new checkboxTableDataService(scope));
