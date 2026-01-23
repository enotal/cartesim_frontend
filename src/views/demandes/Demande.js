import React, { useEffect, useState, useRef } from 'react'
// Datatables
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
//
import { getData, getItem, createItem, updateItem, deleteItem } from '../../apiService'
import { CustomRequired } from '../../components/CustomRequired'
import { CustomIndexAlert } from '../../components/CustomIndexAlert'
import { CustomCreateAlert } from '../../components/CustomCreateAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../../constants'
import { isEmpty } from 'validator'
//
const Demande = ({ auth }) => {
  const tableRef = useRef()
  const unlinksimFormRef = useRef()
  const linksimtodemandeFormRef = useRef()
  const createFormRef = useRef()
  const deleteFormRef = useRef()
  const createFormBtnLaunchRef = useRef()
  const createFormBtnCloseRef = useRef()
  const createFormBtnResetRef = useRef()
  const showModalBtnLaunchRef = useRef()
  const deleteFormBtnLaunchRef = useRef()
  const deleteFormBtnCloseRef = useRef()
  const unlinksimFormBtnLaunchRef = useRef()
  const unlinksimFormBtnCloseRef = useRef()
  const linksimtodemandeFormBtnLaunchRef = useRef()
  const linksimtodemandeFormBtnCloseRef = useRef()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [indexAlert, setIndexAlert] = useState(null)
  const [createAlert, setCreateAlert] = useState(null)
  const [linkAlert, setLinkAlert] = useState(null)
  const [createFormAction, setCreateFormAction] = useState(null)
  const [sessiondemandes, setSessiondemandes] = useState([])
  const [sites, setSites] = useState([])
  const [regions, setRegions] = useState([])
  const [sims, setSims] = useState([])
  const exportConstants = { title: 'Liste des demandes', columns: [1, 2, 3, 4, 5, 6] }

  const apiResource = {
    get: 'demandes',
    show: 'demandes/:id',
    create: 'demandes',
    update: 'demandes/:id',
    delete: 'demandes/:id',
  }

  const columns = [
    { title: 'ID', data: 'id' },
    { title: 'CODE', data: 'dmdcode' },
    {
      title: 'REPONDANT',
      data: null,
      render: (data, type, row) => {
        return row.repondant.repidentifiant
      },
    },
    {
      title: 'SESSION DEMANDE',
      data: null,
      render: (data, type, row) => {
        const dd = new Date(row.sessiondemande.seddatedebut)
        const df = new Date(row.sessiondemande.seddatefin)
        return dd.toLocaleDateString() + ' au ' + df.toLocaleDateString()
      },
    },
    {
      title: 'SESSION REMISE',
      data: null,
      render: (data, type, row) => {
        if (row.sessionremise !== null) {
          const dd = new Date(row.sessionremise.seddatedebut)
          const df = new Date(row.sessionremise.seddatefin)
          return dd.toLocaleDateString() + ' au ' + df.toLocaleDateString()
        }
        return ''
      },
    },
    {
      title: 'SITE',
      data: null,
      render: (data, type, row) => {
        return `<div class="d-flex align-content-center justify-content-center ${row.site ? 'text-success' : 'text-danger'}"><i class="fa fa-circle " aria-hidden="true"></i></div>`
      },
    },
    {
      title: 'SIM',
      data: null,
      render: (data, type, row) => {
        return row.sim ? row.sim.simcode : ''
      },
    },
    {
      title: 'ACTIONS',
      data: null,
      render: (data, type, row) => {
        const ns = sims
        // console.log(ns)
        // const btnLinkSimToProvince =
        //   pr.length > 0 && ns.length > 0
        //     ? `<a class="btn btn-outline-warning me-1 table-btn tableActionBtnLinkSimToProvinceItem" data-id="${row.id}" data-nbr="${ns.length}" data-prv="${pr.length}" title="Répartir les cartes SIM entre les provinces"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>`
        //     : ''
        // const btnUnlinkSim =
        //   ns.length > 0
        //     ? `<a class="btn btn-outline-warning me-1 table-btn tableActionBtnUnlinkSimItem" data-id="${row.id}" data-nbr="${ns.length}" title="Dissocier les cartes SIM"><i class="fa fa-close" aria-hidden="true"></i></a>`
        //     : ''

        const btnLinkToDemande = `<a class="btn btn-outline-warning me-1 tableActionBtn tableActionBtnLinkSimToDemandeItem" data-id="${row.id}" title="Associer une carte SIM"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>`
        const btnEdit = `<a class="btn btn-outline-info me-1 tableActionBtn tableActionBtnEditItem" data-id="${row.id}" title="Editer"><i class="fa fa-edit" aria-hidden="true"></i></a>`
        const btnDelete = `<a class="btn btn-outline-danger tableActionBtn tableActionBtnDeleteItem" data-id="${row.id}" title="Supprimer"><i class="fa fa-trash" aria-hidden="true"></i></a>`
        return `<div class="d-flex align-content-center justify-content-center">${btnLinkToDemande + btnEdit + btnDelete}</div>`
      },
    },
  ]

  const fetchGet = async () => {
    try {
      const data = await getData(apiResource.get)
      const r = auth.roles.includes('administrateur')
        ? data
        : auth.region !== null
          ? data.filter(
              (item) => item.site.province && item.site.province.region_id === auth.region.id,
            )
          : data
      setData(
        auth.roles.includes('administrateur')
          ? data
          : auth.region !== null
            ? data.filter(
                (item) =>
                  item.site &&
                  item.site.province &&
                  item.site.province.region_id === auth.region.id,
              )
            : data,
      )
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchGetSessiondemande = async () => {
    await getData('sessiondemandes')
      .then((response) => {
        setSessiondemandes(response)
      })
      .catch((err) => console.log(err))
  }

  const fetchGetRegion = async () => {
    await getItem('regions_getactive')
      .then((response) => {
        const r = response.data
        const rgn = auth.region !== null ? r.filter((item) => item.id === auth.region) : r
        // Sim de la région
        const s = []
        rgn.map((item, index) => {
          if (item.sims) {
            let m = item.sims.filter((sim) => sim.demande_id === null)
            if (m.length > 0) {
              s.push(m)
            }
          }
        })
        setSims(s)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // let timerId = setInterval(() => {
    fetchGet()
    fetchGetSessiondemande()
    fetchGetRegion()
    // }, 2000)
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
        layout: {
          top1Start: {
            buttons: [
              {
                text: '<i class="fa fa-plus me-1" aria-hidden="true"></i>Ajouter',
                className: 'dt-btn datatable-button rounded dt-btnCreate btnCreate',
                enabled: sessiondemandes && sites ? true : false,
                action: () => {
                  if (createFormRef.current && createFormBtnLaunchRef.current) {
                    setCreateAlert(null)
                    setCreateFormAction('create')
                    createFormRef.current.setAttribute('create-data-action', 'create')
                    createFormRef.current.setAttribute('create-data-id', '')
                    createFormBtnLaunchRef.current.click()
                  }
                },
              },
              {
                text: '<i class="fa fa-trash me-1" aria-hidden="true"></i>Tout supprimer',
                className: 'dt-btn datatable-button rounded dt-btnCreate btnDeleteAll ms-2',
                enabled: data.length > 0 ? true : false,
                action: () => {
                  if (deleteFormRef.current && deleteFormBtnLaunchRef.current) {
                    setIndexAlert(null)
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
                filename: exportConstants.title,
                download: 'open',
                exportOptions: {
                  columns: exportConstants.columns,
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
                filename: exportConstants.title,
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

  // === Link sim to region provinces
  $('#myTable tbody').on('click', '.tableActionBtnLinkSimToDemandeItem', async function (e) {
    e.preventDefault()
    setIndexAlert(null)
    setCreateAlert(null)
    const id = $(this).data('id')
    if (linksimtodemandeFormRef.current && linksimtodemandeFormBtnLaunchRef.current) {
      linksimtodemandeFormRef.current.setAttribute('data-iddemande', id)
      linksimtodemandeFormBtnLaunchRef.current.click()
    }
    /*await getItem(apiResource.show.replace(':id', id)).then((response) => {
      if (response.success) {
        setRegionProvinces(response.data.provinces)
        setRegionSims(response.data.sims.filter((item) => item.province_id === null))
        setSims(response.data.sims.filter((item) => item.province_id === null))
        if (linksimtoprovinceFormRef.current && linksimtoprovinceFormBtnLaunchRef.current) {
          linksimtoprovinceFormRef.current.setAttribute('data-id', id)
          linksimtoprovinceFormRef.current.setAttribute('data-nbr', nbr)
          linksimtoprovinceFormRef.current.setAttribute('data-prv', prv)
          linksimtoprovinceFormBtnLaunchRef.current.click()
        }
      } else {
        setIndexAlert(response)
      }
    })*/
  })

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
    setIndexAlert(null)
    setCreateAlert(null)
    const id = $(this).data('id')
    await getItem(apiResource.show.replace(':id', id)).then((response) => {
      if (response.success) {
        if (createFormRef.current && createFormBtnLaunchRef.current) {
          const r = response.data
          setCreateFormAction('edit')
          createFormRef.current.setAttribute('create-data-action', 'edit')
          createFormRef.current.setAttribute('create-data-id', id)
          $('#site').val(r.site_id)
          // $('#libelle').val(response.libelle)
          // $('input[name="active"][value="' + response.estactive + '"]').prop('checked', true)
          createFormBtnLaunchRef.current.click()
        }
      } else {
      }
    })
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
        await createItem(apiResource.create, formValues).then((response) => {
          if (response.success) {
            createFormBtnResetRef.current.click()
          }
          console.log(response)
          setCreateAlert(response)
        })
      }
      if (action === 'edit') {
        await updateItem(apiResource.update.replace(':id', id), formValues).then((response) => {
          if (response.success) {
            setIndexAlert(response)
            createFormBtnResetRef.current.click()
            createFormBtnCloseRef.current.click()
          } else {
            setCreateAlert(response)
          }
        })
      }
    }
    fetchGet()
  }
  // ===

  // === Delete item
  $('#myTable tbody').on('click', '.tableActionBtnDeleteItem', async function (e) {
    e.preventDefault()
    setIndexAlert(null)
    setCreateAlert(null)
    const id = $(this).data('id')
    await getItem(apiResource.show.replace(':id', id)).then((response) => {
      if (deleteFormRef.current && deleteFormBtnLaunchRef.current) {
        if (response.success) {
          deleteFormRef.current.setAttribute('delete-data-action', 'delete')
          deleteFormRef.current.setAttribute('delete-data-id', id)
          deleteFormBtnLaunchRef.current.click()
        } else {
          //
        }
      }
    })
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
        await deleteItem(apiResource.delete.replace(':id', id)).then((response) => {
          if (response.success) {
            deleteFormBtnCloseRef.current.click()
          }
          setIndexAlert(response)
        })
      }
    }
    fetchGet()
  }
  //
  // Filter sites by regions
  const handleRegion = async (e) => {
    const { name, value } = e.target
    if (!isEmpty(value)) {
      await getItem('regions/:id'.replace(':id', value)).then((response) => {
        const r = response.data
        const obj = $('#site')
        if (r) {
          if (r.provinces.length > 0) {
            let s = r.provinces[0].sites
            setSites(s)
            if (s.length > 0) {
              obj.prop('disabled', false)
            } else {
              obj.prop('disabled', true)
            }
          } else {
            obj.prop('disabled', true)
          }
        } else {
          obj.prop('disabled', true)
        }
      })
    }
  }
  // ===

  // === Link sims to region provinces

  const handleCancelLinksimtodemandeForm = () => {
    setIndexAlert(null)
    setCreateAlert(null)
    setLinkAlert(null)
  }

  const handleSubmitLinksimtodemandeForm = async (e) => {
    e.preventDefault()
    // récupération des données du formulaire
    const iddemande = e.target.getAttribute('data-iddemande')
    const idsim = e.target.getAttribute('data-idsim')
    if (linksimtodemandeFormRef.current && linksimtodemandeFormBtnCloseRef.current) {
      /*await createItem('sims/demandes/associer', data).then((response) => {
        if (response.success) {
          // linksimtoprovinceFormBtnCloseRef.current.click()
        }
        setLinkAlert(response)
      })*/
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
          {/* Alerts */}
          {indexAlert && (
            <div
              className="card mb-2"
              style={{
                backgroundColor: colors[indexAlert.type],
                borderColor: colors[indexAlert.type],
              }}
            >
              <div className="card-body py-1">
                <CustomIndexAlert alert={indexAlert} />
              </div>
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
                    {/* Alerts */}
                    {createAlert && (
                      <div
                        className="card mb-2"
                        style={{
                          backgroundColor: colors[createAlert.type],
                          borderColor: colors[createAlert.type],
                        }}
                      >
                        <div className="card-body py-1">
                          <CustomCreateAlert alert={createAlert} />
                        </div>
                      </div>
                    )}
                    {/* Required */}
                    <div className="d-flex pb-1">
                      <CustomRequired tagP={true} />
                    </div>
                    {/*  */}
                    <div className="card">
                      <div className="card-body">
                        {/* Sessions de demande */}
                        <div className="mb-2">
                          <label htmlFor="sessiondemande" className="form-label mb-0">
                            Session de demande
                            <CustomRequired />
                          </label>
                          <div className="">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="sessiondemande"
                              name="sessiondemande"
                              required
                            >
                              <option value="">Sélectionner ici !</option>
                              {sessiondemandes.map((sessiondemande, index) => (
                                <option
                                  value={sessiondemande.id}
                                  key={'sessiondemande-item-' + index}
                                >
                                  {index +
                                    1 +
                                    '. du ' +
                                    sessiondemande.seddatedebut +
                                    ' au ' +
                                    sessiondemande.seddatefin}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Région du site désiré pour la remise */}
                        <div className="my-2">
                          <label htmlFor="region" className="form-label mb-0 fw-bolder">
                            Région du site désiré pour la remise
                            <CustomRequired />
                          </label>
                          <div className="">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="region"
                              name="region"
                              required
                              onChange={handleRegion}
                            >
                              <option value="">Sélectionner ici !</option>
                              {regions.map((region, index) => (
                                <option value={region.id} key={'region-item-' + index}>
                                  {index + 1 + '. ' + region.rgnnom + ', ' + region.rgncheflieu}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Site */}
                        <div className="mb-2">
                          <label htmlFor="site" className="form-label mb-0">
                            Site désiré pour la remise
                            <CustomRequired />
                          </label>
                          <div className="">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="site"
                              name="site"
                              required
                            >
                              <option value="">Sélectionner ici !</option>
                              {sites.map((site, index) => (
                                <option value={site.id} key={'site-item-' + index}>
                                  {index + 1 + '. ' + site.sitlibelle}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Identifiant & Date */}
                        <div className="row mb-2">
                          {/* Identifiant */}
                          <div className="col-md-6 mb-2">
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
                              />
                            </div>
                          </div>
                          {/* Date */}
                          <div className="col-md-6 mb-2">
                            <label htmlFor="date" className="form-label mb-0">
                              Date
                              <CustomRequired />
                            </label>
                            <div className="">
                              <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                required
                              />
                            </div>
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
                      className="btn custom-btn-secondary btn-submit"
                      data-bs-dismiss="modal"
                      onClick={handleCancelDeleteForm}
                    >
                      <i className="fa fa-close me-1" aria-hidden="true"></i>
                      Annuler
                    </button>
                    <button type="submit" className="btn custom-btn-danger">
                      <i className="fa fa-trash me-1" aria-hidden="true"></i>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Link SIM to province form */}
          <form
            ref={linksimtodemandeFormRef}
            onSubmit={handleSubmitLinksimtodemandeForm}
            method="POST"
            encType=""
            data-iddemande=""
            data-idsim=""
          >
            <button
              ref={linksimtodemandeFormBtnLaunchRef}
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#linksimtodemandeModal"
            >
              <i className="fa fa-trash me-2" aria-hidden="true"></i>Launch static backdrop modal
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="linksimtodemandeModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="linksimtodemandeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header py-1 bg-primary">
                    <h5 className="modal-title fw-bold text-light" id="linksimtodemandeModalLabel">
                      <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>Associer à la
                      demande
                    </h5>
                    <button
                      ref={linksimtodemandeFormBtnCloseRef}
                      type="button"
                      className="btn-close d-none"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body pb-0">
                    {/* Total */}
                    <div
                      className="card mb-2"
                      style={{ backgroundColor: '#056709', borderColor: '#056709' }}
                    >
                      <div className="card-body py-1 text-light text-center">
                        {'Associer une des ' + sims.length + ' carte(s) sim à la demande'}
                      </div>
                    </div>
                    {/*  */}
                    {/* Alerts */}
                    {linkAlert && (
                      <div
                        className="card mb-2"
                        style={{
                          backgroundColor: colors[linkAlert.type],
                          borderColor: colors[linkAlert.type],
                        }}
                      >
                        <div className="card-body py-1">
                          <CustomCreateAlert alert={linkAlert} />
                        </div>
                      </div>
                    )}
                    {/*  */}
                    {/* List of sim cards */}
                    <div className="table-responsive table-responsive-sm">
                      <table className="table table-sm table-striped">
                        <thead>
                          <tr className="text-start">
                            <td scope="col">ID</td>
                            <td scope="col">NUMERO</td>
                            <td scope="col">CODE</td>
                          </tr>
                        </thead>
                        <tbody>
                          {sims.map((sim, index) => (
                            <tr key={'sim-item-' + index} className="text-start">
                              <th scope="row">{sim.id}</th>
                              <td>{sim.simnumero}</td>
                              <td>{sim.simcode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/*  */}
                  </div>
                  <div className="modal-footer border-0 py-1">
                    <button
                      type="button"
                      className="btn custom-btn-secondary btn-submit"
                      data-bs-dismiss="modal"
                      onClick={handleCancelLinksimtodemandeForm}
                    >
                      <i className="fa fa-close me-1" aria-hidden="true"></i>
                      Fermer
                    </button>
                    <button type="submit" className="btn custom-btn-success">
                      <i className="fa fa-check me-1" aria-hidden="true"></i>
                      Valider
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

export default Demande
