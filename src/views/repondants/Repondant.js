import CustomList from '../../components/crud/CustomList'
import RepondantCreate from './RepondantCreate'
import { typerepondants } from '../../components/crud/data'

const Repondant = () => {
  const apiResource = {
    get: 'repondants',
    create: 'repondants',
    read: 'repondants/',
    update: 'repondants/',
    delete: 'repondants/',
  }

  const columns = [
    { title: null, data: 'select' },
    { title: 'Identifiant', data: 'identifiant' },
    { title: 'Type', data: 'typerepondant' },
  ]

  const credentials = [
    ['id', 'id'],
    ['identifiant', 'identifiant'],
    ['typeRepondant', 'typerepondant'],
  ]

  const newRow = {
    id: null,
    identifiant: null,
    typerepondant: null,
  }

  const showItems = []

  const dtBtnHide = {
    create: true,
    show: false,
    edit: true,
    delete: true,
  }

  return (
    <div>
      <CustomList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<RepondantCreate typerepondants={typerepondants} />}
        newRow={newRow}
        showItems={showItems}
        dtBtnHide={dtBtnHide}
      />
    </div>
  )
}

export default Repondant
