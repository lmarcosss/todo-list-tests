"use client"

import { Button, Checkbox, TextInput } from "@/components"
import { FilterStatusEnum } from "@/enums"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"

export type TodoType = {
  id: string
  text: string
  isChecked: boolean
}

export default function Home() {
  const [newTodo, setNewTodo] = useState('')
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([])
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filter, setFilter] = useState<FilterStatusEnum>(FilterStatusEnum.ALL)

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
  

  useEffect(() => {
    switch (filter) {
      case FilterStatusEnum.COMPLETED:
        setFilteredTodos(todos.filter((todo) => todo.isChecked))
        break;
      case FilterStatusEnum.NOT_COMPLETED:
        setFilteredTodos(todos.filter((todo) => !todo.isChecked))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }, [todos, filter])

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

      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <Checkbox
            todo={todo}
            onChange={handleChangeCheckBox}
          />
        ))
      ) : (
        <p>Lista de tarefas está vazia!</p>
      )}

      <select
        name="filter"
        id="filter"
        value={filter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as FilterStatusEnum)}
      >
        <option defaultChecked value={FilterStatusEnum.ALL}>Mostrar Todas</option>
        <option value={FilterStatusEnum.COMPLETED}>Concluídas</option>
        <option value={FilterStatusEnum.NOT_COMPLETED}>Pendentes</option>
      </select>
    </div>
  )
}
