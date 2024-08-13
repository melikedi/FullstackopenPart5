import { useState } from 'react'
const Blog = ({ blog, handleBlogUpdate, handleBlogDelete, removeButtonVisible }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showDetailVisible = { display: detailsVisible ? '' : 'none' }
  const detailButtonName =  detailsVisible ? 'hide' : 'view'
  const showRemoveButtonVisible = { display: detailsVisible && removeButtonVisible ? '' : 'none' }
  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }
  const handleLikeBlog =() => {
    blog.likes = blog.likes + 1
    handleBlogUpdate(blog)
  }
  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleBlogDelete(blog.id)
    }

  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const titleStyle = {
    fontStyle: 'italic'
  }
  const labelStyle = {
    fontWeight: 'bold'
  }
  return (
    <div data-testid='blogItem' style={blogStyle}>
      <span data-testid='blogTitle' style={titleStyle}>{blog.title}</span> by {blog.author} <button data-testid='viewbutton' onClick={toggleDetailsVisibility}>{detailButtonName}</button>
      <div style={showDetailVisible}><span style={labelStyle}>URL :</span>{blog.url}</div>
      <div style={showDetailVisible}><span style={labelStyle}>Likes :</span> <span className='blogLikes'> {blog.likes} </span> <button data-testid='likebutton' onClick={handleLikeBlog}>like</button></div>
      <div style={showDetailVisible}><span style={labelStyle}>Author :</span>{blog.author}</div>
      <div style={showDetailVisible}><span style={labelStyle}>User :</span>{blog.username}</div>
      <div style={showRemoveButtonVisible}><button data-testid='removebutton' onClick={handleRemoveBlog}>remove</button></div>
    </div>

  )
}

export default Blog