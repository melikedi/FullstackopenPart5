import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog Component Tests', ()=>{
  let container
  const mockLikeHandler = vi.fn()
  const blog= {
    title: 'Test Blog',
    author: 'Test Author',
    url:'www.testblog.com',
    likes:7
  }
  beforeEach(()=>{
    container = render(<Blog blog={blog} handleBlogUpdate={mockLikeHandler} />)
  })
  test('renders title and author but not url and likes', async () => {
    const elementTitle = await screen.findByText(blog.title)
    expect(elementTitle).toBeDefined()
    const elementAuthor = await screen.findByText(blog.author)
    expect(elementAuthor).toBeDefined()
    const elementUrl = screen.queryByText(blog.url)
    expect(elementUrl).toHaveStyle('display: none')
    const elementlikes = screen.queryByText(blog.likes)
    expect(elementlikes).toHaveStyle('display: none')
    // const firstSpan = container.querySelector('span:first-of-type')
    // expect(firstSpan).toHaveTextContent('Test Blog')
    // const element = screen.getByText('Test Blog by Test Author')
    // expect(element).toBeDefined()
  })
  test('clicking view button calls the event handler once and shows url and number of likes', async () =>{
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    const button = screen.getByText('view')
    button.onclick = mockHandler;
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    const elementUrl = await screen.findByText(blog.url)
    expect(elementUrl).toBeDefined()
    const elementlikes = await screen.findByText(blog.likes)
    expect(elementlikes).toBeDefined()
  })
  test('clicking the like button twice calls the event handler send by props twice', async () =>{

    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    await user.click(buttonView)
    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
    // expect(mockHandler.mock.calls).toHaveLength(1)
    // const elementUrl = await screen.findByText(blog.url)
    // expect(elementUrl).toBeDefined()
    // const elementlikes = await screen.findByText(blog.likes)
    // expect(elementlikes).toBeDefined()
  })
})

