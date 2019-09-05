export default class {
  constructor($scope) {
    this.$scope = $scope;

    $scope.headers = this.getHeaders(j => {
      $scope.$watch(`headers[${j}].value`, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          $scope.data = this.toggleCol(j, newVal);
        }
      });
    });

    $scope.data = this.getData((i, j) => {
      $scope.$watchGroup([`data[${i}][${j}].value`, `data[${i}][${j}].disabled`], () => {
        $scope.headers[j] = this.toggleHeader(j);
      });

      $scope.$watch(`data[${i}][${j}].value`, () => {
        $scope.data[i] = this.toggleNext(i, j);
      });
    });

    $scope.saveData = () => this.setData();
  }

  getHeaders(cb = () => {}) {
    return ['Sections', 'view', 'edit', 'remove']
      .map((key, j) => {
        if (!j) {
          return key;
        }

        cb(j);

        return {
          component: 'checkbox',
          key,
          value: false,
          label: 'Check all',
          labelMobile: `Check all ${key}s`
        };
      });
  }

  getData(colCb = () => {}) {
    let data = null;

    try {
      data = JSON.parse(localStorage.getItem('checkboxTableData'));
    } catch(e) {}

    data = data || ['calendar', 'profile', 'property', 'contacts']
      .map(section => ({
        section,
        permission: {
          view: false,
          edit: false,
          remove: false
        }
      }));
    
    return data.map(({ section, permission }, i) => [
      section,
      ...Object.keys(permission).map((key, j) => {
        colCb(i, j + 1);

        return {
          component: 'checkbox',
          key,
          value: permission[key],
          label: key
        };
      })
    ]);
  }

  toggleHeader(n) {
    const disabled = this.$scope.data.every(row => row[n].disabled);
    const value = this.$scope.data.every(row => row[n].value || row[n].disabled) && !disabled;

    return Object.assign({}, this.$scope.headers[n], {
      value,
      disabled
    });
  }

  toggleCol(n, value) {
    return !value && !this.$scope.data.every(row => row[n].value || row[n].disabled)
      ? this.$scope.data
      : this.$scope.data.map((row, i) => row.map((col, j) => {
        return j !== n
          ? col
          : Object.assign({}, col, {
            value: value && !col.disabled
          });
      }));
  }

  toggleNext(i, fromCol) {
    return this.$scope.data[i].map((col, j, row) => {
      if (j < fromCol + 1) {
        return col;
      }

      const newCol = Object.assign({}, col);

      const disabled = !row[j - 1].value;

      newCol.disabled = disabled;

      if (disabled) {
        newCol.value = false;
      }

      return newCol;
    });
  }

  setData() {
    const storageData = this.$scope.data.map(row => ({
      section: row[0],
      permission: row.slice(1).reduce((accum, col) => Object.assign({}, accum, {
        [col.key]: col.value
      }), {})
    }));

    localStorage.setItem('checkboxTableData', JSON.stringify(storageData));
  }
}
