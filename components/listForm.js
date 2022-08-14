import Styles from '@/styles/ListForm.module.css'


export default function ListForm({ clientId }) {

  return (
    <>
      <div className={Styles.modal} id='modal'>
        <div className={Styles.modalContent}>
          <form action='api/server/addList' method='POST' className={Styles.formContent}>
            <input id='clientId' name='clientId' type='text' defaultValue={clientId} hidden />
            <label>list title</label>
            <input id='listTitle' name='list_title' type='text' placeholder='e.g. events' required />
            <input type="submit" value="ADD" />
          </form>
        </div>
      </div>
    </>
  )
};
