import React, { useEffect, useState, useRef } from 'react'
// Datatables
import 'jquery'
import $ from 'jquery'
import DataTable from 'datatables.net-bs5' 
import 'datatables.net-select'
import 'datatables.net-buttons'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import 'pdfmake'
import 'pdfmake/build/vfs_fonts'
import JSZip from 'jszip'  // Required for .xlxs 
DataTable.Buttons.jszip(JSZip)
import language from 'datatables.net-plugins/i18n/fr-FR.json'
//
//import { getData, getItem, createItem, updateItem, deleteItem } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { actives, colors, APIBASEURL } from '../../constants'

const Anneeacademique = ({ auth }) => {
  const tableRef = useRef()
  const createFormRef = useRef()
  const deleteFormRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState()
  const [action, setAction] = useState('')
  const exportConstants = { title: 'Liste des années académiques', columns: [1, 2, 3, 4, 5, 6, 7] }
  const [refresh, setRefresh] = useState()
  
  const apiResource = {
    get: 'anneeacademiques',
    show: 'anneeacademiques/:id',
    create: 'anneeacademiques',
    update: 'anneeacademiques/:id',
    delete: 'anneeacademiques/:id',
  }

  const columns = [
    { title: 'ID', data: 'id' },
    //{ title: 'CODE', data: 'acacode' },
    {
      title: 'DATE_DEBUT',
      data: null,
      render: (data, type, row) => {
        return row.acadatedebut !== null ? new Date(row.acadatedebut).toLocaleDateString() : ''
      },
    },
    {
      title: 'DATE_FIN',
      data: null,
      render: (data, type, row) => {
        return row.acaddatefin !== null ? new Date(row.acadatefin).toLocaleDateString() : ''
      },
    },
    {
      title: 'SESSIONS_DEMANDES',
      data: null,
      render: (data, type, row) => {
        return row.sessiondemandes && row.sessiondemandes.length
      },
    },
    {
      title: 'SESSIONS_REMISES',
      data: null,
      render: (data, type, row) => {
        return row.sessionremises && row.sessionremises.length
      },
    },
    {
      title: 'SIMS',
      data: null,
      render: (data, type, row) => {
        return row.sims && row.sims.length
      },
    },
    { title: 'STATUT', data: 'acaactive' },
    {
      title: 'ACTIONS',
      data: null,
      render: (data, type, row) => {
        // Détails, Edit, Delete
        // const btnShow = `<a class="btn btn-outline-warning me-1 tableActionBtn tableActionBtnShowItem" href="#" data-id="${row.id}"><i class="fa fa-eye" aria-hidden="true"></i></a>`
        const btnEdit = `<a class="btn btn-outline-info me-1 tableActionBtn tableActionBtnEditItem" href="#" data-id="${row.id}"><i class="fa fa-edit" aria-hidden="true"></i></a>`
        const btnDelete = `<a class="btn btn-outline-danger tableActionBtn tableActionBtnDeleteItem" href="#" data-id="${row.id}"><i class="fa fa-trash" aria-hidden="true"></i></a>`
        return `<div class="d-flex align-content-center justify-content-center">${btnEdit + btnDelete}</div>`
      },
    },
  ]

  useEffect(() => {
	const controller = new AbortController()
	const signal = controller.signal 

	const fetchData = async () => {
		try {
			// 1. Lancement des requêtes en parallèle
			// Exemple avec allSettled pour isoler les erreurs
			const results = await Promise.allSettled([
				fetch(APIBASEURL+apiResource.get, {headers: {Authorization:`Bearer ${auth.token}`}}, {signal})
				.then((res) => res.json())
			])

			// 2. Récupération des requêtes HTTP
			const resData = results[0].status === 'fulfilled' ? results[0].value : []

			// 3. Mise à jour des états
			setData(resData)
		} catch (err) {
			if (err.name !== 'AbortError') {
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}
    	fetchData()
	return () => controller.abort() // Annulation automatique au démontage
  }, [refresh])

  useEffect(() => {
    //=== Retrieve saved page from localStorage
    const savedPage = localStorage.getItem('cartesimDatatableCurrentPage')
    const initialPage = savedPage ? parseInt(savedPage, 10) : 0 // Default to page 0
    //===

    //if (tableRef.current) {
     const dataTableInstance = $(tableRef.current).DataTable({
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
                className: 'dt-btn datatable-button rounded dt-btnCreate btnCreate',
                enabled: true,
                action: () => {
                  if (createFormRef.current && createFormBtnLaunchRef.current) {
                    setAlert()
                    setAction('create')
                    createFormRef.current.setAttribute('create-data-action', 'create')
                    createFormRef.current.setAttribute('create-data-id', '')
                    createFormBtnLaunchRef.current.click()
                  }
                },
              },
              {
                text: '<i class="fa fa-trash me-1" aria-hidden="true"></i>Tout supprimer',
                className: 'dt-btn datatable-button rounded dt-btnCreate btnDeleteAll ms-2',
                //enabled: data.length > 0 ? true : false,
		enabled: false,
                action: () => {
                  if (deleteFormRef.current && deleteFormBtnLaunchRef.current) {
                    setAlerte()
			setAction('delete')
                    $('#deleteQuestion').text(
                      'Voulez-vous vraiment supprimer tous les enregistrements (' +
                        data.length +
                        ') ?',
                    )
                    deleteFormRef.current.setAttribute('delete-data-action', 'delete')
                    deleteFormRef.current.setAttribute('delete-data-id', 'all')
                    deleteFormBtnLaunchRef.current.click()
                  }
                },
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
                enabled: data && data.length > 0 ? true : false,
                filename: exportConstants.title,
                exportOptions: {
                  columns: exportConstants.columns,
                },
              },
              {
                extend: 'excel',
                text: '<i class="fa fa-file-excel" aria-hidden="true"></i>',
                titleAttr: 'Excel',
                className: 'datatable-export-button rounded ms-1',
                enabled: data && data.length > 0 ? true : false,
                filename: exportConstants.title,
                exportOptions: {
                  columns: exportConstants.columns,
                },
              },
              {
                extend: 'pdf',
                text: '<i class="fa fa-file-pdf" aria-hidden="true"></i>',
                titleAttr: 'PDF',
                className: 'dt-btn datatable-export-button ms-1 rounded',
                enabled: data && data.length > 0 ? true : false,
                filename: exportConstants.title,
                download: 'open',
                exportOptions: {
                  columns: exportConstants.columns,
                  modifier: {
                    page: 'current',
                  },
                },
              },
            ],
          },
        },
      })
      
      //=== Add an event listener to capture page changes
    // You can bind an event listener to 'draw.dt' to detect page changes
    $(tableRef.current).on('page.dt', function () {
      const currentPage = dataTableInstance.page()
      //console.log('Current Page Index:', currentPage)
      // Example of saving the page index to local storage (optional)
      localStorage.setItem('cartesimDatatableCurrentPage', currentPage.toString())
    })
    dataTableInstance.page(initialPage).draw(false)
    // Cleanup function to destroy table instance and remove event listener
    return () => {
      dataTableInstance.destroy()
      $(tableRef.current).off('page.dt')
    }
    //===
    //}

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

  // === Show item
  $('#myTable tbody').on('click', '.tableActionBtnShowItem', async function (e) {
    e.preventDefault()
    // const id = $(this).data('id')
    // const response = await getItem(apiResource.show.replace(':id', id))
  })
  //

  // === Edit item
  $('#myTable tbody').on('click', '.tableActionBtnEditItem', async function (e) {
    	e.preventDefault()
    	setAlert()
	setAction('edit')
    	const id = $(this).data('id') 
	await axios.get(APIBASEURL+apiResource.show.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
	.then((response) => { 
		if (response.data) {
      			if (response.data.success) { 
          			const r = response.data.data
          			createFormRef.current.setAttribute('create-data-action', 'edit')
          			createFormRef.current.setAttribute('create-data-id', id)
          			$('#datedebut').val(r.acadatedebut)
          			$('#datefin').val(r.acadatefin)
          			$('input[name="active"][value="' + r.acaactive + '"]').prop('checked', true)
          			$('#commentaire').val(r.acacommentaire)
          			createFormBtnLaunchRef.current.click()
			} else {
				setAlert({
					type: "warning", 
					message: "Erreur: aucun enregistrement correspondant !", 
					background: "#FCD116", 
					color: "#FFFFFF"
				})
			}
      		} else {
        		setAlert({
				type: "warning", 
				message: "Oups: Merci de réessayer ultérieurement car un problème est survenu !",
				background: "#FCD116", 
				color: "#FFFFFF" 
			})
      		}
    	})
	.catch((err) => {
		console.log(err.message)
	})
	.finally(() => {
		console.log('Request completed')
	})
  })
  //
  const handleCancelCreateForm = () => {
    if (createFormRef.current && createFormBtnCloseRef.current) {
	setAlert()
	setAction('')
      	createFormRef.current.setAttribute('create-data-action', 'create')
      	createFormRef.current.setAttribute('create-data-id', '')
      	createFormBtnResetRef.current.click()
      	createFormBtnCloseRef.current.click()
    }
  }
  //
  const handleSubmitCreateForm = async (e) => {
	e.preventDefault()
	setAlert()
    	// récupération des données du formulaire
    	const action_ = e.target.getAttribute('create-data-action')
    	const id = e.target.getAttribute('create-data-id')
	// 
	const controller = new AbortController() 
	const signal = controller.signal 
	//
      	const formData = new FormData(createFormRef.current)
      	const formValues = Object.fromEntries(formData)
      	//
	try {
		if (action_ === 'create') {
 			const response = await axios.post(APIBASEURL+apiResource.create, formValues, {headers:{Authorization:`Bearer ${auth.token}`}})
            		if (response.data) {	
				if (response.data.success) {
					createFormBtnResetRef.current.click()
				} 
				setAlert(response.data.alert)
			} else {
				setAlert({
					type: "warning", 
					message: "Oups: Merci de réessayer ultérieurement car un problème est survenu !", 
					background: '#FCD116', 
					color: '#FFFFFF'
				})
			}
      		}

      		if (action_ === 'edit') {
			const response = await axios.patch(APIBASEURL+apiResource.update.replace(':id', id), formValues, {headers:{Authorization:`Bearer ${auth.token}`}})
			if (response.data) {
				setAlert(response.data.alert)
			} else {
				setAlert({
					type: "warning", 
					message: "Oups: Merci de réessayer utlérieurement car un problème est survenu !", 
					background: '#FCD116', 
					color: '#FFFFFF'
				})
			}
		} 
	} catch (err) {
		if (err.name !== 'AbortError') {
			setError(err.message)
		}
	} finally {
		setLoading(false)
	}
	setRefresh(action_)
	return () => controller.abort() // Annulation automatique au démontage
  }
  // ===

  // === Delete item
  $('#myTable tbody').on('click', '.tableActionBtnDeleteItem', async function (e) {
    e.preventDefault()
    setAlert()
    setAction('delete')
    const id = $(this).data('id')
    await axios.get(APIBASEURL+apiResource.show.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
	.then((response) => {
        	if (response.data) {
          		deleteFormRef.current.setAttribute('delete-data-action', 'delete')
          		deleteFormRef.current.setAttribute('delete-data-id', id)
          		deleteFormBtnLaunchRef.current.click()
        	} else {
          		setAlert({
				type: "warning", 
				message: "Oups: Merci de réessayer ultérieurement car un problème est survenu !", 
				background: "#FCD116", 
				color: "#FFFFFF"
			})
      		} 
    	})
	.catch((err) => {
		console.log(err.message)
	})
	.finally(() => {
		console.log('Request completed')
	})
  })
  //

  const handleCancelDeleteForm = () => {
   	if (deleteFormRef.current && deleteFormBtnCloseRef.current) {
      		setAlert()
		setAction('')
		deleteFormRef.current.setAttribute('delete-data-action', 'delete')
      		deleteFormRef.current.setAttribute('delete-data-id', '')
      		deleteFormBtnCloseRef.current.click()
    	}
  }
  //

  const handleSubmitDeleteForm = async (e) => {
  	e.preventDefault()
	setAlert()
    	if (deleteFormRef.current && deleteFormBtnCloseRef.current) {
      		const action_ = deleteFormRef.current.getAttribute('delete-data-action')
      		const id = deleteFormRef.current.getAttribute('delete-data-id')
      		if (action_ === 'delete') {
        		await axios.delete(APIBASEURL+apiResource.delete.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
			.then((response) => {
				console.log(response)
				if (response.data) { console.log(response.data)
					setAlert(response.data.alert)
				} else {
					setAlert({
						type: "warning", 
						message: "Oups: Merci de réessayer ultérieurement car un problème est survenu !", 
						background: "#FCD116", 
						color: "#FFFFFF"
					})
				}
			})
			.catch((err) => {
				console.log(err.message)
			})
			.finally(() => {
				console.log('Request completed')
			})
          	}
		setRefresh(action_)
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
            <table
              ref={tableRef}
              id="myTable"
              className="display table table-sm table-striped table-hover myDatatable"
              width={'100%'}
            ></table>
          </div>
          {/*  */}
          {/* Create/Edit form */}
          <form
            ref={createFormRef}
            onSubmit={handleSubmitCreateForm}
            method="POST"
            encType=""
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
                      {action && (
                        <FontAwesomeIcon
                          icon={action === 'create' ? faPlus : faEdit}
                          className=""
                        />
                      )}
                      {action === 'create' ? 'Ajouter' : 'Editer'}
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
                    {/* Alert */}
                    {action !== "delete" && alert && (
                      <div className="alert py-1 mb-2" style={{ backgroundColor: alert.background, color: alert.color }}>
                          {alert.message}
                      </div>
                    )}
                    {/* Required */}
                    <div className="d-flex pb-1">
                      <CustomRequired tagP={true} />
                    </div>
                    {/*  */}
                    <div className="card">
                      <div className="card-body">
                        {/* Date début */}
                        <div className="row">
                          <div className="mb-2 col-md-6">
                            <label htmlFor="datedebut" className="form-label mb-0">
                              Date début
                              <CustomRequired />
                            </label>
                            <div className="">
                              <input
                                type="date"
                                className="form-control"
                                id="datedebut"
                                name="datedebut"
                                required
                              />
                            </div>
                          </div>
                          {/* Date fin */}
                          <div className="mb-2 col-md-6">
                            <label htmlFor="datefin" className="form-label mb-0">
                              Date fin
                              <CustomRequired />
                            </label>
                            <div className="">
                              <input
                                type="date"
                                className="form-control"
                                id="datefin"
                                name="datefin"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/* Est activé */}
                        <div className="">
                          <label htmlFor="active" className="form-label mb-0">
                            Activé
                          </label>
                          <div className="">
                            {actives.map((active, index) => {
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
                                    value={active}
                                    // defaultChecked={estActive === 'non' ? true : false}
                                  />
                                  <label className="form-check-label" htmlFor={'active' + index}>
                                    {active}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {/* Commentaire */}
                        <div className="mb-2">
                          <label htmlFor="commentaire" className="form-label mb-0">
                            Commentaire
                          </label>
                          <div className="">
                            <textarea
                              className="form-control"
                              rows={2}
                              id="commentaire"
                              name="commentaire"
                            ></textarea>
                          </div>
                        </div>
                        {/*  */}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 py-0">
                    <button type="submit" className="btn custom-btn-success createModalBtnSave">
                      <i className="fa fa-check me-1" aria-hidden="true"></i>
                      Valider
                    </button>
                    <button
                      type="button"
                      className="btn custom-btn-secondary createModalBtnCancel"
                      data-bs-dismiss="modal"
                      onClick={handleCancelCreateForm}
                    >
                      <i className="fa fa-close me-1" aria-hidden="true"></i>Annuler
                    </button>
                    <button ref={createFormBtnResetRef} type="reset" className="btn d-none">
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
			{action === "delete" && alert && (
				<div className="alert py-1" style={{ backgroundColor: alert.background, color: alert.color }}>
					{alert.message}
				</div>
			)}
                    	<i className="fa fa-exclamation-triangle me-1 text-danger fw-bolder" aria-hidden="true"></i>
                    	<span id="deleteQuestion">Voulez-vous vraiment supprimer cet enregistrement ?</span>
                  </div>
                  <div className="modal-footer border-0 py-1">
                    <button
                      type="button"
                      className="btn custom-btn-secondary btn-submit"
                      data-bs-dismiss="modal"
                      onClick={handleCancelDeleteForm}
                    >
                      <i className="fa fa-close me-1" aria-hidden="true"></i>
                      Annuler
                    </button>
                    <button type="submit" className="btn custom-btn-success">
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

export default Anneeacademique
