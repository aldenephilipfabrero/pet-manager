import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'
import { describe, expect, test } from 'vitest'
import { vi } from 'vitest'

describe('HomePage.vue', () => {
  test('renders home vue', () => {
    const wrapper = mount(HomePage, {
      global: {
        mocks: {
          $router: { push: vi.fn() },
        },
      },
    })
    expect(wrapper.text()).toContain('Pet Manager')
  })
})
