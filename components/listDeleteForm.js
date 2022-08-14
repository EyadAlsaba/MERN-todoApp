import { useState, useEffect } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Styles from '@/styles/listDelForm.module.css'


export default function DeleteList({ list }) {

  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {
    const option = {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(list._id)
    };
    const requested = await fetch('api/server/deleList', option);
    await requested.json()
  }
  return (
    <form onSubmit={handleSubmit} className={Styles.delForm}>
      <input type='checkBox' value={list._id} onChange={() => setChecked(!checked)} checked={checked} />
      {
        checked ? <button type="submit" className={Styles.delBtn}><AiOutlineDelete /></button> : null
      }
    </form>
  )
}