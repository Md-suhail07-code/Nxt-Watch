import React, { useState, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  // 1. Convert state to useState hooks
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  // 2. Event Handlers
  const onChangeUsername = useCallback(event => {
    setUsername(event.target.value)
  }, [])

  const onChangePassword = useCallback(event => {
    setPassword(event.target.value)
  }, [])

  const showPassword = useCallback(() => {
    setShowPass(prevShowPass => !prevShowPass)
  }, [])

  // 3. Login Success/Failure Handlers
  const onSubmitSuccess = useCallback((jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    // FIX 3: Use navigate.replace() instead of history.replace()
    navigate('/', { replace: true }) 
  }, [navigate])

  const onSubmitFailure = useCallback((errorMsg) => {
    console.log(errorMsg)
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }, [])

  // 4. Submission Logic (No changes needed here)
  const submitForm = useCallback(async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }, [username, password, onSubmitSuccess, onSubmitFailure])

  // 5. Render Helper Functions (No changes needed here)

  const renderPasswordField = () => {
    const inputType = showPass ? 'text' : 'password'
    return (
      <>
        <label htmlFor="password" className="text-gray-600 text-xs font-semibold mb-1 uppercase">
          PASSWORD
        </label>
        <input
          type={inputType}
          id="password"
          className="p-3 border border-gray-300 rounded-md outline-none text-gray-800 text-sm focus:border-blue-500 transition duration-300"
          value={password}
          onChange={onChangePassword}
        />
        <div className="flex items-center mt-1">
          <input
            onChange={showPassword}
            type="checkbox"
            id="showPass"
            className="w-4 h-4 mr-2 cursor-pointer"
          />
          <label htmlFor="showPass" className="text-sm text-gray-800 cursor-pointer">
            Show Password
          </label>
        </div>
      </>
    )
  }

  const renderUsernameField = () => {
    return (
      <>
        <label htmlFor="username" className="text-gray-600 text-xs font-semibold mb-1 uppercase">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="p-3 border border-gray-300 rounded-md outline-none text-gray-800 text-sm focus:border-blue-500 transition duration-300"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    )
  }

  // FIX 4: Replace <Redirect to="/" /> with <Navigate to="/" replace={true} />
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
      <div className="flex flex-col items-center bg-white shadow-xl p-10 w-full max-w-sm sm:max-w-md rounded-lg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="h-10 w-auto mb-8"
          alt="website logo"
        />
        <form className="w-full" onSubmit={submitForm}>
          <div className="flex flex-col mb-5 w-full">{renderUsernameField()}</div>
          <div className="flex flex-col mb-5 w-full">{renderPasswordField()}</div>
          <button type="submit" className="bg-blue-600 text-white p-3 font-bold rounded-lg w-full cursor-pointer mt-3 transition duration-300 hover:bg-blue-700">
            Login
          </button>
          {showSubmitError && <p className="text-red-600 text-sm mt-3">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login