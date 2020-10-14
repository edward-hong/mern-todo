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
import ClearIcon from '@material-ui/icons/Clear'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
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
  const [newTodo, setNewTodo] = useState({ todo: '', isEdit: false })
  const [todos, setTodos] = useState([])
  const [tempEditTodo, setTempEditTodo] = useState('')

  const addTodo = () => {
    if (newTodo.todo) {
      setTodos([...todos, newTodo])
      setNewTodo({ todo: '', isEdit: false })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleEditMode = (i) => () => {
    todos[i].isEdit ? setTempEditTodo('') : setTempEditTodo(todos[i].todo)
    setTodos([
      ...todos.slice(0, i),
      { todo: todos[i].todo, isEdit: !todos[i].isEdit },
      ...todos.slice(i + 1),
    ])
  }

  const handleEdit = (i) => () => {
    setTodos([
      ...todos.slice(0, i),
      { todo: tempEditTodo, isEdit: !todos[i].isEdit },
      ...todos.slice(i + 1),
    ])
  }

  const handleDelete = (i) => () => {
    setTodos([...todos.slice(0, i), ...todos.slice(i + 1)])
  }

  const isDisabled = () => {
    for (const todo of todos) {
      if (todo.isEdit) {
        return true
      }
    }
    return false
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" component="h1">
        Todo
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <TextField
            onChange={(e) =>
              setNewTodo({ todo: e.target.value, isEdit: false })
            }
            onKeyDown={handleKeyDown}
            value={newTodo.todo}
            fullWidth
            label="Add Todo"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={1}>
          <Button disabled={isDisabled()} onClick={addTodo} variant="contained">
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            {todos.map(({ todo, isEdit }, i) => (
              <ListItem divider key={i}>
                {isEdit ? (
                  <>
                    <TextField
                      fullWidth
                      label="Edit Todo"
                      variant="outlined"
                      size="small"
                      value={tempEditTodo}
                      onChange={(e) => setTempEditTodo(e.target.value)}
                    />
                    <MuiThemeProvider theme={theme}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                        style={{ marginLeft: 8 }}
                      >
                        <Button onClick={handleEdit(i)} color="secondary">
                          <CreateIcon />
                        </Button>
                        <DeleteButton onClick={handleEditMode(i)}>
                          <ClearIcon />
                        </DeleteButton>
                      </ButtonGroup>
                    </MuiThemeProvider>
                  </>
                ) : (
                  <>
                    <MuiThemeProvider theme={theme}>
                      <ListItemText primary={todo} />

                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                      >
                        <Button disabled={isDisabled()} color="primary">
                          <CheckIcon />
                        </Button>
                        <Button
                          disabled={isDisabled()}
                          onClick={handleEditMode(i)}
                          color="secondary"
                        >
                          <CreateIcon />
                        </Button>
                        <DeleteButton
                          disabled={isDisabled()}
                          onClick={handleDelete(i)}
                        >
                          <DeleteIcon />
                        </DeleteButton>
                      </ButtonGroup>
                    </MuiThemeProvider>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
