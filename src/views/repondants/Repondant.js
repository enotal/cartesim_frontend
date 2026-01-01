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

import { getData, getItem, createItem, updateItem, deleteItem } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { CustomCreateAlert } from '../../components/CustomCreateAlert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

const Repondant = () => {
  const tableRef = useRef()
  const createFormRef = useRef()
  const deleteFormRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const showModalBtnLaunchRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [indexAlert, setIndexAlert] = useState(null)
  const [createAlert, setCreateAlert] = useState(null)
  const [createFormAction, setCreateFormAction] = useState(null)
  const [estActives, setEstActives] = useState(['non', 'oui'])

  const [itemToShow, setItemToShow] = useState([])

  const apiResource = {
    get: 'repondants',
    show: 'repondants/:id',
    create: 'repondants',
    update: 'repondants/:id',
    delete: 'repondants/:id',
  }

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'IDENTIFIANT', data: 'identifiant' },
    { title: 'ACTIVE', data: 'estactive' },
    {
      title: 'ACTIONS',
      data: null,
      render: (data, type, row) => {
        return (
          '<div class="flex">' +
          // Détails
          '<button class="btn btn-sm py-0 me-3 tableActionBtn tableActionBtnShowItem" data-id="' +
          row.id +
          '">' +
          '<i class="fa fa-eye text-warning" aria-hidden="true"></i>' +
          '</button>' +
          // Edit
          '<button class="btn btn-sm py-0 me-3 tableActionBtn tableActionBtnEditItem" data-id="' +
          row.id +
          '">' +
          '<i class="fa fa-edit text-info" aria-hidden="true"></i>' +
          '</button>' +
          // Delete
          '<button class="btn btn-sm py-0 tableActionBtn tableActionBtnDeleteItem" data-id="' +
          row.id +
          '">' +
          '<i class="fa fa-trash text-danger" aria-hidden="true"></i>' +
          '</button>' +
          '</div>'
        )
      },
    },
  ]

  const showItems = []

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
        layout: {
          top1Start: {
            buttons: [
              {
                text: '<i class="fa fa-plus me-1" aria-hidden="true"></i>Ajouter',
                // titleAttr: "Ajouter",
                className: 'dt-btn datatable-button rounded dt-btnCreate btnCreate',
                enabled: true,
                action: () => {
                  if (createFormRef.current && createFormBtnLaunchRef.current) {
                    setCreateFormAction('create')
                    createFormRef.current.setAttribute('create-data-action', 'create')
                    createFormRef.current.setAttribute('create-data-id', '')
                    createFormBtnLaunchRef.current.click()
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
        dt.buttons(['.btnCreate']).enable(selectedRowsCount === 0)
        dt.buttons(['.btnShow']).enable(selectedRowsCount === 1)
        dt.buttons(['.btnEdit']).enable(selectedRowsCount === 1)
        dt.button(['.btnDelete']).enable(selectedRowsCount > 0)
      })
  }, [data, columns])

  // Actions

  //=== Launch modals

  // === Edit item
  $('#myTable tbody').on('click', '.tableActionBtnEditItem', async function (e) {
    e.preventDefault()
    const id = $(this).data('id')
    const response = await getItem(apiResource.show.replace(':id', id))
    if (createFormRef.current && createFormBtnLaunchRef.current) {
      if (response) {
        setCreateFormAction('edit')
        createFormRef.current.setAttribute('create-data-action', 'edit')
        createFormRef.current.setAttribute('create-data-id', id)
        $('#identifiant').val(response.identifiant)
        $('#identifiant').prop('disabled', true)
        $('input[name="active"][value="' + response.estactive + '"]').prop('checked', true)
        createFormBtnLaunchRef.current.click()
      }
    }
  })
  //
  const handleCancelCreateForm = () => {
    if (createFormRef.current && createFormBtnCloseRef.current) {
      createFormRef.current.setAttribute('create-data-action', 'create')
      createFormRef.current.setAttribute('create-data-id', '')
      createFormBtnResetRef.current.click()
      createFormBtnCloseRef.current.click()
    }
  }
  //
  const handleSubmitCreateForm = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const action = e.target.getAttribute('create-data-action')
    const id = e.target.getAttribute('create-data-id')
    if (createFormRef.current && createFormBtnCloseRef.current) {
      const formData = new FormData(createFormRef.current)
      const formValues = Object.fromEntries(formData)
      if (action === 'create') {
        const response = await createItem(apiResource.create, formValues)
        // Succès
        if (response.status === 200) {
          setCreateAlert(response)
          createFormBtnResetRef.current.click()
        }
        // Echec
        if (response.status === 201) {
          setCreateAlert(response.data)
        }
      }
      if (action === 'edit') {
        const response = await updateItem(apiResource.update.replace(':id', id), formValues)
        // Succès
        if (response.status === 200) {
          setIndexAlert(response.data)
          createFormBtnResetRef.current.click()
          createFormBtnCloseRef.current.click()
        }
        // Echec
        if (response.status === 201) {
          setCreateAlert(response)
        }
      }
    }
    fetchGet()
  }
  // ===

  // === Delete item
  $('#myTable tbody').on('click', '.tableActionBtnDeleteItem', async function (e) {
    e.preventDefault()
    const id = $(this).data('id')
    const response = await getItem(apiResource.show.replace(':id', id))
    if (deleteFormRef.current && deleteFormBtnLaunchRef.current) {
      if (response) {
        deleteFormRef.current.setAttribute('delete-data-action', 'delete')
        deleteFormRef.current.setAttribute('delete-data-id', id)
        deleteFormBtnLaunchRef.current.click()
      }
    }
  })
  //
  const handleCancelDeleteForm = () => {
    if (deleteFormRef.current && deleteFormBtnCloseRef.current) {
      deleteFormRef.current.setAttribute('delete-data-action', 'delete')
      deleteFormRef.current.setAttribute('delete-data-id', '')
      deleteFormBtnCloseRef.current.click()
    }
  }
  //
  const handleSubmitDeleteForm = async (e) => {
    e.preventDefault()
    if (deleteFormRef.current && deleteFormBtnCloseRef.current) {
      const action = deleteFormRef.current.getAttribute('delete-data-action')
      const id = deleteFormRef.current.getAttribute('delete-data-id')
      if (action === 'delete') {
        const response = await deleteItem(apiResource.delete.replace(':id', id))
        setIndexAlert(response)
        deleteFormBtnCloseRef.current.click()
      }
    }
    fetchGet()
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
          {/* Create/Edit form */}
          <form
            ref={createFormRef}
            onSubmit={handleSubmitCreateForm}
            method="POST"
            encType="multipart/form-data"
            create-data-action="create"
            create-data-id=""
          >
            <button
              ref={createFormBtnLaunchRef}
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              <i className="fa fa-plus me-2" aria-hidden="true"></i>Launch demo static modal
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="createModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="createModal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header py-1 bg-primary">
                    <h5 className="modal-title  fw-bold text-light" id="createModalLabel">
                      {createFormAction && (
                        <FontAwesomeIcon
                          icon={createFormAction === 'create' ? faPlus : faEdit}
                          className=""
                        />
                      )}
                      {createFormAction === 'create' ? 'Ajouter' : 'Editer'}
                    </h5>
                    <button
                      ref={createFormBtnCloseRef}
                      type="button"
                      className="btn-close d-none"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex pb-1">
                      <CustomRequired tagP={true} />
                      <CustomCreateAlert alert={createAlert} />
                    </div>

                    <div className="card">
                      <div className="card-body">
                        {/* Identifiant */}
                        <div className="mb-2">
                          <label htmlFor="identifiant" className="form-label mb-0">
                            Identifiant
                            <CustomRequired />
                          </label>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              id="identifiant"
                              name="identifiant"
                              required
                              autoFocus
                            />
                          </div>
                        </div>
                        {/* Est activé */}
                        <div className="">
                          <label htmlFor="active" className="form-label mb-0">
                            Activé
                          </label>
                          <div className="">
                            {estActives.map((estActive, index) => {
                              return (
                                <div
                                  className="form-check form-check-inline"
                                  key={'active-item-' + index}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="active"
                                    id={'active' + index}
                                    value={estActive}
                                  />
                                  <label className="form-check-label" htmlFor={'active' + index}>
                                    {estActive}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {/*  */}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 py-0">
                    <button type="submit" className="btn btn-primary text-white createModalBtnSave">
                      <i className="fa fa-check me-1" aria-hidden="true"></i>
                      Valider
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary createModalBtnCancel"
                      data-bs-dismiss="modal"
                      onClick={handleCancelCreateForm}
                    >
                      <i className="fa fa-close me-1" aria-hidden="true"></i>Annuler
                    </button>
                    <button
                      ref={createFormBtnResetRef}
                      type="reset"
                      className="btn btn-secondary d-none"
                    >
                      <i className="fa fa-refresh me-1" aria-hidden="true"></i>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/*  */}
          {/* Delete form */}
          <form
            ref={deleteFormRef}
            onSubmit={handleSubmitDeleteForm}
            method="POST"
            encType=""
            create-data-action="delete"
            create-data-id=""
          >
            <button
              ref={deleteFormBtnLaunchRef}
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <i className="fa fa-trash me-2" aria-hidden="true"></i>Launch static backdrop modal
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="deleteModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="deleteModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header py-1 bg-primary">
                    <h5 className="modal-title fw-bold text-light" id="deleteModalLabel">
                      <i className="fa fa-trash me-1" aria-hidden="true"></i>Supprimer
                    </h5>
                    <button
                      ref={deleteFormBtnCloseRef}
                      type="button"
                      className="btn-close d-none"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <i
                      className="fa fa-exclamation-triangle me-1 text-danger fw-bolder"
                      aria-hidden="true"
                    ></i>
                    Voulez-vous vraiment supprimer cet enregistrement ?
                  </div>
                  <div className="modal-footer border-0 py-1">
                    <button
                      type="button"
                      className="btn btn-secondary btn-submit"
                      data-bs-dismiss="modal"
                      onClick={handleCancelDeleteForm}
                    >
                      <i className="fa fa-close me-1 btn-cancel" aria-hidden="true"></i>
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-trash me-1" aria-hidden="true"></i>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default Repondant
