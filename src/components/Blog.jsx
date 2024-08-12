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
    <div style={blogStyle}>
      <span style={titleStyle}>{blog.title}</span> by {blog.author} <button onClick={toggleDetailsVisibility}>{detailButtonName}</button>
      <div style={showDetailVisible}><span style={labelStyle}>URL :</span>{blog.url}</div>
      <div style={showDetailVisible}><span style={labelStyle}>Likes :</span>{blog.likes} <button onClick={handleLikeBlog}>like</button></div>
      <div style={showDetailVisible}><span style={labelStyle}>Author :</span>{blog.author}</div>
      <div style={showDetailVisible}><span style={labelStyle}>User :</span>{blog.username}</div>
      <div style={showRemoveButtonVisible}><button onClick={handleRemoveBlog}>remove</button></div>
    </div>

  )
}

export default Blog