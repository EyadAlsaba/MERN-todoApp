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

/*
  const [title, setTitle] = useState('');
  const [failed, setFailed] = useState(false);

  const submitForm = async (e) => {
    const option = {
      method: 'POST',
      body: JSON.stringify({
        clientId,
        list_title: title
      }),
      headers: {
        'content-Type': 'application/json'
      }
    };

    const response = await fetch('api/server/addList', option);
    await response.json();

    if (!response.ok) {
      e.preventDefault();
      setFailed(true);
    } else {
      setFailed(false);
    }
  };
*/