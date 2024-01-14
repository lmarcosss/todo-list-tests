import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from '@/app/page'
import { FilterStatusEnum } from '@/enums'

const cases = [[FilterStatusEnum.COMPLETED, 2], [FilterStatusEnum.NOT_COMPLETED, 3], [FilterStatusEnum.ALL, 5]]

const addNewTodo = async (newTodo: string) => {
    const todoInput = screen.getByLabelText("Nova Tarefa")
        userEvent.click(todoInput)

        await userEvent.type(todoInput, newTodo)

        const button = screen.getByRole("button")

        userEvent.click(button)
}

describe("Home Page:", () => {
    it("Renderer page without todo's on list", () => {
        render(<Home />)

        const emptyText = screen.getByText("Lista de tarefas está vazia!")

        expect(emptyText).toBeInTheDocument()
    })

    it("Add new todo on list", async () => {
        render(<Home />)

        await addNewTodo("Tarefa 1")

        await waitFor(() => {
            const newTodo = screen.getByText("Tarefa 1")
            expect(newTodo).toBeInTheDocument()
        })
    })

    it("Change isChecked of new todo to true", async () => {
        render(<Home />)

        await addNewTodo("Tarefa 1")

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

        await addNewTodo("Tarefa 1")

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

        await addNewTodo("Tarefa 1")
        await addNewTodo("Tarefa 2")
        await addNewTodo("Tarefa 3")
        await addNewTodo("Tarefa 4")
        await addNewTodo("Tarefa 5")

        await waitFor(async () => {
            const newTodoOne = screen.getByLabelText("Tarefa 1")
            userEvent.click(newTodoOne) // Change to true

            const newTodoTwo = screen.getByLabelText("Tarefa 2")
            userEvent.click(newTodoTwo) // Change to true

            const selectInput = screen.getByRole("combobox")

            userEvent.selectOptions(selectInput, String(status))

            await waitFor(async () => {
                const todos = screen.getAllByRole("checkbox")

                expect(todos.length).toBe(expectResult)
            })
        })
     }
    )
})