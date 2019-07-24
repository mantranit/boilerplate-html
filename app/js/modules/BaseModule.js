export default class BaseModule {
  constructor(el) {
    this.el = el;
    this.el.handler = this.el.handler || {};

    console.log(el);
  }
}
