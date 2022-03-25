import { createLocalVue, mount } from '@vue/test-utils'

import { DruxtLayoutParagraphMixin } from '../src/mixin'

// Setup local vue instance.
const localVue = createLocalVue()

const component = {
  name: 'DruxtLayoutParagraphTest',
  mixins: [DruxtLayoutParagraphMixin],
  render: () => '<div><slot /></div>',
}

describe('DruxtLayoutParagraphMixin', () => {
  test('Default', async () => {
    const propsData = {
      children: [{
        attributes: {
          behavior_settings: {
            layout_paragraphs: {
              region: 'test'
            }
          }
        }
      }],
      entity: {
        type: 'paragraph--section',
        attributes: {},
      }
    }
    const wrapper = mount(component, { localVue, propsData })
    expect(wrapper.vm.children).toStrictEqual(expect.any(Array))
    expect(wrapper.vm.entity).toStrictEqual(expect.any(Object))
  })
})
