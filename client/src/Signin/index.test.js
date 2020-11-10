import React from 'react'
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Signin from '.'

describe('Signin', () => {
  const server = setupServer(
    rest.post('/auth/signin', (req, res, ctx) => {
      return res(ctx.json({ data: { token: 'asdfalsf', user: 'Joe' } }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders heading', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Route path="/signin">
          <Signin />
        </Route>
      </MemoryRouter>,
    )

    expect(screen.getByTestId('heading')).toHaveTextContent('Signin')
  })

  it('handles server error', async () => {
    server.use(
      rest.post('/auth/signin', (req, res, ctx) => {
        return res(ctx.status(500, 'Reset password failed'))
      }),
    )

    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Route path="/signin">
          <Signin />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'a@email.com' },
    })
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })

  it('successfully signs in', async () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Route path="/signin">
          <Signin />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'a@email.com' },
    })
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('heading'))

    expect(screen.getByTestId('heading')).toHaveTextContent('Signin')
  })

  it('redirects to different page when logged in', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Route path="/signin">
          <Signin />
        </Route>
      </MemoryRouter>,
    )

    expect(document.body.textContent).toBe('')
  })
})
