import NativeObject from '../NativeObject';
import Widget from '../Widget';

export default class NavigationBar extends Widget {

  constructor(properties) {
    super();
    if (arguments[0] !== true) {
      throw new Error('NavigationBar can not be created');
    }
    this._create('tabris.NavigationBar', properties);
  }

  _setParent(parent, index) {
    if (this._parent) {
      throw new Error('Parent of NavigationBar can not be changed');
    }
    super._setParent(parent, index);
  }

  _dispose() {
    throw new Error('NavigationBar can not be disposed');
  }

}

NativeObject.defineProperties(NavigationBar.prototype, {
  displayMode: {type: ['choice', ['default', 'float', 'hide']], default: 'default'},
  height: {
    type: 'number',
    nocache: true,
    access: {
      set() {
        throw new Error('NavigationBar "height" is read only');
      }
    }
  },
  background: {type: 'color', nocache: true}
});

export function create() {
  return new NavigationBar(true);
}
