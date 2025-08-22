import { CustomRequired } from '../../components/crud/CustomRequired'

const RepondantCreate = ({ typerepondants }) => {
  return (
    <div>
      {/* Identifiant (matricule ou INE) */}
      <div className="mb-2 row">
        <label htmlFor="identifiant" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Identifiant (matricule ou INE)
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="identifiant"
            name="identifiant"
            required
            autoFocus={true}
          />
        </div>
      </div>

      {/* Types de répondant */}
      <div className="mb-2 row">
        <label htmlFor="typeRepondant" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Types de répondant
        </label>
        <div className="">
          {typerepondants.map((typerepondant, index) => {
            return ''
          })}
        </div>
      </div>
    </div>
  )
}

export default RepondantCreate
