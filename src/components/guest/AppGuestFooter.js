import React, { useEffect, useState } from 'react'

const AppGuestFooter = () => {
  const [year, setYear] = useState('2025')
  useEffect(() => {
    let timerId = setInterval(() => {
      setYear('2026')
    }, 2000)
    return () => {
      clearInterval(timerId)
    }
  }, [])
  return (
    <footer className="bg-light text-center py-1 mt-auto fixed-bottom">
      <div className="container">
        <p>&copy;{' ' + year + ' UV-BF - Tous droits réservés.'}</p>
      </div>
    </footer>
  )
}

export default React.memo(AppGuestFooter)
