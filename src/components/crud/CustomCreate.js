import { CustomAlert } from './CustomAlert'
import { CustomRequired } from './CustomRequired'

export const CustomCreate = ({
  formRef,
  formAction,
  createFormBtnLaunchRef,
  createFormBtnCloseRef,
  createFormBtnResetRef,
  onHandleSubmitCreateForm,
  onHandleCancelCreateForm,
  alert,
  children,
  self,
}) => {
  return (
    <form
      ref={formRef}
      onSubmit={onHandleSubmitCreateForm}
      method="POST"
      encType="multipart/form-data"
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
                {formAction === 'create' && (
                  <div>
                    <i className="fa fa-plus me-1" aria-hidden="true"></i>Ajouter un élément
                  </div>
                )}
                {formAction === 'update' && (
                  <div>
                    <i className="fa fa-edit me-1" aria-hidden="true"></i>Editer un élément
                  </div>
                )}
              </h5>
              <button
                ref={createFormBtnCloseRef}
                type="button"
                className="btn-close d-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body my-0 py-0">
              <CustomRequired tagP={1} texte={'Champ obligatoire'} />
              <div>{formAction === 'create' ? <CustomAlert alert={alert} /> : ''}</div>
              {children}
            </div>
            <div className="modal-footer border-0 pt-0">
              <button type="submit" className="btn btn-primary createModalBtnSave">
                <i className="fa fa-save me-1" aria-hidden="true"></i>
                Enregistrer
              </button>
              <button
                type="button"
                className="btn btn-secondary createModalBtnCancel"
                data-bs-dismiss="modal"
                onClick={onHandleCancelCreateForm}
              >
                <i className="fa fa-close me-1" aria-hidden="true"></i>Annuler
              </button>
              <button ref={createFormBtnResetRef} type="reset" className="btn btn-secondary d-none">
                <i className="fa fa-refresh me-1" aria-hidden="true"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
