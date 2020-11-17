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

import Signup from '.'

describe('Signup', () => {
  const server = setupServer(
    rest.post('/auth/signup', (req, res, ctx) => {
      return res(ctx.json({ data: { message: 'Signup success' } }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders heading', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Route path="/signup">
          <Signup />
        </Route>
      </MemoryRouter>,
    )

    expect(screen.getByTestId('heading')).toHaveTextContent('Signup')
  })

  it('handles server error', async () => {
    server.use(
      rest.post('/auth/signup', (req, res, ctx) => {
        return res(ctx.status(500, 'Signup failed'))
      }),
    )

    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Route path="/signup">
          <Signup />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'Joe' },
    })
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

  it('successfully signs up', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Route path="/signup">
          <Signup />
        </Route>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'Joe' },
    })
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
})
