import { useState, useEffect } from 'react'
import { getData } from '../../components/crud/apiService'
import CustomList from '../../components/crud/CustomList'
import DimensionCreate from './DimensionCreate'

const Dimension = () => {
  const [thematiques, setThematiques] = useState([])
  const [typerepondants, setTyperepondants] = useState([])

  const apiResource = {
    get: 'dimensions',
    create: 'dimensions',
    read: 'dimensions/',
    update: 'dimensions/',
    delete: 'dimensions/',
  }

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Thématique', data: 'thematique.libellelong' },
  ]

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
    ['thematique', 'thematique_id'],
  ]

  const newRow = {
    id: null,
    libelle: null,
    thematique_id: null,
  }

  const showItems = [
    ['Libellé', 'libelle'],
    ['Thématique', 'thematique.libellelong'],
  ]

  const dtBtnHide = {
    create: true,
    show: true,
    edit: true,
    delete: true,
  }

  const fetchGetThematiques = async () => {
    try {
      const data = await getData('thematiques')
      setThematiques(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchGetThematiques()
  }, [])

  return (
    <div>
      <CustomList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<DimensionCreate thematiques={thematiques} />}
        newRow={newRow}
        showItems={showItems}
        dtBtnHide={dtBtnHide}
      />
    </div>
  )
}

export default Dimension
