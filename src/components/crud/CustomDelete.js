export const CustomDelete = ({
  deleteFormBtnLaunchRef,
  deleteFormBtnCloseRef,
  onHandleSubmitDeleteForm,
  onHandleCancelDeleteForm,
  deleteSet,
}) => {
  return (
    <form onSubmit={onHandleSubmitDeleteForm}>
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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Supprimer un enregistrement
              </h1>
              <button
                ref={deleteFormBtnCloseRef}
                type="button"
                className="btn-close d-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                Voulez-vous vraiment supprimer
                {deleteSet.length < 2
                  ? ' cet enregistrement ?'
                  : ' ces ' + deleteSet.length + ' enregistrements ?'}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-submit"
                data-bs-dismiss="modal"
                onClick={onHandleCancelDeleteForm}
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
  )
}
