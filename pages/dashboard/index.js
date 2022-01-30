import React, { useState } from 'react';
import { Loading, Button, Card, Grid, Input, Modal, Text, Textarea, theme, Checkbox } from '@nextui-org/react';
import withGaurd from 'components/HOC/withGaurd';


function Dashboard({ todos: TODOS }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState(TODOS);
  const handleSubmit = async e => {
    e.preventDefault();
    const todo = e.target.todo.value
    const description = e.target.description.value
    if (!todo || !description) return
    setLoading(true)
    await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        todo,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => setTodos([...todos, res])).catch(err => console.log(err.message))
    setLoading(false)
  }
  const updateTodo = async (todo) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      setTodos(res)
    }).catch(err => console.log(err.message))
  } 
  const handleCompletedChange = async ({ target: { checked } }, todo) => {
    await updateTodo({...todo, completed: checked})
  }
  return <div style={{ paddingTop: '2em' }}>
    <Card
      bordered
    >
      <Grid.Container
        css={{
          maxHeight: '60vh'
        }}
        justify='space-between'
        alignItems='center'>
        <Text
          h1
          size={20}
          color={theme.colors.secondary}
        >
          Your ToDo List
        </Text>
        <div
          style={{
            display: 'flex',
            gap: 20
          }}
        >
          <Button onClick={e => setVisible(true)} auto>Create Todo</Button>
        </div>
      </Grid.Container>
      <hr />
      {!todos.length && (
        <Text
          as={'strong'}
        >
          No Todos
        </Text>
      )}
      <Grid.Container gap={2} alignItems='flex-start'>
        {todos.map(todo => (
          <Grid key={JSON.stringify(todo)} sm={6} xs={12} md={4}>
            <Card shadow={false} color={'default'} bordered>
              <Grid.Container justify='space-between' wrap='nowrap' alignItems='flex-start'>
                <Text
                  as={'strong'}
                  size={18}
                >{todo.todo}</Text>
                <Checkbox checked={todo.completed} onChange={e => handleCompletedChange(e, todo)} />
              </Grid.Container>

              {todo.description && (
                <>
                  <Text
                    small
                  >{todo.description}</Text>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Card>
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={e => setVisible(false)}
    >
      <Modal.Header>
        <Text
          as={'strong'}
          id="modal-title"
          size={18}
        >
          Add Todo
        </Text>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <br />
          <Input
            name='todo'
            bordered
            fullWidth
            color="primary"
            size="md"
            labelPlaceholder="Todo"
          />
          <br />
          <Textarea
            name='description'
            bordered
            fullWidth
            color="primary"
            size="md"
            labelPlaceholder="Description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto disabled={loading}>
            {loading ? <Loading /> : 'Add Todo'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </div>;
}

export default withGaurd(Dashboard)


export async function getStaticProps(ctx) {
  const todos = await fetch(process.env.NEXT_PUBLIC_API_URL).then(res => res.json());
  return {
    props: {
      todos
    }
  }
}