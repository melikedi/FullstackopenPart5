import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((b1,b2) => { return b2.likes - b1.likes}))
    })
  }, [])
  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedBlogappUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const blogFormRef = useRef()
  const handleBlogAdd = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.createBlog(newBlog)
      savedBlog.username = user.name
      setBlogs(blogs.concat(savedBlog))
      setNotificationMessage({ type:'info',message:`a new blog ${savedBlog.title} by ${savedBlog.author} is added` })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (e) {
      setNotificationMessage({ type:'error',message:e.message })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleBlogUpdate = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate)
      updatedBlog.username = blogToUpdate.username
      setBlogs(blogs.map(b => b.id===updatedBlog.id ? updatedBlog : b).sort((b1,b2) => { return b2.likes - b1.likes}))
    } catch (e) {
      setNotificationMessage({ type:'error',message:e.message })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleBlogDelete = async (id) => {
    try {

      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id!==id).sort((b1,b2) => { return b2.likes - b1.likes}))

    } catch (e) {
      setNotificationMessage({ type:'error',message:e.message })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ type:'error',message:'Wrong credentials' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return(
      <div>
        <Notification notification={notificationMessage}/>
        <LoginForm
          handleLogin = {handleLogin}
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
          username = {username}
          password = {password}
        />
      </div>
    )
  }
  return (

    <div>


      <h2>blogs</h2>
      <Notification notification={notificationMessage}/>
      <p>
        {user.name} logged-in
        <br/>
        <span><button onClick={(() => {
          window.localStorage.clear()
          setUser(null)
        })}>log out</button></span>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlogForm handleBlogAdd = {handleBlogAdd}/>
      </Togglable>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogDelete= {handleBlogDelete} removeButtonVisible = { blog.username === user.name }/>
      )}
    </div>
  )
}

export default App