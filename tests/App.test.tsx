import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from '@/app/page'


describe("Home Page", () => {
    it("Renderer page without to-do on list", () => {
        render(<Home />)

        const emptyText = screen.getByText("Lista de tarefas está vazia!")

        expect(emptyText).toBeInTheDocument()
    })

    it("Add new to-do on list", async () => {
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
            const newTodo = screen.getByText("Tarefa 1")

            userEvent.click(newTodo)

            await waitFor(async () => {
                expect(newTodo).toBeChecked()
            })
        })
    })
})