import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { renderHook, act } from '@testing-library/react-hooks';
import ReactTestUtils from 'react-dom/test-utils';
configure({ adapter: new Adapter() });
global.expect = expect;
global.assert = assert;

global.sinon = sinon;

global.mount = mount;
global.render = render;
global.shallow = shallow;

global.renderHook = renderHook;
global.act = act;
