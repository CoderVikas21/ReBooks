import React from 'react'

const CTAButton = ({onClick , content}) => {
  return (
    <>     
        <button onClick={onClick} class="button">
        <p>{content}</p>
        </button>
    </>
  )
}

export default CTAButton
