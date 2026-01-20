import React from 'react'
import { CFooter } from '@coreui/react'
import { isAuthenticated } from '../authService'

const AppFooter = () => {
  const isLoggedIn = isAuthenticated()
  const [year, setYear] = useState('2025')
  useEffect(() => {
    let timerId = setInterval(() => {
      setYear('2026')
    }, 2000)
    return () => {
      clearInterval(timerId)
    }
  }, [])
  if (!isLoggedIn) {
    return (
      <CFooter className="px-4 align-items-center justify-content-center border-0 opacity-75">
        <div className="container">
          <p>&copy;{' ' + year + ' UV-BF - Tous droits réservés.'}</p>
        </div>
      </CFooter>
    )
  }
}

export default React.memo(AppFooter)
