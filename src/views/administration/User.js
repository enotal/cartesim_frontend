import React, { useEffect, useState } from 'react'
import { FetchGet } from '../../backend/client'

const User = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    FetchGet('users')
      .then((response) => setUsers(response))
      .catch((err) => setError(err))
      .finally(setLoading(false))
  }, [])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
