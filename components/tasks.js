import Styles from '@/styles/Task.module.css'
import { useState, useContext } from 'react'
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'
import { ClientContext } from '@/context/clientHandlers';
import { useRouter } from 'next/router';
import toast, { Toaster } from "react-hot-toast";

export default function Tasks({ taskProps }) {
  const { query } = useRouter();
  const { title, date, note, priority, _id } = taskProps;
  const [open, setOpen] = useState(false);
  const [DATE, SETdate] = useState(date);
  const [NOTE, SETnote] = useState(note);
  const [PRIORITY, SETpriority] = useState(priority);
  const { deleteTask, updateTask, getTodos } = useContext(ClientContext);

  function dropMenu() {
    document.getElementById(`${_id}`).classList.toggle(`${Styles.show}`)
    setOpen(!open)
  }

  async function deleteHandler() {
    // before we fire the function we could ask user for confirmation, 
    // it could be user click the button by a mistake!!!
    const isDeleted = await deleteTask(_id);
    if (isDeleted) {
      await getTodos(query.listId[1]);
      toast.success("Successfully deleted the task.");
    }
  };

  async function updateHandler() {
    // at least one property should be changed to fire the update function , 
    // otherwise we tell user there is no change on the task to update
    const isUpdated = await updateTask(DATE, NOTE, PRIORITY, _id, taskProps.listIndex, taskProps.taskIndex);
    if (isUpdated) {
      await getTodos(query.listId[1]);
      toast.success("Successfully updated the task.");
    }
  }


  return (
    <>
      <section className={Styles.container}>
        <div className={Styles.filler}>{" "}</div>
        <div className={Styles.taskHeader}>
          <h5>{title}</h5>
          <button className={Styles.arrowBtn} onClick={() => dropMenu()}>
            {
              open ? <MdArrowDropUp /> : <MdArrowDropDown />
            }
          </button>
        </div>

        <div id={`${_id}`} className={Styles.taskBody}>
          <div className={Styles.formContainer}>
            <div className={Styles.wrapper}>
              <div className={Styles.notes}>
                <label>note</label>
                <textarea type='text' name='note' placeholder='any important notes!' value={NOTE} onChange={(e) => SETnote(e.target.value)}>
                </textarea>
              </div>
              <div className={Styles.date}>
                <label>due date</label>
                <input type='date' name='date' value={DATE} onChange={(e) => SETdate(e.target.value)} />
                <label htmlFor="colors">priority</label>
                <select name='priority' id='colors' value={PRIORITY} onChange={(e) => SETpriority(e.target.value)}>
                  <option value='none'>none</option>
                  <option value='high'>high</option>
                  <option value='medium'>medium</option>
                  <option value='low'>low</option>
                </select>
              </div>
            </div>

            <div className={Styles.controller}>
              <button onClick={() => deleteHandler()}>delete</button>
              <button onClick={() => updateHandler()}>update</button>
            </div>
          </div>
        </div>
      </section>
      <Toaster toastOptions={{ position: "bottom-center" }} />
    </>
  )
}

