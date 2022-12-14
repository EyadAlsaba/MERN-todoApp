import { useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Styles from '@/styles/Lists.module.css'


export default function DeleteList({ list }) {
  const [checked, setChecked] = useState(false);
  const handleSubmit = async () => {
    const option = {
      method: 'DELETE',
      body: JSON.stringify({ projectId: list._id }),
      headers: {
        'content-Type': 'application/json'
      }
    };
    await fetch('api/server/projectLists/deleList', option);
    location.reload()
  };

  return (
    list.list_title !== 'sample' ?
      <>
        <form className={Styles.delForm}>
          <input type='checkBox' value={list._id} onChange={() => setChecked(!checked)} checked={checked} />
        </form>
        {
          checked ?
            <button type="submit" className={Styles.delBtn} onClick={() => handleSubmit()}><AiOutlineDelete /></button>
            : null
        }
      </>
      :
      null
  )
}