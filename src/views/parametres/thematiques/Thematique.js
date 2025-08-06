import ItemList from '../../../components/crud/ItemList'
import ThematiqueCreate from './ThematiqueCreate'

const Thematique = () => {

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé court', data: 'libellecourt' },
    { title: 'Libellé long', data: 'libellelong' },
    { title: 'Code', data: 'code' },
    { title: 'ID', data: 'id' },
  ]

  const apiResource = {
    get: 'thematiques',
    create: 'thematiques',
    read: 'thematiques/',
    update: 'thematiques/',
    delete: 'thematiques/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelleCourt', 'libellecourt'],
    ['libelleLong', 'libellelong'],
    ['code', 'code'],
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
  }

  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<ThematiqueCreate />}
        newRow={newRow}
      />
    </div>
  )
}

export default Thematique
