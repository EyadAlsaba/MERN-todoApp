import Styles from '@/styles/task.module.css'
import { useState, useContext } from 'react'
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'
import { ClientContext } from '@/context/clientHandlers';

export default function Tasks({ title, date, note, priority, _id }) {

  const [open, setOpen] = useState(false);
  const [DATE, SETdate] = useState(date);
  const [NOTE, SETnote] = useState(note);
  const [PRIORITY, SETpriority] = useState(priority);
  const { deleteTask } = useContext(ClientContext);

  function dropMenu() {
    document.getElementById(`${_id}`).classList.toggle(`${Styles.show}`)
    setOpen(!open)
  }

  function deleteHandler() {
    deleteTask(_id);
    location.reload();
  };

  return (
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
                <option value='heigh'>heigh</option>
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
  )
}

