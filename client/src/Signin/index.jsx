import React, { useState } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import Toast from '../Toast'
import useToast from '../hooks/useToast'
import { authenticate, isAuth } from '../utils/helpers'

const Signin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()
	const [
		open,
		setOpen,
		severity,
		setSeverity,
		toastMsg,
		setToastMsg,
		handleClose,
	] = useToast()

	const handleSubmit = e => {
		e.preventDefault()

		axios({
			method: 'POST',
			url: '/auth/signin',
			data: { email, password },
		})
			.then(response => {
				authenticate(response)
				history.push('/')
			})
			.catch(error => {
				setSeverity('error')
				setToastMsg(error.response.data.error)
				setOpen(true)
			})
	}

	return (
		<Container maxWidth="sm">
			<Typography
				data-testid="heading"
				align="center"
				variant="h2"
				component="h1">
				Signin
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							inputProps={{ 'data-testid': 'email' }}
							label="Email"
							variant="outlined"
							size="small"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							inputProps={{ 'data-testid': 'password' }}
							label="Password"
							variant="outlined"
							size="small"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Grid>
					<Button
						data-testid="submit"
						type="submit"
						fullWidth
						variant="contained"
						color="primary">
						Signin
					</Button>
					<Typography data-testid="forgot" align="right" component="p">
						Forgot Password? Click <Link to="/forgot">here</Link>
					</Typography>
				</Grid>
			</form>
			<Toast
				open={open}
				handleClose={handleClose}
				severity={severity}
				toastMsg={toastMsg}
			/>
			{isAuth() && <Redirect to="/" />}
		</Container>
	)
}

export default Signin
