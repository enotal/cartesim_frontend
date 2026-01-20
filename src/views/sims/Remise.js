import React, { useEffect, useState, useRef } from 'react'

import 'jquery'
import $ from 'jquery'
import 'datatables.net-bs5'
import 'datatables.net-select'
import 'datatables.net-buttons'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.html5.min.js'
import 'datatables.net-buttons/js/buttons.print.min.js'
import 'datatables.net-buttons/js/buttons.colVis.min.js'
import 'pdfmake'
import 'pdfmake/build/vfs_fonts'
import language from 'datatables.net-plugins/i18n/fr-FR.json'
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.css'
import 'datatables.net-buttons-bs5/js/buttons.bootstrap5.js'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'datatables.net-bs5/js/dataTables.bootstrap5.js'

import { getData, getItem, createItem, updateItem, deleteItem, getItemBy } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { CustomCreateAlert } from '../../components/CustomCreateAlert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

const Remise = () => {
  const tableRef = useRef()
  const tableDemandeRef = useRef()
  const createFormRef = useRef()
  const deleteFormRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()

  // const showModalBtnLaunchRef = useRef()

  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()

  const importFormRef = useRef()
  const importFormBtnLaunchRef = useRef()
  const importFormBtnCloseRef = useRef()
  const importFormBtnResetRef = useRef()

  const attributeFormRef = useRef()
  const attributeFormBtnLaunchRef = useRef()
  const attributeFormBtnCloseRef = useRef()
  const attributeFormBtnResetRef = useRef()

  const dissocierFormRef = useRef()
  const dissocierFormBtnLaunchRef = useRef()
  const dissocierFormBtnCloseRef = useRef()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [indexAlert, setIndexAlert] = useState(null)
  const [createAlert, setCreateAlert] = useState(null)
  const [createFormAction, setCreateFormAction] = useState(null)

  const [sims, setSims] = useState([])
  const [demandes, setDemandes] = useState([])
  const [regions, setRegions] = useState([])

  const [delay, SetDelay] = useState(2000)

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'NUMERO', data: 'simnumero' },
    { title: 'CODE', data: 'simcode' },
    {
      title: 'REPONDANT',
      data: null,
      render: (data, type, row) => {
        return row.demande ? (row.demande.repondant ? 'er' : 'er') : ''
      },
    },
    {
      title: 'DATE REMISE',
      data: null,
      render: (data, type, row) => {
        const d = row.simdateremise !== null ? new Date(row.simdateremise) : null
        return d !== null ? d.toLocaleDateString() : ''
      },
    },
    {
      title: 'ACTIONS',
      data: null,
      render: (data, type, row) => {
        const btn =
          row.dateremise !== null
            ? `<a class="btn btn-outline-primary me-1 tableActionBtn tableActionBtnRemiseItem" href="#" data-id="${row.id}" title="Remettre"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>`
            : `<a class="btn btn-outline-danger me-1 tableActionBtn tableActionBtnLibererItem" href="#" data-id="${row.id}" title="Libérer"><i class="fa fa-clos" aria-hidden="true"></i></a>`
        return `<div class="d-flex">${btn}</div>`
      },
    },
  ]

  const fetchGet = async () => {
    await getData('sims/remises')
      .then((response) => {
        setData(response)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // let timerId = setInterval(() => {
    fetchGet()
    // }, delay)
    // return () => {
    //   clearInterval(timerId)
    // }
  }, [])

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        data: data,
        columns: columns,
        responsive: true,
        destroy: true,
        fixedHeader: true,
        scrollCollapse: true,
        scroller: true,
        // scrollY: 800,
        paging: true,
        info: true,
        autoWidth: true,
        language,
        columnDefs: [{ targets: '_all', orderable: false }],
        select: false,
      })
    }

    // === DATATABLE ACTIONS : create, show, edit, delete
    $('#myTable')
      .DataTable()
      // .off("select deselect")
      .on('select deselect', function (e, dt, type, indexes) {
        var selectedRowsCount = dt.rows({ selected: true }).count()
        dt.buttons(['.btnCreate']).enable(selectedRowsCount === 0)
        dt.buttons(['.btnShow']).enable(selectedRowsCount === 1)
        dt.buttons(['.btnEdit']).enable(selectedRowsCount === 1)
        dt.button(['.btnDelete']).enable(selectedRowsCount > 0)
      })
  }, [data, columns])

  // Actions

  const handleSubmitAttributeForm = async (e) => {
    e.preventDefault()
    // récupération des données de la liste
    if (attributeFormRef.current && attributeFormBtnCloseRef.current) {
      const formData = new FormData(attributeFormRef.current)
      const formValues = Object.fromEntries(formData)
      const data = excelData.filter((_, index) => index > 0)
      const response = await createItem('sims/attribuer/regions', formValues)
      // if (response.success) {
      //   if (attributeFormRef.current && attributeFormBtnCloseRef.current) {
      //     attributeFormBtnCloseRef.current.click()
      //   }
      // }
      setIndexAlert(response)
      fetchGet()
    }
  }
  // ===

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
      <div className="row">
        <div className="col-md-12 offset-md-0">
          {/* List */}
          <div className="table-responsive p-2">
            <CustomIndexAlert alert={indexAlert} />
            <table
              ref={tableRef}
              id="myTable"
              className="display table table-sm table-striped table-hover myDatatable"
            ></table>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default Remise
