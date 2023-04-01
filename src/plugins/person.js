export default {
  install(app, options) {
    const person = {
      name: '짐코딩',
      say() {
        alert(this.name);
      },
      ...options,
    };
    app.config.globalProperties.$person = person;
    // setup 안에 접근하고 싶을때
    app.provide('person', person);
  },
};