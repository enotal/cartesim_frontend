import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../backend/serverParams'
import ItemList from '../../../components/crud/ItemList'
import QuestionCreate from './QuestionCreate'

const Question = () => {
  const [variables, setVariables] = useState([])
  const [questions, setQuestions] = useState([])
  const [modalites, setModalites] = useState([])

  const columns = [
    { title: null, data: 'select' },
    // { title: null, data: "" },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Modalité', data: 'modalite' },
    { title: 'Déclencheur', data: 'declencheur' },
    { title: 'Question mère', data: 'question_id' },
    { title: 'Variable', data: 'variable_id' },
  ]

  const apiResource = {
    get: 'questions',
    create: 'questions',
    read: 'questions/',
    update: 'questions/',
    delete: 'questions/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
    ['modalite', 'modalite'],
    ['declencheur', 'declencheur'],
    ['question', 'question_id'],
    ['variable', 'variable_id'],
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
    modalite: null,
    declencheur: null,
    question_id: null,
    variable_id: null,
  }

  const inputChecking = []

  const FetchGetVariables = async () => {
    try {
      const response = await axios.get(baseUrl + 'variables')
      if (response.status !== 200) {
        throw new Error()
      }
      setVariables(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  const FetchGetQuestions = async () => {
    try {
      const response = await axios.get(baseUrl + 'questions')
      if (response.status !== 200) {
        throw new Error()
      }
      setQuestions(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  const FetchGetModalites = async () => {
    try {
      const response = await axios.get(baseUrl + 'modalites')
      if (response.status !== 200) {
        throw new Error()
      }
      setModalites(response.data.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      return 'Error fetching items:', error
    }
  }

  useEffect(() => {
    FetchGetVariables()
    FetchGetQuestions()
    FetchGetModalites()
  }, [])

  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={
          <QuestionCreate variables={variables} questions={questions} modalites={modalites} />
        }
        newRow={newRow}
        inputChecking={inputChecking}
      />
    </div>
  )
}

export default Question
