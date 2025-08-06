import { RequiredField } from '../../../components/crud/RequiredField'

const TyperepondantCreate = () => {
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="libelle" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Libellé 
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelle"
            name="libelle"
            required
            autoFocus={true}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="code" className="col-form-label py-0">
          <RequiredField tagP={0} />
          Code
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            required
          />
        </div>
      </div>
    </div>
  )
}

export default TyperepondantCreate
