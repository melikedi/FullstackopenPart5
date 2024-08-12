import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogs = response.data
  blogs.forEach(element => {
    element.username = element.user.name
  })
  return (blogs)
}
const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return(response.data)
}
const updateBlog = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
  return(response.data)
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return(response.data)
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }