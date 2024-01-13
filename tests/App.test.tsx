import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from '@/app/page'

describe("Home Page", () => {
    it("Renderer page", () => {
        render(<Home />)

        const title = screen.getByRole("heading")

        expect(title).toBeInTheDocument()
    })
})