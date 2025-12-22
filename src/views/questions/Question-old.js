import { useEffect, useState } from 'react'
import { getData } from '../../components/crud/apiService'
import CustomList from '../../components/crud/CustomList'
import QuestionCreate from './QuestionCreate'

const Question = () => {
  const [dimensions, setDimensions] = useState([])
  const [questions, setQuestions] = useState([])

  const apiResource = {
    get: 'questions',
    create: 'questions',
    read: 'questions/',
    update: 'questions/',
    delete: 'questions/',
  }

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Variable', data: 'variable' },
    { title: 'Modalité', data: 'modalite' },
    { title: 'Type Modalité', data: 'typemodalite' },
    { title: 'Déclencheur', data: 'declencheur' },
    { title: 'Dimension', data: 'dimension.libelle' },
  ]

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
    ['variable', 'variable'],
    ['modalite', 'modalite'],
    ['typeModalite', 'typemodalite'],
    ['reponsePredefinie', 'reponsepredefinie'],
    ['declencheur', 'declencheur'],
    ['question', 'parent_id'],
    ['dimension', 'dimension_id'],
  ]

  const newRow = {
    id: null,
    libelle: null,
    variable: null,
    modalite: null,
    typemodalite: null,
    reponsepredefinie: null,
    declencheur: null,
    parent_id: null,
    dimension_id: null,
  }

  const showItems = [
    ['Libellé', 'libelle'],
    ['Variable', 'variable'],
    ['Modalité', 'modalite'],
    ['Type modalité', 'typemodalite'],
    ['Réponse prédéfinie', 'reponsepredefinie'],
    ['Déclencheur', 'declencheur'],
    ['Parent', 'parent_id'],
    ['Dimension', 'dimension_id'],
  ]

  const dtBtnHide = {
    create: true,
    show: true,
    edit: true,
    delete: true,
  }

  const fetchGetDimensions = async () => {
    try {
      const data = await getData('dimensions')
      setDimensions(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchGetQuestions = async () => {
    try {
      const data = await getData('questions')
      setQuestions(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchGetDimensions()
    fetchGetQuestions()
  }, [])

  return (
    <div>
      <CustomList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<QuestionCreate dimensions={dimensions} questions={questions} />}
        newRow={newRow}
        showItems={showItems}
        dtBtnHide={dtBtnHide}
      />
    </div>
  )
}

export default Question
