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
import { getData, getItem, createItem, updateItem, deleteItem } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { actives, sexes, colors, repondantColumnToImport, APIBASEURL } from '../../constants'
import * as XLSX from 'xlsx'

const Repondant = ({ auth }) => {
  const tableRef = useRef()
  const createFormRef = useRef()
  const deleteFormRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()
  const importFormRef = useRef()
  const importFormBtnLaunchRef = useRef()
  const importFormBtnCloseRef = useRef()
  const importFormBtnResetRef = useRef()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState()
  const [loadexcelalert, setLoadexcelalert] = useState()
  const [action, setAction] = useState('')
  const [createFormAction, setCreateFormAction] = useState(null)
  const [excelData, setExcelData] = useState([])
  const [importColumns, setImportColumns] = useState([])
  const exportConstants = { title: 'Liste des répondants', columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
  const [refresh, setRefresh] = useState()

  const regimes = [
	'étudiant', 
	'particulier', 
	'enseignant', 
	'personnelATOS', 
	'personneRessource', 
	'pointFocalRégion', 
	'déléguéUVBF'
  ]

  const apiResource = {
    get: 'repondants',
    show: 'repondants/:id',
    create: 'repondants',
    update: 'repondants/:id',
    delete: 'repondants/:id',
  }

  const columns = [
    { title: 'Id', data: 'id' },
    { title: 'Identifiant', data: 'repidentifiant' },
    { title: 'Nom', data: 'repnom' },
    { title: 'Prénom', data: 'repprenom' },  
    { title: 'Sexe', data: 'repsexe' },
    { title: 'Email', data: 'repemail' },
    { title: 'Régime', data: 'repregime' },
    { title: 'Filière', data: 'repfiliere' },
    { title: 'Niveau', data: 'repniveau' },  
    { title: 'Demande', data: 'dmdid' },
    { title: 'Numéro SIM', data: 'simnumero' }, 
    { title: 'Inscrit', data: 'repinscription' },
    { title: 'Actif', data: 'repactive' },
    {
      title: 'Actions',
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
	//const auth_ = JSON.parse(auth)
	const fetchData = async () => {
		try {
			// 1. Lancement des requêtes en parallèle 
			// Exemple avec allSettled pour isoler les erreurs 
			const results = await Promise.allSettled([
				fetch(APIBASEURL+apiResource.get, {headers: {Authorization:`Bearer ${auth.token}`}}, {signal})
				.then((res) => res.json()),
			])
			
			// 2. Récupération des réponses HTTP
			const resData = results[0].status === 'fulfilled' ? results[0].value : []

			// 3. Mise à jour des états 
			setData(resData) 
		} catch (err) { console.log(err)
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
                    setAction('create')
		    setAlert()
		    setLoadexcelalert()
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
		    setAction('delete')
                    setAlert()
		    setLoadexcelalert()
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
              {
                text: '<i class="fa fa-file-import me-1" aria-hidden="true"></i>Importer',
                className: 'dt-btn datatable-button rounded dt-btnImport btnImport ms-2',
                enabled: true,
                action: () => {
                  if (importFormRef.current && importFormBtnLaunchRef.current) {
		    setAction('import')
                    setAlert()
		    setLoadexcelalert()
                    importFormRef.current.setAttribute('form-action', 'import')
                    importFormRef.current.setAttribute('target-id', '')
                    importFormBtnLaunchRef.current.click()
                  }
                },
              }, 
	      {
  		text: '<i class="fa fa-xmark me-1" aria-hidden="true"></i>Désinscrire',
		className: 'dt-btn datatable-button rounded dt-btnDesinscrire btnDesinscrire ms-2', 
		enabled: true, 
		action: () => {
			setAction('desinscrire')
			setAlert()
			setLoadexcelalert()
			console.log('désinscrire !')
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

  // === Edit item
  $('#myTable tbody').on('click', '.tableActionBtnEditItem', async function (e) {
    	e.preventDefault()
    	setAlert()
	setLoadexcelalert()
    	const id = $(this).data('id')
    	await axios.get(APIBASEURL+apiResource.show.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
	.then((response) => {
      		if (response.data) {
			if (response.data.success) {
        			if (createFormRef.current && createFormBtnLaunchRef.current) {
          				const r = response.data.data
          				setAction('edit')
          				createFormRef.current.setAttribute('create-data-action', 'edit')
          				createFormRef.current.setAttribute('create-data-id', id)
          				$('#regime').val(r.repregime)
          				$('#identifiant').val(r.repidentifiant)
          				$('input[name="sexe"][value="' + r.repsexe + '"]').prop('checked', true)
          				$('#email').val(r.repemail)
          				$('input[name="active"][value="' + r.repactive + '"]').prop('checked', true)
          				createFormBtnLaunchRef.current.click()
        			}
			} else {
				setAlert(response.data.alert)
			}
      		} else {
        		//
      		}
    	}).catch((err) => {
		console.log(err.message)
	}).finally(() => {
		console.log('Request completed')
	})
  })
  //
  const handleCancelCreateForm = () => {
    if (createFormRef.current && createFormBtnCloseRef.current) {
      setALert()
      setLoadexcelalert()
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
	setLoadexcelalert()
    	// récupération des données du formulaire
    	const action_ = e.target.getAttribute('create-data-action')
    	const id = e.target.getAttribute('create-data-id')
      	const formData = new FormData(createFormRef.current)
      	const formValues = Object.fromEntries(formData)
	//
      	if (createFormRef.current && createFormBtnCloseRef.current) {
		//
      		if (action_ === 'create') {
        		await axios.post(APIBASEURL+apiResource.create, formValues, {headers: {Authoziration:`Bearer ${auth.token}`}})
			.then((response) => {
				if (response.data) {
          				if (response.data.success) {
            					createFormBtnResetRef.current.click()
          				}
          				setAlert(response.data.alert)
				}
        		}).catch((err) => {
				console.log(err.message)
			}).finally(() => {
				console.log('Request completed')
			})
      		}
		//
      		if (action_ === 'edit') {
        		formValues.identifiant = $('#identifiant').val()
        		await axios.patch(APIBASEURL+apiResource.update.replace(':id', id), formValues, {headers:{Authorization:`Bearer ${auth.token}`}})
			.then((response) => {
          			if (response.data) {
					if (response.data.success) {
            					createFormBtnResetRef.current.click()
            					createFormBtnCloseRef.current.click()
					}
					setAlert(response.data.alert)
          			} else {
            				//setAlert(response)
          			}
       			}).catch((err) => {
				console.log(err.message)
			}).finally(() => {
				console.log('Request completed')
			})
      		}
    	}
    	setRefresh(action_)
  }
  // ===

  // === Show item
  $('#myTable tbody').on('click', '.tableActionBtnShowItem', async function (e) {
    e.preventDefault()
    // const id = $(this).data('id')
    // const response = await getItem(apiResource.show.replace(':id', id))
  })
  //

  // === Delete item
  $('#myTable tbody').on('click', '.tableActionBtnDeleteItem', async function (e) {
    	e.preventDefault()
    	setAlert()
	setLoadexcelalert()
    	const id = $(this).data('id')
    	await axios.get(APIBASEURL+apiResource.show.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
	.then((response) => {
		if (response.data) {
			if (response.data.success) {
      				if (deleteFormRef.current && deleteFormBtnLaunchRef.current) {
          				deleteFormRef.current.setAttribute('delete-data-action', 'delete')
          				deleteFormRef.current.setAttribute('delete-data-id', id)
          				deleteFormBtnLaunchRef.current.click()
        			}
			} 
     		} 
    	}).catch((err) => {
		console.log(err.message)
	}).finally(() => {
		console.log('Request completed')
	})
  })
  //

  const handleCancelDeleteForm = () => {
    	if (deleteFormRef.current && deleteFormBtnCloseRef.current) {
		setAlert()
		setLoadexcelalert()
      		deleteFormRef.current.setAttribute('delete-data-action', 'delete')
      		deleteFormRef.current.setAttribute('delete-data-id', '')
      		deleteFormBtnCloseRef.current.click()
    	}
  }
  //
  const handleSubmitDeleteForm = async (e) => {
 	e.preventDefault()
	setAlert()
	setLoadexcelalert()
      	const action_ = deleteFormRef.current.getAttribute('delete-data-action')
      	const id = deleteFormRef.current.getAttribute('delete-data-id')
	if (deleteFormRef.current && deleteFormCloseRef.current) {
      		if (action_ === 'delete') {
        		await axios.delete(APIBASEURL+apiResource.delete.replace(':id', id), {headers:{Authorization:`Bearer ${auth.token}`}})
			.then((response) => {
          			if (response.data) {
					if (response.data.success) {
            					deleteFormBtnCloseRef.current.click()
          				}
          				setAlert(response.data.alert)
				}
        		})
			.catch((err) => {
				console.log(err.message)
			})
			.finally(() => {
				console.log('Request completed')
			})
      		}
    	}
    	setRefresh(action_)
  }
  // ===

  // === Import form
  const handleCancelImportForm = () => {
    	if (importFormRef.current && importFormBtnCloseRef.current) {
      		importFormRef.current.setAttribute('form-action', '')
      		importFormRef.current.setAttribute('target-id', '')
      		setAction('')
      		setAlert() 
		setLoadexcelalert()
     		setExcelData([])
      		setImportColumns([])
      		importFormBtnResetRef.current.click()
      		importFormBtnCloseRef.current.click()
    	}
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // console.log(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        // Parse the binary data   // 65001 is the codepage for UTF-8
        const workbook = XLSX.read(data, { type: 'binary', codepage: 65001 })
        // Get the first worksheet name
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        // Convert the worksheet to an array of JSON objects
        const jsonOptions = { header: 1 } // Use 'header: 1' if the first row is data, omit for object keys
        const jsonData = XLSX.utils.sheet_to_json(worksheet, jsonOptions)
	
	setAction('import')
        if (jsonData.length > 0) {
          // Obtenir les index concernés.
          let columns = []
          let i = 0
          jsonData[0].map((item, index) => {
            if (repondantColumnToImport.includes(item.toLowerCase())) {
              columns.push({ key: index, name: item, value: i })
              i++
            }
          })
          setImportColumns(columns)
          // Filtrer la liste suivant les index concernés
          const filterData = []
          const columnsKeys = columns.map((item) => item.key)
          if (columns.length > 0) {
            jsonData.map((item) => {
              // if (index > 0) {
              filterData.push(item.filter((_, index) => columnsKeys.includes(index)))
              // }
            })
            setExcelData(filterData)
            setLoadexcelalert({
		type: "success", 
		message: (filterData.length-1)+" enregistrement(s) trouvé(s) !", 
		background: "#056409", 
		color: "#FFFFFF"
	    })
          } else {
            // Aucune colonne correspondante dans la liste
            setExcelData([])
            setLoadexcelalert({
              type: "warning",
              message: "Aucune colonne correspondante dans la liste !", 
	      background: "#FCD116", 
	      color: "#FFFFFF"
            })
          }
        }
      }
      // Read the file as binary string
      reader.readAsBinaryString(file)
    }
  }

 	const handleSubmitImportForm = async (e) => {
    		e.preventDefault() 
    		// récupération des données de la liste
      		const formData = new FormData(importFormRef.current)
      		const formValues = Object.fromEntries(formData)
      		const data = excelData.filter((_, index) => index > 0)
		// 
		if (importFormRef.current && importFormBtnCloseRef.current) {
      			await axios.post(APIBASEURL+'repondants/import', 
				{
        				typerepondant: formValues.typerepondant,
        				columns: importColumns,
        				imports: data,
      				}, 
				{headers: {Authorization:`Bearer ${auth.token}`}},
			).then((response) => { console.log(response) 
				if (response.data) {
					setAlert(response.data.alert)
				}
      			}).catch((err) => {
				console.log(err)
			}).finally(() => {
				console.log('Request completed')
			})
    		}
		setRefresh('import')
  	}
  	// === 

	// === Désinscrire les non inscrits 
	//$('#myTable	
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
          {/* Alerts */}
          {alert && (
            <div
              className="card mb-2"
              style={{
                backgroundColor: alert.background,
                color: alert.color,
              }}
            >
		{alert.message}
            </div>
          )}
          {/*  */}
          {/* List */}
          <div className="table-responsive p-2">
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
                    <h5 className="modal-title fw-bold text-light" id="createModalLabel">
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
                    <div className="d-flex pb-1">
                      <CustomRequired tagP={true} />
                      <div className="">{action === "edit" && alert && alert.message}</div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                        {/* Régime */}
                        <div className="mb-2">
                          <label htmlFor="regime" className="form-label mb-0">
                            Régime
                          </label>
                          <div className="">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="regime"
                              name="regime"
                              autoFocus
                            >
                              <option value="">Sélectionner ici !</option>
                              {regimes.map((regime, index) => {
                                return (
                                  <option
                                    value={regime}
                                    key={'regime-' + index}
                                  >
                                    {index + 1 + '. ' + regime}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
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
                              autoComplete
                            />
                          </div>
                        </div>
			{/* Nom */}
			<div className="mb-2">
			  <label htmlFor="nom" className="form-label mb-0">Nom</label>
			  <div className="">
			    <input type="text" className="form-control" id="nom" name="nom" autoComplete />
			  </div>
			</div>
			{/* Prénoms */}
			<div className="mb-2">
			  <label htmlFor="prenom" className="form-label mb-0">Prénom</label>
			  <div className="">
			    <input type="text" className="form-control" id="nom" name="prenom" autoComplete />
			  </div>
			</div>
                        {/* Sexe */}
                        <div className="">
                          <span className="form-label mb-0">
                            Sexe
                          </span>
                          <div className="">
                            {sexes.map((sexe, index) => {
                              return (
                                <div
                                  className="form-check form-check-inline"
                                  key={'sexe-item-' + index}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sexe"
                                    id={'sexe' + index}
                                    value={sexe}
                                  />
                                  <label className="form-check-label" htmlFor={'sexe' + index}>
                                    {sexe}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="mb-2">
                          <label htmlFor="email" className="form-label mb-0">
                            Email
                            <CustomRequired />
                          </label>
                          <div className="">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              required
                            />
                          </div>
                        </div>
                        {/* Est activé */}
                        <div className="">
                          <span className="form-label mb-0">
                            Activé
                          </span>
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
                                  />
                                  <label className="form-check-label" htmlFor={'active' + index}>
                                    {active}
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
                    <button
                      type="submit"
                      className="btn custom-btn-success text-white createModalBtnSave"
                    >
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
                    <i
                      className="fa fa-exclamation-triangle me-1 text-danger fw-bolder"
                      aria-hidden="true"
                    ></i>
                    <span id="deleteQuestion">
                      Voulez-vous vraiment supprimer cet enregistrement ?
                    </span>
                  </div>
                  <div className="modal-footer border-0 py-1">
                    <button
                      type="button"
                      className="btn custom-btn-secondary"
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
          {/* Import form */}
          <form
            ref={importFormRef}
            onSubmit={handleSubmitImportForm}
            method="POST"
            encType=""
            form-action="import"
            target-id=""
          >
            <button
              ref={importFormBtnLaunchRef}
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#importModal"
            >
              <i className="fa fa-plus me-2" aria-hidden="true"></i>Launch demo static modal
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="importModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="importModal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header py-1 bg-primary">
                    <h5 className="modal-title  fw-bold text-light" id="importModalLabel">
                      <i className="fa fa-file-import me-1" aria-hidden="true"></i>Importer une
                      liste de répondants
                    </h5>
                    <button
                      ref={importFormBtnCloseRef}
                      type="button"
                      className="btn-close d-none"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Alerts */}
                    {alert && (
                      <div
                        className="card mb-2"
                        style={{
                          backgroundColor: alert.background,
                          color: alert.color,
                        }}
                      >
                          <div className="">{alert.message}</div>
                      </div>
                    )}
                    {/*  */}
		    
		    {/* Cadre d'information sur les régimes */}
		    <div className="card border-0">
		      <div className="card-body">
			
		      </div>
		    </div>

		    {/* Cadre d'importation du fichier */}
                    <div className="card">
                      <div className="card-body">
                        <div className="mb-2">
                            <input
                              type="file"
                              className="form-control"
                              id="fichier"
                              name="fichier"
                              aria-describedby="fichierHelpBlock"
                              accept=".xlsx, .xls, .csv"
                              required
                              onChange={handleFileUpload}
                            />
                            <div id="fichierHelpBlock" className="form-text mt-0 fw-bold">
                              Le fichier doit être de type Excel (.xls, .xlsx) ou CSV (.csv)
                            </div>
                        </div>

                        {/* List preview */}
                        {excelData.length > 0 && loadexcelalert && (
                          <div
                            className="py-1 text-light fw-bolder text-center"
                            style={{ backgroundColor: loadexcelalert.background, color:loadexcelalert.color }}
                          >
                            <i className="fa fa-check me-1" aria-hidden="true"></i>
                            {excelData.length - 1 + ' répondant(s) trouvé(s) !'}
                          </div>
                        )}

                        {/* Optional: Display the imported data (e.g., in a table) */}
                        {excelData.length > 0 && (
                          <div
                            className="table-responsive table-responsive-sm mt-2"
                            style={{ height: '15em' }}
                          >
                            <table
                              className="table table-sm align-middle table-borderless table-striped"
                              style={{ width: '100%', height: '', overflow: 'auto' }}
                            >
                              <thead className="header-sticky">
                                <tr>
                                  {excelData[0].map((headerTitle, index) => (
                                    <th
                                      className="text-uppercase"
                                      scope="col"
                                      key={'header-title-' + index}
                                    >
                                      {headerTitle}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {excelData.map((row, index) => {
                                  return index > 0 ? (
                                    <tr key={'row-' + index}>
                                      {row.map((r, index2) => (
                                        <td scope="row" key={'row-' + index + '-td-' + index2}>
                                          {r}
                                        </td>
                                      ))}
                                    </tr>
                                  ) : (
                                    ''
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {/*  */}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 py-0">
                    	<button type="submit" className="btn custom-btn-success text-white importModalBtnSave" name="btn-add-import">
                      		<i className="fa fa-check me-1" aria-hidden="true"></i>Valider
                    	</button>
                    	<button type="button" className="btn custom-btn-secondary importModalBtnCancel" data-bs-dismiss="modal" onClick={handleCancelImportForm}>
                      		<i className="fa fa-close me-1" aria-hidden="true"></i>Fermer
                    	</button>
                    	<button ref={importFormBtnResetRef} type="reset" className="btn d-none">
                      		<i className="fa fa-refresh me-1" aria-hidden="true"></i>Reset
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
