import React, { useEffect, useState } from 'react'
import { FetchGet } from '../../backend/client'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    FetchGet('users')
      .then((response) => console.log(response))
      .catch((err) => setError(err))
      .finally(setLoading(false))
  }, [])

  /* const handleAddItem = async () => {
        try {
            await axios.post('http://localhost:3001/api/items', {
                name: newItemName,
                description: newItemDescription,
            });
            setNewItemName('');
            setNewItemDescription('');
            fetchItems(); // Refresh the list
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };*/

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users') // Replace with your server URL
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array means this runs once on mount
*/
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
