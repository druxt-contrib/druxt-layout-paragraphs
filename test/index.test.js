import DruxtLayoutParagraphNuxtModule from '../src'
import { DruxtLayoutParagraphMixin } from '../src'

const options = {
  baseUrl: 'https://demo-api.druxtjs.org',
  endpoint: '/jsonapi',
}

let mock

describe('DruxtLayoutParagraphNuxtModule', () => {
  beforeEach(() => {
    mock = {
      addModule: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn(),
      nuxt: {
        hook: jest.fn(),
      },
      options: {},
      DruxtLayoutParagraphNuxtModule
    }
  })

  test('Init', () => {
    // Add Nuxt hook mock handler.
    const dirs = []
    mock.nuxt.hook = jest.fn((hook, fn) => fn(dirs))

    // Call Druxt module with module options.
    DruxtLayoutParagraphNuxtModule.call(mock, options)

    // Expect that:
    // - The components:dirs hook was invoked.
    // - One directory is present.
    expect(mock.nuxt.hook).toHaveBeenCalledWith('components:dirs', expect.any(Function))
    expect(dirs.length).toBe(1)
  })

  test('DruxtLayoutParagraphMixin', () => {
    expect(DruxtLayoutParagraphMixin).toStrictEqual(expect.any(Object))
  })
})
