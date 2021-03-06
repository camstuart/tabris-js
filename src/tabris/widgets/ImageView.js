import NativeObject from '../NativeObject';
import Widget from '../Widget';

export default class ImageView extends Widget {

  constructor(properties) {
    super();
    this._create('tabris.ImageView', properties);
  }

  _listen(name, listening) {
    if (name === 'load') {
      this._nativeListen(name, listening);
    } else {
      super._listen(name, listening);
    }
  }

}

NativeObject.defineProperties(ImageView.prototype, {
  image: {type: 'image', default: null},
  scaleMode: {type: ['choice', ['auto', 'fit', 'fill', 'stretch', 'none']], default: 'auto'},
  tintColor: {
    type: 'color',
    access: {
      set(name, value, options) {
        this._nativeSet(name, value === undefined ? null : value);
        this._storeProperty(name, value, options);
      }
    }
  }
});
