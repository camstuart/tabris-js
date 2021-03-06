import {expect, restore} from '../../test';
import ProxyStore from '../../../src/tabris/ProxyStore';
import NativeBridge from '../../../src/tabris/NativeBridge';
import ClientStub from '../ClientStub';
import NavigationView from '../../../src/tabris/widgets/NavigationView';
import Page from '../../../src/tabris/widgets/Page';
import Composite from '../../../src/tabris/widgets/Composite';

describe('Page', function() {

  let client;
  let parent;
  let page;

  beforeEach(function() {
    client = new ClientStub();
    global.tabris = {
      on: () => {},
      _proxies: new ProxyStore(),
      _notify: (cid, event, param) => tabris._proxies.find(cid)._trigger(event, param)
    };
    global.tabris._nativeBridge = new NativeBridge(client);
    parent = new NavigationView();
    client.resetCalls();
    page = new Page();
  });

  afterEach(restore);

  it('is created', function() {
    let createCalls = client.calls({op: 'create'});
    expect(createCalls.length).to.equal(1);
    expect(createCalls[0].type).to.equal('tabris.Page');
  });

  it('set SETs properties', function() {
    client.resetCalls();
    page.set({
      title: 'title',
      image: {src: 'image'},
      background: 'red'
    });

    let setCalls = client.calls({op: 'set'});
    expect(setCalls.length).to.equal(1);
    expect(setCalls[0].properties.title).to.equal('title');
    expect(setCalls[0].properties.image).to.deep.equal(['image', null, null, null]);
    expect(setCalls[0].properties.background).to.deep.equal([255, 0, 0, 255]);
  });

  it('get returns default values', function() {
    expect(page.title).to.equal('');
    expect(page.image).to.be.null;
    expect(page.background).to.equal('rgba(0, 0, 0, 0)');
  });

  it('supports children', function() {
    let child = new Composite();
    client.resetCalls();
    page.append(child);

    let call = client.calls({op: 'set', id: child.cid})[0];
    expect(call.properties.parent).to.equal(page.cid);
  });

  it('prevents insertBefore', function() {
    page.appendTo(parent);
    expect(() => {
      new Page().insertBefore(page);
    }).to.throw(Error, 'insertBefore not supported on Page');
  });

  it('prevents insertAfter', function() {
    page.appendTo(parent);
    expect(() => {
      new Page().insertAfter(page);
    }).to.throw(Error, 'insertAfter not supported on Page');
  });

  it('throws when appended to an illegal parent', function() {
    expect(() => {
      page.appendTo(new Composite());
    }).to.throw(Error, 'Page could not be appended to Composite');
  });

});
