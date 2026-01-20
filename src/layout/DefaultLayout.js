import { AppContent, AppSidebar, AppHeader } from '../components/index'
// import myBackground from '../assets/images/background.jpg'

const DefaultLayout = () => {
  return (
    <div className="defaultLayout-main-container" style={{ backgroundColor: '#fff' }}>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
