import { AppContent, AppSidebar, AppHeader } from '../components/index'
// import myBackground from '../assets/images/background.jpg'

const DefaultLayout = ({ auth }) => {
  return (
    <div className="defaultLayout-main-container" style={{ backgroundColor: '#fff' }}>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader auth={auth} />
        <div className="body flex-grow-1">
          <AppContent auth={auth} />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
