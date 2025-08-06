import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../backend/serverParams'
import ItemList from '../../../components/crud/ItemList'
import DimensionCreate from './DimensionCreate'

const Dimension = () => {
  const [thematiques, setThematiques] = useState([])
  const [typerepondants, setTyperepondants] = useState([])

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé court', data: 'libellecourt' },
    { title: 'Libellé long', data: 'libellelong' },
    { title: 'Code', data: 'code' },
    { title: 'Type répondant', data: 'typerepondant' },
    { title: 'Thématique', data: 'thematiqueLibellecourt' },
  ]

  const apiResource = {
    get: 'dimensions',
    create: 'dimensions',
    read: 'dimensions/',
    update: 'dimensions/',
    delete: 'dimensions/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelleCourt', 'libellecourt'],
    ['libelleLong', 'libellelong'],
    ['code', 'code'],
    ['typeRepondant', 'typerepondant'],
    ['thematique', 'thematique_id'],
  ]

  const colvisNotVisibleColumns = ':second-child'

  const datatableActionButtons = {
    create: 1,
    show: 0,
    edit: 1,
    delete: 1,
  }

  const newRow = {
    id: null,
    libellecourt: null,
    libellelong: null,
    code: null,
    typerepondant: null,
  }

  const inputChecking = [{ from: 'typeRepondant', to: 'typeRepondant[]' }]

  const FetchGetThematiques = async () => {
    try {
      const response = await axios.get(baseUrl + 'thematiques')
      if (response.status !== 200) {
        throw new Error()
      }
      setThematiques(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  const FetchGetTyperepondants = async () => {
    try {
      const response = await axios.get(baseUrl + 'typerepondants')
      if (response.status !== 200) {
        throw new Error()
      }
      setTyperepondants(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  useEffect(() => {
    FetchGetThematiques()
    FetchGetTyperepondants()
  }, [])

  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<DimensionCreate thematiques={thematiques} typerepondants={typerepondants} />}
        newRow={newRow}
        inputChecking={inputChecking}
      />
    </div>
  )
}

export default Dimension
