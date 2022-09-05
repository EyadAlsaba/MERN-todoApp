import Styles from '@/styles/NewTask.module.css'
import { MdOutlineAdd } from 'react-icons/md'
import { useState, useContext } from 'react'
import { ClientContext } from '@/context/clientHandlers.js';
import { useRouter } from 'next/router';

export default function NewTask() {
  const { query } = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const { addNewTask } = useContext(ClientContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const isAdded = await addNewTask({ taskTitle, query });
    setTaskTitle('');
    if (isAdded) {
      location.reload();
    }
  }

  return (
    <div className={Styles.formCon}>
      <form className={Styles.formNewTask} onSubmit={handleSubmit}>
        <MdOutlineAdd />
        <input type='text' placeholder='new task...' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} autoFocus required />
        {
          taskTitle ? <button type='submit' className={Styles.btn}>Add</button> : null
        }
      </form>
    </div>
  )
}
