import {NativeObject} from 'tabris';

let nativeObject: NativeObject;

// Properties
let cid: string;

nativeObject.cid = cid;

cid = nativeObject.cid;

// Methods
let type: string;
let listener: (event: Object) => void;
let context: NativeObject;
let property: string;
let properties: Object;
let thisReturnValue: NativeObject;
let value: any;

thisReturnValue = nativeObject.on(type, listener, context);
thisReturnValue = nativeObject.once(type, listener, context);
thisReturnValue = nativeObject.off(type, listener, context);
thisReturnValue = nativeObject.trigger(type, type);
thisReturnValue = nativeObject.get(property);
thisReturnValue = nativeObject.set(property, value);
thisReturnValue = nativeObject.set(properties);
