import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from '@/app/page'
import { FilterStatusEnum } from '@/enums'

const cases = [[FilterStatusEnum.COMPLETED, 2], [FilterStatusEnum.NOT_COMPLETED, 3], [FilterStatusEnum.ALL, 5]]

describe("Home Page", () => {
    it("Renderer page without todo's on list", () => {
        render(<Home />)

        const emptyText = screen.getByText("Lista de tarefas está vazia!")

        expect(emptyText).toBeInTheDocument()
    })

    it("Add new todo on list", async () => {
        render(<Home />)

        const todoInput = screen.getByLabelText("Nova Tarefa")
        userEvent.click(todoInput)

        await userEvent.type(todoInput, "Tarefa 1")
        
        const button = screen.getByRole("button")

        userEvent.click(button)

        await waitFor(() => {
            const newTodo = screen.getByText("Tarefa 1")
            expect(newTodo).toBeInTheDocument()
        })
    })

    it("Change isChecked of new todo to true", async () => {
        render(<Home />)

        const todoInput = screen.getByLabelText("Nova Tarefa")
        userEvent.click(todoInput)

        await userEvent.type(todoInput, "Tarefa 1")

        const button = screen.getByRole("button")

        userEvent.click(button)

        await waitFor(async () => {
            const newTodo = screen.getByLabelText("Tarefa 1")

            userEvent.click(newTodo)

            await waitFor(async () => {
                expect(newTodo).toBeChecked()
            })
        })
    })

    it("Change isChecked of new todo to false", async () => {
        render(<Home />)

        const todoInput = screen.getByLabelText("Nova Tarefa")
        userEvent.click(todoInput)

        await userEvent.type(todoInput, "Tarefa 1")

        const button = screen.getByRole("button")

        userEvent.click(button)

        await waitFor(async () => {
            const newTodo = screen.getByLabelText("Tarefa 1")

            userEvent.click(newTodo) // Change to true
            userEvent.click(newTodo) // Change to false

            await waitFor(async () => {
                expect(newTodo).not.toBeChecked()
            })
        })
    })

    test.each(cases)(
     "Show todo's with status %p and result %p elements",
     async (status, expectResult) => {
        render(<Home />)

        const todoInput = screen.getByLabelText("Nova Tarefa")
        const button = screen.getByRole("button")

        userEvent.click(todoInput)
        await userEvent.type(todoInput, "Tarefa 1")
        userEvent.click(button)

        userEvent.click(todoInput)
        await userEvent.type(todoInput, "Tarefa 2")
        userEvent.click(button)

        userEvent.click(todoInput)
        await userEvent.type(todoInput, "Tarefa 3")
        userEvent.click(button)

        userEvent.click(todoInput)
        await userEvent.type(todoInput, "Tarefa 4")
        userEvent.click(button)

        userEvent.click(todoInput)
        await userEvent.type(todoInput, "Tarefa 5")
        userEvent.click(button)

        await waitFor(async () => {
            const newTodoOne = screen.getByLabelText("Tarefa 1")
            userEvent.click(newTodoOne) // Change to true

            const newTodoTwo = screen.getByLabelText("Tarefa 2")
            userEvent.click(newTodoTwo) // Change to true

            const selectInput = screen.getByLabelText("Selecione opção de filtro")
            userEvent.selectOptions(selectInput, String(status))

            await waitFor(async () => {
                const todos = screen.getAllByRole("checkbox")

                expect(todos.length).toBe(expectResult)
            })
        })
     }
    )
})