"use client"

import { Button, Checkbox, TextInput } from "@/components"
import { ChangeEvent, SyntheticEvent, useState } from "react"

export type TodoType = {
  id: string
  text: string
  isChecked: boolean
}

export default function Home() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<TodoType[]>([])

  const handleChange = (event:  ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  }

  const handleSubmit = (event:  SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTodos([...todos, { id:  String(new Date().getTime()), text: newTodo, isChecked: false }])

    setNewTodo("")
  }

  const handleChangeCheckBox = (id:  string) => {
    setTodos(todos.map((todo) => {
        if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked }
        }

        return todo
    }))
  }

  return (
    <div>
      <h1>Tarefas</h1>

      <form onSubmit={handleSubmit}>
        <TextInput
          id="todo"
          label="Nova Tarefa"
          value={newTodo}
          onChange={handleChange}
        />

        <Button
          label="Adicionar Tarefa"
          type="submit"
          disabled={!newTodo}
        />
      </form>

      {todos.length > 0 ? (
        todos.map((todo) => (
          <Checkbox
            todo={todo}
            onChange={handleChangeCheckBox}
          />
        ))
      ) : (
        <p>Lista de tarefas está vazia!</p>
      )}
    </div>
  )
}
