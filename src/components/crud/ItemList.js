import React, { useState, useEffect, useRef } from 'react'

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

import { FaPlus, FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { CustomAlert } from '../../components/crud/CustomAlert'
import { CreateComponent } from '../../components/crud/CreateComponent'
import { DeleteComponent } from '../../components/crud/DeleteComponent'

const ItemList = ({
  tableAlias,
  apiResource,
  columns,
  credentials,
  children,
  data,
  setData,
  newRow,
}) => {
  const tableRef = useRef()
  const formRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()

  //   const [data, setData] = useState([
  //     {
  //       id: 1,
  //       libellecourt: 'Suivi et insertion',
  //       libellelong: 'Suivi postuniversitaire et insertion socioprofessionnelle',
  //       code: 'T4',
  //     },
  //     {
  //       id: 2,
  //       libellecourt: 'Profil et identité',
  //       libellelong: "Profil et identité de l'étudiant",
  //       code: 'T3',
  //     },
  //   ])
  const [deleteSet, setDeleteSet] = useState([])
  const [formAction, setFormAction] = useState(null)

  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        data: data,
        // deferRender: true,
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
        columnDefs: [
          { targets: '_all', orderable: false },
          {
            targets: 0,
            searchable: false,
            render: $(tableRef.current).DataTable.render.select(),
            className: 'select-checkbox',
            // width: "50px",
          },
        ],
        // select: true,
        select: {
          info: false,
          style: 'multi',
          selector: 'td:first-child',
          // selector: 'td:nth-child(2)'
        },

        layout: {
          top1Start: {
            buttons: [
              {
                text: `<i class="fa fa-plus me-1" aria-hidden="true"></i>`,
                className: 'datatable-button rounded btnCreate btn-primary me-1',
                enabled: true,
                action: function (e, dt, node, config, cb) {
                  setFormAction('create')
                  setAlert(null)
                  if (createFormBtnLaunchRef.current) {
                    createFormBtnLaunchRef.current.click()
                  }
                },
                width: '50px',
              },
              {
                text: `<i class="fa fa-edit me-1" aria-hidden="true"></i>`,
                className: 'datatable-button rounded btnEdit btn-info me-1',
                enabled: false,
                action: function (e, dt, node, config, cb) {
                  var row = dt.rows({ selected: true }).data()
                  if (row.count() !== 1) {
                    return null
                  }
                  setFormAction('update')
                  setAlert(null)
                  // does object exist ?
                  for (var i = 0; i < credentials.length; i++) {
                    var obj = $('#' + credentials[i][0])
                    if (obj.length && row[0][credentials[i][1]]) {
                      obj.val(row[0][credentials[i][1]])
                    }
                  }
                  if (createFormBtnLaunchRef.current) {
                    createFormBtnLaunchRef.current.click()
                  }
                },
                width: '50px',
              },
              {
                text: `<i class="fa fa-eye me-1" aria-hidden="true"></i>`,
                className: 'datatable-button rounded btnShow btn-warning me-1',
                enabled: false,
                action: function (e, dt, node, config, cb) {
                  // setFormAction("show");
                  // createFormLaunchBtnRef.current.click();
                },
                width: '50px',
              },
              {
                text: `<i class="fa fa-trash me-1" aria-hidden="true"></i>`,
                className: 'datatable-button rounded btnDelete btn-danger',
                enabled: false,
                action: function (e, dt, node, config, cb) {
                  setFormAction('delete')
                  setAlert(null)
                  var sr = dt.rows({ selected: true }).data()
                  if (sr.count() < 1) {
                    return null
                  }
                  // setDeleteSet(sr);
                  if (deleteFormBtnLaunchRef.current) {
                    deleteFormBtnLaunchRef.current.click()
                  }
                },
                width: '50px',
              },
            ],
          },
          top1End: {
            buttons: [
              {
                extend: 'csv',
                text: '<i class="fa fa-file-text" aria-hidden="true"></i>',
                titleAttr: 'CSV',
                className: 'datatable-export-button rounded',
                // filename: tableTitle,
                exportOptions: {},
              },
              // {
              //   extend: "excel",
              //   text: '<i class="fa fa-file-text" aria-hidden="true"></i>',
              //   titleAttr: "Excel",
              //   className: "datatable-export-button rounded",
              //   // filename: tableTitle,
              //   exportOptions: {},
              // },
              {
                extend: 'pdf',
                text: '<i class="fa fa-file-pdf" aria-hidden="true"></i>',
                titleAttr: 'PDF',
                className: 'datatable-export-button ms-1 rounded',
                // filename: tableTitle,
                download: 'open',
                exportOptions: {
                  modifier: {
                    page: 'current',
                  },
                },
              },
              {
                extend: 'print',
                text: '<i class="fa fa-print" aria-hidden="true"></i>',
                titleAttr: 'Imprimer',
                className: 'datatable-export-button mx-1 rounded',
                // filename: tableTitle,
                exportOptions: {},
              },
              {
                extend: 'colvis',
                text: 'Filtrer par colonne',
                className: 'datatable-export-button rounded',
                align: 'button-right',
                columns: `:visible :not(:first-child)`,
                // exclude: [0],
                exportOptions: {},
              },
            ],
          },
        },
      })
    }

    // === DATATABLE ACTIONS : create, show, edit, delete
    $('#myTable')
      .DataTable()
      // .off("select deselect")
      .on('select deselect', function (e, dt, type, indexes) {
        var selectedRowsCount = dt.rows({ selected: true }).count()
        setDeleteSet(dt.rows({ selected: true }).data())
        dt.buttons(['.btnCreate']).enable(selectedRowsCount === 0)
        dt.buttons(['.btnShow']).enable(selectedRowsCount === 1)
        dt.buttons(['.btnEdit']).enable(selectedRowsCount === 1)
        dt.button(['.btnDelete']).enable(selectedRowsCount > 0)
      })
  }, [data, columns])

  // === CREATE MODAL
  // Cancel
  const handleCancelCreateForm = (e) => {
    if (formAction === 'update') {
      $(tableRef.current).DataTable().rows({ selected: true }).deselect()
    }
    if (createFormBtnResetRef.current) {
      createFormBtnResetRef.current.click()
    }
    if (createFormBtnCloseRef.current) {
      createFormBtnCloseRef.current.click()
    }
  }

  //   Submit
  const handleSubmitCreateForm = async (e) => {
    e.preventDefault() // Prevents page reload
    setAlert(null)
    // get and prepare files
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)

    for (var i = 0; i < credentials.length; i++) {
      if (credentials[i][0] !== 'id') {
        newRow[credentials[i][1]] = formValues[credentials[i][0]]
      }
    }

    // envoi des données à l'API
    if (formAction === 'create') {
      newRow.id = data.length + 1
      const LengthBefore = data.length
      setData([...data, newRow]) // Use spread operator to create a new array
      if (newRow.id > LengthBefore) {
        setAlert({ type: 'success', action: 'create' })
        if (createFormBtnResetRef.current) {
          createFormBtnResetRef.current.click()
        }
      } else {
        setAlert({ type: 'danger', action: 'create' })
      }
    }

    if (formAction === 'update') {
      const editingRowId = $(tableRef.current).DataTable().rows({ selected: true }).data()[0].id
      newRow.id = editingRowId
      setData(data.map((row) => (row.id === editingRowId ? newRow : row)))
      setAlert({ type: 'success', action: 'update' })
      handleCancelCreateForm()
    }
  }
  //===

  // === DELETE MODAL
  // Cancel
  const handleCancelDeleteForm = (e) => {
    setDeleteSet([])
    if (tableRef.current) {
      $(tableRef.current).DataTable().rows({ selected: true }).deselect()
    }
    if (deleteFormBtnCloseRef.current) {
      deleteFormBtnCloseRef.current.click()
    }
  }
  //   Submit
  const handleSubmitDeleteForm = async (e) => {
    e.preventDefault() // Prevents page reload
    setAlert(null)
    // récupération des id
    var response = null
    var deleted = []
    deleted = $(tableRef.current).DataTable().rows({ selected: true }).data()
    console.log(deleted)
    // Filter out the row with the matching id
    const updatedData = data.filter((row) => deleted.find(row.id))
    // Update the state with the new array
    setData(updatedData)

    // envoi des données à l'API
    if (updatedData.length === data.length) {
      setAlert({ type: 'danger', action: 'delete' })
    } else {
      setAlert({ type: 'success', action: 'delete' })
    }
    handleCancelDeleteForm()
  }
  // ===

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
    <div className="table-responsive p-2">
      <div className="" style={{ height: '30px' }}>
        {formAction === 'delete' || formAction === 'update' ? <CustomAlert alert={alert} /> : ''}
      </div>
      <table
        ref={tableRef}
        id="myTable"
        className="display table table-sm table-striped table-hover myDatatable"
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
      </table>

      {/* CreateForm component */}
      {children && (
        <CreateComponent
          formRef={formRef}
          formAction={formAction}
          createFormBtnLaunchRef={createFormBtnLaunchRef}
          createFormBtnCloseRef={createFormBtnCloseRef}
          createFormBtnResetRef={createFormBtnResetRef}
          onHandleSubmitCreateForm={handleSubmitCreateForm}
          onHandleCancelCreateForm={handleCancelCreateForm}
          alert={alert}
          children={children}
        />
      )}

      {/* DeleteForm component */}
      {deleteSet.length > 0 && (
        <DeleteComponent
          deleteFormBtnLaunchRef={deleteFormBtnLaunchRef}
          deleteFormBtnCloseRef={deleteFormBtnCloseRef}
          onHandleSubmitDeleteForm={handleSubmitDeleteForm}
          onHandleCancelDeleteForm={handleCancelDeleteForm}
          deleteSet={deleteSet}
        />
      )}
    </div>
  )
}

export default ItemList
