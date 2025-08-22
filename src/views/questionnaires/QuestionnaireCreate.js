import $ from 'jquery'
import { CustomRequired } from '../../components/crud/CustomRequired'

const QuestionnaireCreate = ({ dimensions }) => {
  const iscloseds = ['non', 'oui']
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="numero" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Numéro
        </label>
        <div className="">
          <input type="text" className="form-control" id="numero" name="numero" required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-2">
          <label htmlFor="dateDebut" className="col-form-label py-0">
            <CustomRequired tagP={0} />
            Date début
          </label>
          <div className="">
            <input type="date" className="form-control" id="dateDebut" name="dateDebut" required />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="dateFin" className="col-form-label py-0">
            <CustomRequired tagP={0} />
            Date fin
          </label>
          <div className="">
            <input type="date" className="form-control" id="dateFin" name="dateFin" required />
          </div>
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="consigne" className="col-form-label py-0">
          Consignes
        </label>
        <div className="">
          <input type="text" className="form-control" id="consigne" name="consigne" />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="" className="col-form-label py-0">
          Fermé?
        </label>
        <div className="">
          {iscloseds.map((isclosed, index) => {
            return (
              <div className="form-check form-check-inline" key={'isClosed' + index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="isClosed"
                  id={'isClosed' + index}
                  value={isclosed}
                />
                <label className="form-check-label" htmlFor={'isClosed' + index}>
                  {isclosed}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireCreate
