import { useState } from 'react'

function NewBlogForm(props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title:title, author:author, url:url }
    props.handleBlogAdd(newBlog)
    setTitle('')
    setAuthor('')
    setURL('')
  }
  return(

    <div>
      <h3>Create New</h3>
      <form onSubmit={addBlog}>
        <div>
                    title:
          <input
            type='text'
            value={title}
            name="Title"
            placeholder='title'
            data-testid='Title'
            onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
                    author:
          <input
            type='text'
            value={author}
            name="Author"
            placeholder='author'
            data-testid='Author'
            onChange={(event) => setAuthor(event.target.value)}/>
        </div>
        <div>
                    url:
          <input
            type='text'
            value={url}
            name="URL"
            placeholder='url'
             data-testid='Url'
            onChange={(event) => setURL(event.target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>


    </div>
  )
}
export default NewBlogForm