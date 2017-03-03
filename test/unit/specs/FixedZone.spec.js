import Vue from 'vue';
import FixedZone from '~components/FixedZone';
import assert from 'assert';

describe('FixedZone.vue', () => {
  it('should render correct contents', () => {
    // Two ways to test a component. Because FixedZone is not an constructor.
    // Use `$mount` to render component off-document.
    // const TestComponent = Vue.extend(FixedZone);
    // const vm = new TestComponent().$mount();
    const vm = new Vue({
      render: h => h(FixedZone),
    }).$mount();
    const actTxt = vm.$el.querySelector('.fixed-zone a:first-child').textContent;
    assert.equal(actTxt, '问题反馈');
  });
});
