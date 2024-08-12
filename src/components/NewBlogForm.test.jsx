import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
    const handleBlogAdd = vi.fn()
    const user = userEvent.setup()
  
    render(<NewBlogForm handleBlogAdd={handleBlogAdd} />)
  
    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl= screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('create')
  
    await user.type(inputTitle, 'this is title')
    await user.type(inputAuthor, 'this is author')
    await user.type(inputUrl, 'this is url')

    await user.click(sendButton)
  
    expect(handleBlogAdd.mock.calls).toHaveLength(1)
    expect(handleBlogAdd.mock.calls[0][0]).toEqual({
        title: 'this is title',
        author: 'this is author',
        url:'this is url'
    });
    // expect(handleBlogAdd.mock.calls[0][0].content).toBe('testing a form...')
})