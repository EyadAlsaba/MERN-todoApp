import Styles from '@/styles/NewTask.module.css'
import { MdOutlineAdd } from 'react-icons/md'
import { useState, useContext } from 'react'
import { ClientContext } from '@/context/clientHandlers.js';
import { useRouter } from 'next/router';
import toast, { Toaster } from "react-hot-toast";

export default function NewTask() {
  const { query } = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const { addNewTask } = useContext(ClientContext);

  async function handleSubmit(e) {
    e.preventDefault();
    await addNewTask({ taskTitle, query });
    setTaskTitle('');
    toast.success("Successfully added the new task.");
  }

  return (
    <>
      <div className={Styles.formCon}>
        <form className={Styles.formNewTask} onSubmit={handleSubmit}>
          <MdOutlineAdd />
          <input type='text' placeholder='new task...' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} autoFocus required />
          {
            taskTitle ? <button type='submit' className={Styles.btn}>Add</button> : null
          }
        </form>
      </div>
      <Toaster toastOptions={{ position: "bottom-center" }} />
    </>
  )
}
