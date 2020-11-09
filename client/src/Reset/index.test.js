import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Reset from '.'

describe('Reset', () => {
  const server = setupServer(
    rest.put('/auth/reset-password', (req, res, ctx) => {
      return res(ctx.json({ data: { message: 'Reset password successful' } }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders heading', () => {
    render(
      <MemoryRouter initialEntries={['/reset/adsfahdfj']}>
        <Route path="/reset/:token">
          <Reset />
        </Route>
      </MemoryRouter>,
    )

    expect(screen.getByTestId('heading')).toHaveTextContent('Reset Password')
  })

  it('successfully resets password', async () => {
    render(
      <MemoryRouter initialEntries={['/reset/adsfahdfj']}>
        <Route path="/reset/:token">
          <Reset />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })

  it('handles server error', async () => {
    server.use(
      rest.put('/auth/reset-password', (req, res, ctx) => {
        return res(ctx.status(500, 'Reset password failed'))
      }),
    )

    render(
      <MemoryRouter initialEntries={['/reset/:1']}>
        <Route path="/reset/:token">
          <Reset />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })
})
