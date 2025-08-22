import React from 'react'

const CustomShow = ({ showModalBtnLaunchRef, itemToShow, onHandleCloseShowForm }) => {
  return (
    <div>
      <button
        ref={showModalBtnLaunchRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#showModal"
      >
        <i className="fa fa-plus me-2" aria-hidden="true"></i>Launch demo static modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="showModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="showModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header py-1 bg-primary">
              <h5 className="modal-title  fw-bold text-light" id="createModalLabel">
                <div>
                  <i className="fa fa-eye me-1" aria-hidden="true"></i>Détails d'un élément
                </div>
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Fermer"
                onClick={onHandleCloseShowForm}
              ></button>
            </div>
            <div className="modal-body my-0 py-0">
              <table className="table">
                <tbody>
                  {itemToShow.map((item, index) => {
                    return (
                      <tr key={'item' + index}>
                        <td className="show-td-label fw-bolder text-nowrap">{item[0]}</td>
                        <td className="show-td-value">{item[1]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer border-0 pt-0 d-none">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                <i className="fa fa-close me-1" aria-hidden="true"></i>Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomShow
