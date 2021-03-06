import React, { useState, useEffect } from 'react'
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
import axios from 'axios'

import Toast from '../Toast'
import useToast from '../hooks/useToast'

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

const Home = () => {
  const userId = JSON.parse(localStorage.getItem('user'))._id

  const [newTodo, setNewTodo] = useState({
    todo: '',
    isEdit: false,
    completed: false,
    userId,
  })
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [tempEditTodo, setTempEditTodo] = useState('')
  const [
    open,
    setOpen,
    severity,
    setSeverity,
    toastMsg,
    setToastMsg,
    handleClose,
  ] = useToast()

  useEffect(() => {
    axios
      .get(`/todo/${userId}`)
      .then(({ data }) => {
        setTodos(
          data.todos
            .map((todo) => {
              todo.isEdit = false
              return todo
            })
            .filter((todo) => {
              return !todo.completed
            }),
        )
        setCompletedTodos(
          data.todos
            .map((todo) => {
              todo.isEdit = false
              return todo
            })
            .filter((todo) => {
              return todo.completed
            }),
        )
      })
      .catch((error) => {
        console.error('SIGNIN ERROR', error.response.data)
      })
  }, [userId])

  const addTodo = () => {
    if (newTodo.todo) {
      axios({
        method: 'POST',
        url: '/todo/add',
        data: { userId, todo: newTodo.todo },
      })
        .then(({ data }) => {
          setSeverity('success')
          setToastMsg(data.message)
          setOpen(true)
          setNewTodo({
            todo: '',
            isEdit: false,
            completed: false,
            userId,
          })
          setTodos([...todos, data.todo])
        })
        .catch((error) => {
          console.error('ADD TODO ERROR', error.response.data)
          setSeverity('error')
          setToastMsg(error.response.data.error)
          setOpen(true)
        })
    }
  }

  const handleComplete = (i, id) => () => {
    axios({
      method: 'PUT',
      url: '/todo/complete',
      data: { todoId: id },
    })
      .then(({ data }) => {
        setSeverity('success')
        setToastMsg(data.message)
        setOpen(true)
        setTodos([...todos.slice(0, i), ...todos.slice(i + 1)])
        setCompletedTodos([...completedTodos, data.completedTodo])
      })
      .catch((error) => {
        console.error('COMPLETE TODO ERROR', error.response.data)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
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
      { ...todos[i], isEdit: !todos[i].isEdit },
      ...todos.slice(i + 1),
    ])
  }

  const handleEdit = (i, id) => () => {
    axios({
      method: 'PUT',
      url: '/todo/edit',
      data: { todoId: id, editedTodo: tempEditTodo },
    })
      .then(({ data }) => {
        setSeverity('success')
        setToastMsg(data.message)
        setOpen(true)
        setTodos([
          ...todos.slice(0, i),
          { ...todos[i], todo: tempEditTodo, isEdit: !todos[i].isEdit },
          ...todos.slice(i + 1),
        ])
      })
      .catch((error) => {
        console.error('EDIT TODO ERROR', error.response.data)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
  }

  const handleDelete = (i, id) => () => {
    axios({
      method: 'DELETE',
      url: `/todo/remove/${id}`,
    })
      .then(({ data }) => {
        setSeverity('success')
        setToastMsg(data.message)
        setOpen(true)
        data.deletedTodo.completed
          ? setCompletedTodos([
              ...completedTodos.slice(0, i),
              ...completedTodos.slice(i + 1),
            ])
          : setTodos([...todos.slice(0, i), ...todos.slice(i + 1)])
      })
      .catch((error) => {
        console.error('REMOVE TODO ERROR', error.response.data)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
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
        Todo List
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
            {todos.map(({ todo, isEdit, _id }, i) => (
              <ListItem divider key={_id}>
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
                        <Button onClick={handleEdit(i, _id)} color="secondary">
                          <CreateIcon />
                        </Button>
                        <DeleteButton onClick={handleEditMode(i, _id)}>
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
                        <Button
                          onClick={handleComplete(i, _id)}
                          disabled={isDisabled()}
                          color="primary"
                        >
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
                          onClick={handleDelete(i, _id)}
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
        <Grid item xs={12}>
          <Typography align="center" variant="h4" component="h2">
            Completed
          </Typography>
          <List>
            {completedTodos.map(({ todo, _id }, i) => {
              return (
                <ListItem divider key={_id}>
                  <ListItemText
                    primary={todo}
                    style={{ textDecoration: 'line-through' }}
                  />
                  <DeleteButton
                    disabled={isDisabled()}
                    onClick={handleDelete(i, _id)}
                  >
                    <DeleteIcon />
                  </DeleteButton>
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </Grid>
      <Toast
        open={open}
        handleClose={handleClose}
        severity={severity}
        toastMsg={toastMsg}
      />
    </Container>
  )
}

export default Home
