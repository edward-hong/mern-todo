import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'

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
          <Button onClick={addTodo} variant="contained" color="primary">
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            {todos.map((todo, i) => (
              <ListItem divider key={i}>
                <ListItemText primary={todo} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
