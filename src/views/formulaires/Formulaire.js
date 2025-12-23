import React, { useEffect, useRef, useState } from 'react'
import { getData, getItem } from '../../apiService'

// import { isDate } from 'validator'

const Formulaire = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [questionnaire, setQuestionnaire] = useState([])

  const apiResource = {
    get: 'questionnaires',
    show: 'questionnaires/:id',
    create: 'questionnaires',
    update: 'questionnaires/:id',
    delete: 'questionnaires/:id',
  }

  const fetchGet = async () => {
    try {
      const response = await getData(apiResource.get)
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGet()
  }, [])

  // Save or Send form values
  const handleChange = async (e) => {
    console.log(e.target.value)
    await getItem(apiResource.show.replace(':id', e.target.value)).then((response) => {
      setQuestionnaire(response)
    })
  }

  // Datatable loading...
  if (loading) {
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

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          {/* QUestionnaire */}
          <div className="">
            <label htmlFor="questionnaire" className="form-label mb-0">
              Questionnaire
              {/* <CustomRequired /> */}
            </label>
            <div className="">
              <select
                className="form-select"
                aria-label="Default select example"
                id="questionnaire"
                name="questionnaire"
                onChange={handleChange}
              >
                <option value="">Sélectionner ici !</option>
                {data.map((dat, index) => {
                  return (
                    <option value={dat.id} key={'data-item-' + index}>
                      {index +
                        1 +
                        '. ' +
                        dat.numero +
                        ' du ' +
                        dat.datedebut +
                        ' au ' +
                        dat.datefin}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formulaire
