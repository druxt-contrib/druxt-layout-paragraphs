import NuxtModule from '../src'

const options = {
  baseUrl: 'https://demo-api.druxtjs.org',
  endpoint: '/jsonapi',
}

let mock

describe('DruxtModule Nuxt module', () => {
  beforeEach(() => {
    mock = {
      addModule: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn(),
      nuxt: {
        hook: jest.fn(),
      },
      options: {},
      NuxtModule
    }
  })

  test('Init', () => {
    // Add Nuxt hook mock handler.
    const dirs = []
    mock.nuxt.hook = jest.fn((hook, fn) => fn(dirs))

    // Call Druxt module with module options.
    NuxtModule.call(mock, options)

    // Expect that:
    // - The components:dirs hook was invoked.
    // - One directory is present.
    expect(mock.nuxt.hook).toHaveBeenCalledWith('components:dirs', expect.any(Function))
    expect(dirs.length).toBe(1)
  })
})
