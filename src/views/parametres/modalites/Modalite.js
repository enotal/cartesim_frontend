import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../backend/serverParams'
import ItemList from '../../../components/crud/ItemList'
import ModaliteCreate from './ModaliteCreate'

const Modalite = () => {

  const columns = [
    { title: null, data: 'select' },
    { title: 'Libellé', data: 'libelle' },
  ]

  const apiResource = {
    get: 'modalites',
    create: 'modalites',
    read: 'modalites/',
    update: 'modalites/',
    delete: 'modalites/',
  }

  const credentials = [
    ['id', 'id'],
    ['libelle', 'libelle'],
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
  }

  const inputChecking = []

  return (
    <div>
      <ItemList
        apiResource={apiResource}
        columns={columns}
        credentials={credentials}
        children={<ModaliteCreate />}
        newRow={newRow}
        inputChecking={inputChecking}
      />
    </div>
  )
}

export default Modalite
