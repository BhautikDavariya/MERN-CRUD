
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';

function ActionButton(props) {
    const {item, editBtn, deleteBtn} = props

  return (
    <>
        <div><button className='btn px-2 text-primary fs-3 border-0' onClick={() => editBtn(item.id)}><FontAwesomeIcon icon={faPenToSquare}/></button></div>
        <div><button  className='btn px-2 pe-0 text-danger fs-3 border-0' onClick={() => deleteBtn(item.id)}><FontAwesomeIcon icon={faTrash}/></button></div>
    </>
  )
}

export default ActionButton