import 'regenerator-runtime/runtime'
import { createLocalVue, mount } from '@vue/test-utils'

import DruxtFieldComponent from '../../src/components/DruxtFieldLayoutParagraphs.vue'

// Setup local vue instance.
const localVue = createLocalVue()

const mockData = {
  data: [
    {
      attributes: {
        behavior_settings: {
          layout_paragraphs: {
            layout: 'twocol'
          }
        }
      },
      type: 'paragraph--layout_paragraphs',
      id: 'test-layout'
    },
    {
      attributes: {
        behavior_settings: {
          layout_paragraphs: {
            parent_uuid: 'test-layout'
          }
        }
      },
      type: 'paragraph--text',
      id: 'test-child'
    },
    {
      attributes: {
        behavior_settings: {
          layout_paragraphs: {
            layout: '',
            parent_uuid: '',
          },
        }
      },
      type: 'paragraph--text',
      id: 'test-root'
    },
  ]
}

// Mount the Vue component.
const mountComponent = function() {
  return mount(
    DruxtFieldComponent,
    {
      localVue,
      mocks: {
        $fetchState: { pending: true },
        $druxt: {
          axios: { get: jest.fn(() => ({ data: mockData })) },
          settings: { proxy: false }
        },
        $nuxt: { context: {} }
      },
      propsData: {
        schema: {},
        value: { links: { related: { href: '' } } }
      }
    }
  )
}

describe('DruxtFieldLayoutParagraphs', () => {
  test('Default', async () => {
    // Mount the component.
    const wrapper = mountComponent()

    // Simulate the Nuxt fetch hook.
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    // Assert data and props are as expected.
    expect(wrapper.vm.rootParagraphs).toStrictEqual([
      mockData.data[0],
      mockData.data[2]
    ])

    expect(wrapper.vm.isLayout(mockData.data[0])).toBe(true)
    expect(wrapper.vm.getChildren(mockData.data[0])[0]).toBe(mockData.data[1])

    expect(wrapper.vm.isLayout(mockData.data[1])).toBe(false)
    expect(wrapper.vm.isLayout(mockData.data[2])).toBe(false)
  })
})
