import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import jwt from 'jsonwebtoken'

import Activate from './index'

describe('Activate', () => {
  const server = setupServer(
    rest.post('/auth/activation', (req, res, ctx) => {
      return res(ctx.json({ data: { message: 'Activate successful' } }))
    }),
  )

  const match = {
    params: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWR3YXJkIiwiZW1haWwiOiJlZHdhcmQuaG9uZzUyN0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWF0IjoxNjA0ODgxNDY0LCJleHAiOjE2MDQ4ODIwNjR9.G5FtjYUDvIKCg99K2nOYuwT9Jvj6JVPZrFF4rob1aVM',
    },
  }

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('loads heading with user name', () => {
    render(<Activate match={match} />)

    expect(screen.getByTestId('heading')).toHaveTextContent(
      `Hey ${
        jwt.decode(match.params.token).name
      }, ready to activate your account?`,
    )
  })

  it('successfully activates account', async () => {
    render(<Activate match={match} />)

    fireEvent.click(screen.getByText('Activate'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })

  it('handles server error', async () => {
    server.use(
      rest.post('/auth/activation', (req, res, ctx) => {
        return res(ctx.status(500, 'Activate failed'))
      }),
    )

    render(<Activate match={match} />)

    fireEvent.click(screen.getByText('Activate'))

    await waitForElement(() => screen.getByTestId('toast'))

    expect(screen.getByTestId('toast')).toBeVisible()
  })
})
