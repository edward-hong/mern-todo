import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
  },
})

const DeleteButton = withStyles({
  root: {
    background: red[500],
    '&:hover': {
      background: red[600],
    },
  },
})(Button)

const App = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, newTodo])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleDelete = (i) => () => {
    setTodos([...todos.slice(0, i), ...todos.slice(i + 1)])
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" component="h1">
        Todo
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <TextField
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            value={newTodo}
            fullWidth
            label="Add Todo"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={addTodo} variant="contained">
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MuiThemeProvider theme={theme}>
            <List>
              {todos.map((todo, i) => (
                <ListItem divider key={i}>
                  <ListItemText primary={todo} />

                  <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                  >
                    <Button color="primary">
                      <CheckIcon />
                    </Button>
                    <Button color="secondary">
                      <CreateIcon />
                    </Button>
                    <DeleteButton onClick={handleDelete(i)} color="default">
                      <DeleteIcon />
                    </DeleteButton>
                  </ButtonGroup>
                </ListItem>
              ))}
            </List>
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
