import { useState, useEffect } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Styles from '@/styles/Lists.module.css'


export default function DeleteList({ infoProps }) {
  const [checked, setChecked] = useState(false);
  const handleSubmit = async (e) => {
    const option = {
      method: 'DELETE',
      body: JSON.stringify(infoProps),
      headers: {
        'content-Type': 'application/json'
      }
    };
    await fetch('api/server/deleList', option);
  };

  return (
    infoProps.index !== 0 ?
      <>
        <form onSubmit={handleSubmit} className={Styles.delForm}>
          <input type='checkBox' value={infoProps._id} onChange={() => setChecked(!checked)} checked={checked} />
          {
            checked ? <button type="submit" className={Styles.delBtn}><AiOutlineDelete /></button> : null
          }
        </form>

      </>
      :
      null
  )
}