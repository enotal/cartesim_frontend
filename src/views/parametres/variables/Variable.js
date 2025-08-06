import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../backend/serverParams'
import ItemList from '../../../components/crud/ItemList'
import VariableCreate from './VariableCreate'

const Variable = () => {
  const [dimensions, setDimensions] = useState([])

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Dimension', data: 'dimension_id' },
  ]

  const apiResource = {
    get: 'variables',
    create: 'variables',
    read: 'variables/',
    update: 'variables/',
    delete: 'variables/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
    ['dimension', 'dimension_id'],
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
    libelle: null,
    dimension_id: null,
  }

  const inputChecking = []

  const FetchGetDimensions = async () => {
    try {
      const response = await axios.get(baseUrl + 'dimensions')
      if (response.status !== 200) {
        throw new Error()
      }
      setDimensions(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  useEffect(() => {
    FetchGetDimensions()
  }, [])

  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<VariableCreate dimensions={dimensions} />}
        newRow={newRow}
        inputChecking={inputChecking}
      />
    </div>
  )
}

export default Variable
