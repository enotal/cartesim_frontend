import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export const CustomIndexAlert = ({ alert }) => {
  return (
    <div className="ms-auto">
      {alert && (
        <span className={`p-1 bg-${alert.type} text-white`}>
          <FontAwesomeIcon icon={alert.type === 'success' ? faCheck : faExclamationTriangle} />
          {alert.message}
        </span>
      )}
    </div>
  )
}
