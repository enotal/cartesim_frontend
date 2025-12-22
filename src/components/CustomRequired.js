export const CustomRequired = ({ tagP }) => {
  return (
    <>
      <small className="">
        {tagP && 'Champ obligatoire'}
        <span className="text-danger ms-1">*</span>
      </small>
    </>
  )
}
