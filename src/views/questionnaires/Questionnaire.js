import CustomList from '../../components/crud/CustomList'
import QuestionnaireCreate from './QuestionnaireCreate'

const Questionnaire = () => {
  const apiResource = {
    get: 'questionnaires',
    create: 'questionnaires',
    read: 'questionnaires/',
    update: 'questionnaires/',
    delete: 'questionnaires/',
  }

  const columns = [
    { title: null, data: 'select' },
    { title: 'Numéro', data: 'numero' },
    { title: 'Date début', data: 'datedebut' },
    { title: 'Date fin', data: 'datefin' },
    { title: 'Fermé?', data: 'isclosed' },
  ]

  const credentials = [
    ['id', 'id'],
    ['numero', 'numero'],
    ['dateDebut', 'datedebut'],
    ['dateFin', 'datefin'],
    ['consigne', 'consigne'],
    ['isClosed', 'isclosed'],
  ]

  const newRow = {
    id: null,
    numero: null,
    datedebut: null,
    datefin: null,
    consigne: null,
    isclosed: null,
  }

  const showItems = [
    ['Numéro', 'numero'],
    ['Date début', 'datedebut'],
    ['Date fin', 'datefin'],
    ['Consigne', 'consigne'],
    ['Fermé?', 'isclosed'],
  ]

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
        children={<QuestionnaireCreate />}
        newRow={newRow}
        showItems={showItems}
        dtBtnHide={dtBtnHide}
      />
    </div>
  )
}

export default Questionnaire
