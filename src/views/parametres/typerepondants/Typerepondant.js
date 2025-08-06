import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../backend/serverParams'
import ItemList from '../../../components/crud/ItemList'
import TyperepondantCreate from './TyperepondantCreate'

const Typerepondant = () => {
  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé', data: 'libelle' },
    { title: 'Code', data: 'code' },
  ]

  const apiResource = {
    get: 'typerepondants',
    create: 'typerepondants',
    read: 'typerepondants/',
    update: 'typerepondants/',
    delete: 'typerepondants/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
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
    libelle: null,
    code: null,
  }

  const inputChecking = []


  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<TyperepondantCreate />}
        newRow={newRow}
        inputChecking={inputChecking}
      />
    </div>
  )
}

export default Typerepondant
