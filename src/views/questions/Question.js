import React, { useState } from 'react'
import ItemList from '../../components/crud/ItemList'
import QuestionCreate from './QuestionCreate'

const Question = () => {
  const tableAlias = 'usr'

  const columns = [
    { title: null, data: 'select' },
    // { title: null, data: "" },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Modalité', data: 'modalite' },
    { title: 'Déclencheur', data: 'declencheur' },
  ]

  const apiResource = {
    get: 'users',
    create: 'users',
    read: 'users/',
    update: 'users/',
    delete: 'users/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
    ['modalite', 'modalite'],
    ['declencheur', 'declencheur'],
  ]

  const colvisNotVisibleColumns = ':second-child'

  const datatableActionButtons = {
    create: 1,
    show: 0,
    edit: 1,
    delete: 1,
  }

  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await FetchGet("roles");
  //       setData(response);
  //     } catch (err) {
  //       // setError(err);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [data, setData] = useState([
    {
      id: 1,
      libelle: 'Suivi et insertion',
      modalite: 'chiffre',
      declencheur: null,
    },
    {
      id: 2,
      libelle: 'Profil et identité',
      modalite: 'chiffre',
      declencheur: null,
    },
  ])

  const newRow = {
    id: null,
    libelle: null,
    modalite: null,
    declencheur: null,
  }

  const variables = []
  const modalites = []

  return (
    <div>
      <ItemList
        tableAlias={tableAlias}
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<QuestionCreate variables={variables} modalites={modalites} />}
        data={data}
        setData={setData}
        newRow={newRow}
      />
    </div>
  )
}

export default Question
