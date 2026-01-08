import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getData, getItem } from '../../apiService'
import Typerepondant from '../typerepondants/Typerepondant'
import { createItem } from '../../apiService'

import $ from 'jquery'

// import { isDate } from 'validator'

const Formulaire = () => {
  const navigate = useNavigate()
  const formRef = useRef()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [questionnaire, setQuestionnaire] = useState([])
  const [thematiques, setThematiques] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [show, setShow] = useState(false)
  const separator = ', '
  const [dates, setDates] = useState({ datedebut: null, datefin: null })
  const [alert, setAlert] = useState(null)

  const { questionnaireId } = useParams()

  const apiResource = {
    get: 'questionnaires',
    show: 'questionnaires/:id',
    create: 'questionnaires',
    update: 'questionnaires/:id',
    delete: 'questionnaires/:id',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getItem(apiResource.show.replace(':id', questionnaireId))
        if (response.success) {
          const q = response.data[0]
          setShow(true)
          setData(q)
          // Dates de début et de fin
          const dd = q.datedebut !== null ? new Date(q.datedebut) : null
          const df = q.datefin !== null ? new Date(q.datefin) : null
          setDates({
            datedebut: dd !== null ? dd.toLocaleDateString() : dd,
            datefin: df !== null ? df.toLocaleDateString() : df,
          })
          // Thématiques
          const themas = q.thematiques
          setThematiques(themas)
          // Dimensions
          const dimens = themas.map((thema) => thema.dimensions)
          setDimensions(dimens)
          // Variables
          const varias = dimens.map((dimen) => dimen.variables)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fonctions
  const handleRadio = async (e) => {
    const { name, value } = e.target
    await getItem('questions/' + name).then((response) => {
      if (response.length === 1) {
        const resp = response[0]
        const ch = resp.child
        if (ch !== null) {
          const qs = $('input[name="' + ch.id + '"]')
          const qsType = qs.attr('type')
          // Déclencheur = valeur choisie ?
          if (value.trim() === resp.declencheur.trim()) {
            // text, radio, checkbox, select, textarea, ...
            if (qsType === 'text' || qsType === 'radio' || qsType === 'checkbox') {
              qs.prop('disabled', false)
              // qs.focus()
            } else {
              qs.prop('disabled', true)
            }
          } else {
            qs.prop('disabled', true)
          }
        }
      }
    })
  }

  //
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)
    // User ID
    formValues.repondant = 1
    //
    const id = e.target.getAttribute('questionnaire-id')
    console.log(formValues)
    // Use event.nativeEvent.submitter to identify which button was clicked
    const submitterName = e.nativeEvent.submitter.name
    if (submitterName === 'sauvegarder') {
      //
    } else if (submitterName === 'soumettre') {
      const response = await createItem('questionquestionnairerepondants', formValues)
      console.log(response)
      setAlert(response)
      // // Succès
      // if (response.status === 200) {
      //   setCreateAlert(response)
      //   createFormBtnResetRef.current.click()
      // }
      // // Echec
      // if (response.status === 201) {
      //   setCreateAlert(response.data)
      // }
    }
  }
  // ===

  // Datatable loading...
  if (isLoading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border me-2"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: '3rem', height: '3rem', color: '#2e9ed5' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  if (data.length === 0) navigate('/questionnaires', { replace: true })

  return (
    <div className="container bg-info">
      <form
        ref={formRef}
        onSubmit={handleSubmitForm}
        method="POST"
        encType=""
        questionnaire-id={questionnaire.id}
      >ssdfsd</form>
    </div>
  )
}

export default Formulaire
