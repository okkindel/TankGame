import { extend } from 'lodash'; // eslint-disable-line import/no-extraneous-dependencies


export default function simpleReactTestWrapper(Class_) {
  // eslint-disable-next-line no-param-reassign
  Class_.prototype.setState = function setStateStub(obj) {
    extend(this.state, obj);
  };

  return function constructorWrapper(props) {
    const obj = new Class_(props);
    obj.props = obj.props || {};

    Object.keys(Class_.defaultProps).forEach((defaultProp) => {
      const prop = obj.props[defaultProp];
      if (prop === null || prop === undefined) {
        obj.props[defaultProp] = Class_.defaultProps[defaultProp];
      }
    });

    return obj;
  };
}
