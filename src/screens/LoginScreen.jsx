import React from 'react'
import FormContainer from '../components/common/FormContainer'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
  return (
    <>
    <FormContainer>
    <h1 className="text-2xl font-bold mb-4">Sign In</h1>

<form onSubmit=''>
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      className="mt-1 p-2 border border-gray-300 rounded w-full"
      placeholder="Enter email"
      value="{email}"
    //   onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      type="password"
      id="password"
      className="mt-1 p-2 border border-gray-300 rounded w-full"
      placeholder="Enter password"
      value='{password}'
    //   onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <button
    disabled="{isLoading}"
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Sign In
  </button>

  {/* {isLoading && <Loader />} Assuming you have a Loader component */}

</form>

<div className="py-3">
  <p className="text-gray-800">
    New Customer?{' '}
    <Link
    to={'/register'}
      className="text-blue-500 hover:underline"
    >
      Register
    </Link>
  </p>
</div>
    </FormContainer>
    </>
  )
}

export default LoginScreen