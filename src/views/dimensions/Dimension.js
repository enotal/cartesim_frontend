import React, { useState } from 'react'
import ItemList from '../../components/crud/ItemList'
import DimensionCreate from './DimensionCreate'

const Dimension = () => {
  const tableAlias = 'usr'

  const columns = [
    { title: null, data: 'select' },
    // { title: null, data: "" },
    { title: 'Libellé court', data: 'libellecourt' },
    { title: 'Libellé long', data: 'libellelong' },
    { title: 'Code', data: 'code' },
    { title: 'Type répondant', data: 'typerepondant' },
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
    ['libelleCourt', 'libellecourt'],
    ['libelleLong', 'libellelong'],
    ['code', 'code'],
    ['typeRepondant', 'typerepondant'],
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
      libellecourt: 'Suivi et insertion',
      libellelong: 'Suivi postuniversitaire et insertion socioprofessionnelle',
      code: 'T4',
      typerepondant: 'étudiant,enseignant',
    },
    {
      id: 2,
      libellecourt: 'Profil et identité',
      libellelong: "Profil et identité de l'étudiant",
      code: 'T3',
      typerepondant: 'personnel ATOS',
    },
  ])

  const newRow = {
    id: null,
    libellecourt: null,
    libellelong: null,
    code: null,
    typerepondant: null,
  }

  return (
    <div>
      <ItemList
        tableAlias={tableAlias}
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<DimensionCreate />}
        data={data}
        setData={setData}
        newRow={newRow}
      />
    </div>
  )
}

export default Dimension
