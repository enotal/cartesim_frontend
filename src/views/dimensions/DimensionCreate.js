import { CustomRequired } from '../../components/crud/CustomRequired'

const DimensionCreate = ({ thematiques }) => {
  return (
    <div>
      <div className="mb-2 row">
        <label htmlFor="thematique" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Thématiques
        </label>
        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            id="thematique"
            name="thematique"
            required
            autoFocus
          >
            <option value="">Sélectionner ici !</option>
            {thematiques.map((thematique, index) => {
              return (
                <option key={'thematique' + index} value={thematique.id}>
                  {thematique.libellelong}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="libelle" className="col-form-label py-0">
          <CustomRequired tagP={0} />
          Libellé
        </label>
        <div className="">
          <input type="text" className="form-control" id="libelle" name="libelle" required />
        </div>
      </div>
    </div>
  )
}

export default DimensionCreate
