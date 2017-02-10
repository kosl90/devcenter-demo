import Vue from 'vue';
import FixedZone from 'src/components/FixedZone';

describe('FixedZone.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(FixedZone),
    });
    expect(vm.$el.querySelector('.fixed-zone a:first-child').textContent)
      .to.equal('问题反馈');
  });
});
