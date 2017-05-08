export const spyOnGetter = (object: object, propName: string) => {
  const proto = Object.getPrototypeOf(object);
  const oldDescriptor = Object.getOwnPropertyDescriptor(proto, propName);
  const spy = jasmine.createSpy('get ' + propName, oldDescriptor.get);
  Object.defineProperty(object, propName, {
    get: spy,
    set: oldDescriptor.set
  });
  return spy;
};

export const spyOnSetter = (object: object, propName: string) => {
  const proto = Object.getPrototypeOf(object);
  const oldDescriptor = Object.getOwnPropertyDescriptor(proto, propName);
  const spy = jasmine.createSpy('set ' + propName, oldDescriptor.set);
  Object.defineProperty(object, propName, {
    get: oldDescriptor.get,
    set: spy
  });
  return spy;
};
