import Vue from 'vue';
import FixedZone from 'src/components/FixedZone';
import assert from 'assert';

describe('FixedZone.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(FixedZone),
    });
    const actTxt = vm.$el.querySelector('.fixed-zone a:first-child').textContent;
    assert.equal(actTxt, '问题反馈');
  });
});