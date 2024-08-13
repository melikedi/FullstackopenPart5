import PropTypes from 'prop-types'
function LoginForm(props) {
  return(

    <div>
      <h3>Please Login</h3>
      <form onSubmit={props.handleLogin}>
        <div>
                    username:
          <input
            type='text'
            value={props.username}
            name="Username"
            data-testid='Username'
            onChange={props.handleUsernameChange}/>
        </div>
        <div>
                    password:
          <input
            type='text'
            value={props.password}
            name="Password"
            data-testid='Password'
            onChange={props.handlePasswordChange}/>
        </div>
        <button data-testid='Login' type='submit'>login</button>
      </form>


    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm