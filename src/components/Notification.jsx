const Notification = ({ notification }) => {
  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    padding:10,
    marginBottom:10,
    borderStyle:'solid',
    borderRadius:5,

  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 16,
    padding:10,
    marginBottom:10,
    borderStyle:'solid',
    borderRadius:5,
  }
  if (notification === null) {
    return null
  }
  const style = (notification.type==='info' ? infoStyle : errorStyle)


  return (
    <div className="notification" style={style}>
      {notification.message}
    </div>
  )
}
export default Notification