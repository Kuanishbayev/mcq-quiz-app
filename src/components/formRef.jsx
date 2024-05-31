import React, { useRef } from 'react'

const FormRef = () => {
    const questionRef = useRef()

    const handleCheck = () => {
        console.log(questionRef.current[0])
    }

  return (
    <form ref={questionRef}>
        <label>
            <input type="radio" name='one' />
            One
        </label>
        <br />
        <label>
            <input type="radio" name='one' />
            Two
        </label>
        <br />
        <label>
            <input type="radio" name='one' />
            Three
        </label>
        <br />
        <label>
            <input type="radio" name='one' />
            Four
        </label>
        <button type='button' onClick={handleCheck}>Check</button>
    </form>
  )
}

export default FormRef