import NativeObject from '../NativeObject';
import Widget from '../Widget';

export default class Drawer extends Widget {

  constructor(properties) {
    super();
    if (arguments[0] !== true) {
      throw new Error('Drawer can not be created');
    }
    this._create('tabris.Drawer', properties);
  }

  _acceptChild() {
    return true;
  }

  _setParent(parent, index) {
    if (this._parent) {
      throw new Error('Parent of Drawer can not be changed');
    }
    super._setParent(parent, index);
  }

  _listen(name, listening) {
    if (name === 'open' || name === 'close') {
      this._nativeListen(name, listening);
    } else {
      super._listen(name, listening);
    }
  }

  _dispose() {
    throw new Error('Drawer can not be disposed');
  }

  open() {
    this._nativeCall('open', {});
    return this;
  }

  close() {
    this._nativeCall('close', {});
    return this;
  }

}

NativeObject.defineProperties(Drawer.prototype, {
  win_displayMode: {
    type: ['choice', ['overlay', 'compactOverlay']],
    default: 'overlay'
  },
  win_buttonBackground: {
    type: 'color',
    default: null
  },
  win_buttonTheme: {
    type: ['choice', ['light', 'dark', 'default']],
    default: 'default'
  },
  enabled: {
    type: 'boolean',
    default: false
  }
});

export function create() {
  return new Drawer(true);
}
