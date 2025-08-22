import CustomList from '../../components/crud/CustomList'
import ThematiqueCreate from './ThematiqueCreate'
import { typerepondants } from '../../components/crud/data'

const Thematique = () => {
  const apiResource = {
    get: 'thematiques',
    create: 'thematiques',
    read: 'thematiques/',
    update: 'thematiques/',
    delete: 'thematiques/',
  }

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé long', data: 'libellelong' },
    { title: 'Libellé court', data: 'libellecourt' },
    { title: 'Code', data: 'code' },
    { title: 'Type répondant', data: 'typerepondant' },
  ]

  const credentials = [
    ['id', 'id'],
    ['libelleLong', 'libellelong'],
    ['libelleCourt', 'libellecourt'],
    ['code', 'code'],
    ['typeRepondant', 'typerepondant'],
  ]

  const newRow = {
    id: null,
    libellelong: null,
    libellecourt: null,
    code: null,
    typerepondant: null,
  }

  const showItems = [
    ['Libellé long', 'libellelong'],
    ['Libellé court', 'libellecourt'],
    ['Code', 'code'],
    ['Type de répondant', 'typerepondant'],
  ]

  const dtBtnHide = {
    create: true,
    show: true,
    edit: true,
    delete: true,
  }

  return (
    <div>
      <CustomList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<ThematiqueCreate typerepondants={typerepondants} />}
        newRow={newRow}
        showItems={showItems}
        dtBtnHide={dtBtnHide}
      />
    </div>
  )
}

export default Thematique
