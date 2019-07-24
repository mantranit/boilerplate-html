import '../scss/app.scss';

// Your JS Code goes here
const moduleElements = [...document.querySelectorAll('[data-module]')];
const dynamicModule = (elements) => {
  elements.forEach((el) => {
    const modules = el.getAttribute('data-module').split(/(\s|,)/g).filter(s => s.trim().length && !s.includes(','));
    modules.forEach((m) => {
      new (require(`./modules/${m}`).default)(el);
    });
  });
};

dynamicModule(moduleElements);

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      const rawElements = [m.target, ...m.addedNodes];
      let modifyElements = [];
      rawElements.forEach((e) => {
        if (e.querySelectorAll) {
          modifyElements = [...modifyElements, ...e.querySelectorAll('[data-module]')];
        }
      });
      const elements = [...rawElements, ...modifyElements].filter(e => e.getAttribute && e.getAttribute('data-module') && !e.handler);
      dynamicModule(elements);
    });
  });
  observer.observe(document, {
    subtree: true,
    childList: true,
  });
});
