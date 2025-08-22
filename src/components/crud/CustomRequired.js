import React from 'react'
import { FaStar } from 'react-icons/fa'

export const CustomRequired = ({ tagP, texte }) => {
  return (
    <>
      {tagP === 1 ? (
        <p className="">
          <small className="">
            <sup className="me-1 text-danger">
              <FaStar />
            </sup>
            {texte}
          </small>
        </p>
      ) : (
        <small className="">
          <sup className="me-1 text-danger">
            <FaStar />
          </sup>
          {texte}
        </small>
      )}
    </>
  )
}

