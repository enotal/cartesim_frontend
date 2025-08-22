import React, { useEffect, useState, useRef } from 'react'
import { getData, createItem, updateItem, deleteItem } from './apiService'

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

import { CustomAlert } from './CustomAlert'
import { CustomCreate } from './CustomCreate'
import CustomShow from './CustomShow'
import { CustomDelete } from './CustomDelete'

const CustomList = ({
  apiResource,
  columns,
  credentials,
  children,
  newRow,
  showItems,
  dtBtnHide,
}) => {
  const tableRef = useRef()
  const formRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const showModalBtnLaunchRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [deleteSet, setDeleteSet] = useState([])
  const [formAction, setFormAction] = useState(null)

  const [alert, setAlert] = useState(null)

  const [itemToShow, setItemToShow] = useState([])

  const fetchGet = async () => {
    try {
      const data = await getData(apiResource.get)
      setData(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGet()
  }, [])

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
          // selector: 'td:first-child',
          // blurable: true,
        },

        layout: {
          top1Start: {
            buttons: [
              {
                text: `<i class="fa fa-plus me-1" aria-hidden="true"></i>`,
                className: 'dt-btn datatable-button rounded btnCreate btn-primary me-1',
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
                className: 'dt-btn datatable-button rounded btnEdit me-1',
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
                    var obj = $('[name="' + credentials[i][0] + '"]')
                    var objType = obj.attr('type')
                    if (obj.length && row[0][credentials[i][1]]) {
                      // input = {text, date, tel, checkbox, radio}, textarea, select
                      if (obj.is('input') || obj.is('select')) {
                        // input = {text, date, tel}
                        if (objType != 'checkbox' && objType != 'radio') {
                          obj.val(row[0][credentials[i][1]])
                        } else {
                          for (let j = 0; j < obj.length; j++) {
                            if (obj[j].value === row[0][credentials[i][1]]) {
                              obj[j].checked = true
                            }
                          }
                        }
                      }
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
                className: `dt-btn datatable-button rounded btnShow me-1 ${dtBtnHide && dtBtnHide.show ? 'd-block' : 'd-none'}`,
                enabled: false,
                action: function (e, dt, node, config, cb) {
                  setFormAction(null)
                  setAlert(null)
                  var row = dt.rows({ selected: true }).data()
                  if (row.count() !== 1) {
                    return null
                  }
                  // does object exist ?
                  var item = showItems
                  for (var i = 0; i < showItems.length; i++) {
                    let result = showItems[i][1].split('.')
                    if (result.length < 2) {
                      if (row[0][showItems[i][1]]) {
                        item[i][1] = row[0][showItems[i][1]]
                      }
                    } else {
                      // Exemple : thematique.libellelong
                      if (row[0][result[0]]) {
                        item[i][1] = row[0][result[0]][result[1]]
                      }
                    }
                  }
                  setItemToShow(item)
                  if (showModalBtnLaunchRef.current) {
                    showModalBtnLaunchRef.current.click()
                  }
                },
                width: '50px',
              },
              {
                text: `<i class="fa fa-trash me-1" aria-hidden="true"></i>`,
                className: 'dt-btn datatable-button rounded btnDelete',
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
                className: 'dt-btn datatable-export-button rounded',
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
                className: 'dt-btn datatable-export-button ms-1 rounded',
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
                className: 'dt-btn datatable-export-button mx-1 rounded',
                // filename: tableTitle,
                exportOptions: {},
              },
              {
                extend: 'colvis',
                text: 'Filtrer par colonne',
                className: 'dt-btn datatable-export-button rounded',
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

    // récupération des données du formulaire
    const formData = new FormData(formRef.current)
    const formValues = Object.fromEntries(formData)

    for (var i = 0; i < credentials.length; i++) {
      if (credentials[i][0] !== 'id') {
        newRow[credentials[i][1]] = formValues[credentials[i][0]]
      }
    }

    // envoi des données à l'API
    // création
    if (formAction === 'create') {
      try {
        const response = await createItem(apiResource.create, newRow)
        fetchGet()
        setAlert({ type: 'success', action: 'create' })
        if (createFormBtnResetRef.current) {
          createFormBtnResetRef.current.click()
        }
      } catch (error) {
        console.error('Error fetching items:', error)
        setAlert({ type: 'danger', action: 'create' })
      }
    }

    // mise à jour
    if (formAction === 'update') {
      const editingRowId = $(tableRef.current).DataTable().rows({ selected: true }).data()[0].id
      newRow.id = editingRowId

      try {
        const response = await updateItem(apiResource.update, editingRowId, newRow)
        fetchGet()
        setAlert({ type: 'success', action: 'update' })
        handleCancelCreateForm()
      } catch (error) {
        console.error('Error fetching items:', error)
        setAlert({ type: 'danger', action: 'update' })
      }
    }
  }
  //===

  // === SHOW MODAL
  const handleCloseShowForm = (e) => {
    if (tableRef.current) {
      $(tableRef.current).DataTable().rows({ selected: true }).deselect()
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
  const handleSubmitDeleteForm = async (event) => {
    event.preventDefault() // Prevents page reload
    setAlert(null)

    // récupération des id
    var response = null
    var selectedRowsIds = []
    selectedRowsIds = $(tableRef.current)
      .DataTable()
      .rows({ selected: true })
      .data()
      .pluck('id')
      .toArray()

    if (selectedRowsIds.length > 0) {
      try {
        const response = await deleteItem(apiResource.delete, selectedRowsIds.toString())
        fetchGet()
        setAlert({ type: 'success', action: 'delete' })
        handleCancelDeleteForm()
      } catch (error) {
        console.error('Error fetching items:', error)
        setAlert({ type: 'danger', action: 'delete' })
      }
    }
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
        <CustomCreate
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

      {/* Show component */}
      {showItems && (
        <CustomShow
          showModalBtnLaunchRef={showModalBtnLaunchRef}
          itemToShow={itemToShow}
          onHandleCloseShowForm={handleCloseShowForm}
        />
      )}

      {/* DeleteForm component */}
      {deleteSet.length > 0 && (
        <CustomDelete
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

export default CustomList
