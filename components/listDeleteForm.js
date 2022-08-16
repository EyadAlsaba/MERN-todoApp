import { useState, useEffect } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Styles from '@/styles/Lists.module.css'


export default function DeleteList({ list }) {

  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {
    const option = {
      method: 'DELETE',
      body: JSON.stringify(list._id),
      headers: {
        'content-Type': 'application/json'
      }
    };
    const response = await fetch('api/server/deleList', option);
    await response.json()
  };

  return (
    list.list_title !== 'sample' ?
      <>
        <form onSubmit={handleSubmit} className={Styles.delForm}>
          <input type='checkBox' value={list._id} onChange={() => setChecked(!checked)} checked={checked} />
          {
            checked ? <button type="submit" className={Styles.delBtn}><AiOutlineDelete /></button> : null
          }
        </form>

      </>
      :
      null
  )
}