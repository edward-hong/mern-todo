import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Forgot from '.'

describe('Forgot', () => {
  const server = setupServer(
    rest.put('/auth/forgot-password', (req, res, ctx) => {
      return res(ctx.json({ data: { message: 'Forgot password email sent' } }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders heading', () => {
    render(<Forgot />)

    expect(screen.getByTestId('heading')).toHaveTextContent('Forgot Password')
  })

  it('successfully sends password forgot email', async () => {
    render(<Forgot />)

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'a@email.com' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })

  it('handles server error', async () => {
    server.use(
      rest.put('/auth/forgot-password', (req, res, ctx) => {
        return res(ctx.status(500, 'Send forgot email failed'))
      }),
    )

    render(<Forgot />)

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'a@email.com' },
    })
    fireEvent.click(screen.getByTestId('submit'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })
})
