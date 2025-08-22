import $ from 'jquery'
import { CustomRequired } from '../../components/crud/CustomRequired'

const ThematiqueCreate = ({ typerepondants }) => {
  const handleCheckBox = (e) => {
    var checkedValues = []
    $('input[name="typeRepondants[]"]:checked').each(function () {
      checkedValues.push($(this).val())
    })
    $('input[name="typeRepondant"]').val(checkedValues)
  }
  return (
    <div>
      {/* Libellé long */}
      <div className="mb-2 row">
        <label htmlFor="libelleLong" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Libellé long
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelleLong"
            name="libelleLong"
            required
            autoFocus={true}
          />
        </div>
      </div>

      {/* Libelllé court */}
      <div className="mb-2 row">
        <label htmlFor="libelleCourt" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Libellé court
        </label>
        <div className="">
          <input
            type="text"
            className="form-control"
            id="libelleCourt"
            name="libelleCourt"
            required
          />
        </div>
      </div>

      {/* Code */}
      <div className="mb-2 row">
        <label htmlFor="code" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Code
        </label>
        <div className="">
          <input type="text" className="form-control" id="code" name="code" required />
        </div>
      </div>

      {/* Type de répondant */}
      <div className="mb-2 row">
        <label htmlFor="" className="col-form-label py-0">
          Types de répondants
        </label>
        <div className="">
          {typerepondants.map((typerepondant, index) => {
            return (
              <div className="form-check" key={'typeRepondant' + index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={'typeRepondants' + index}
                  name="typeRepondants[]"
                  value={typerepondant}
                  onChange={handleCheckBox}
                />
                <label className="form-check-label" htmlFor={'typeRepondants' + index}>
                  {typerepondant}
                </label>
              </div>
            )
          })}
        </div>
        <div className="d-none">
          <input type="text" className="form-control" id="typeRepondant" name="typeRepondant" />
        </div>
      </div>
    </div>
  )
}

export default ThematiqueCreate
