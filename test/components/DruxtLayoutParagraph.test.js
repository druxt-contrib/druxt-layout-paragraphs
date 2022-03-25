import 'regenerator-runtime/runtime'
import { createLocalVue, mount } from '@vue/test-utils'

import DruxtWrapper from 'druxt/dist/components/DruxtWrapper.vue'
import DruxtModuleComponent from '../../src/components/DruxtLayoutParagraph.vue'

// Setup local vue instance.
const localVue = createLocalVue()
localVue.component('DruxtWrapper', DruxtWrapper)

// Mount the Vue component.
const mountComponent = function() {
  return mount(
    DruxtModuleComponent,
    {
      localVue,
      mocks: {
        $fetchState: { pending: true },
        $nuxt: {
          context: {}
        }
      },
      props: {
        entity: {
          type: 'paragraph--section',
          attributes: {},
        }
      }
    }
  )
}

describe('DruxtLayoutParagraph', () => {
  test('Default', async () => {
    // Mount the component.
    const wrapper = mountComponent()

    // Simulate the Nuxt fetch hook.
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    // Assert data and props are as expected.
    expect(wrapper.vm.component).toMatchSnapshot()

    // Assert slots.
    const h = jest.fn()
    const slots = wrapper.vm.$options.druxt.slots(h)
    slots.default()
    expect(h).toBeCalledWith('div', [])
  })

  test('Slots', async () => {
    // Mount the component.
    const wrapper = mountComponent()

    // Simulate the Nuxt fetch hook.
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    // Assert data and props are as expected.
    expect(wrapper.vm.component).toMatchSnapshot()

    // Assert slots.
    const h = jest.fn()
    const children = [{
      attributes: {
        behavior_settings: {
          layout_paragraphs: {
            region: 'test'
          }
        }
      }
    }]
    const slots = wrapper.vm.$options.druxt.slots.call({ children }, h)
    expect(Object.keys(slots)).toStrictEqual(['test', 'default'])
  })
})
