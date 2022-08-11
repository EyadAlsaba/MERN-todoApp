export default function Tasks({ list }) {
  // console.log(list)

  return (
    <>
      <div className="task">
        <h3>title: {list.title}</h3>
        <p>note: {list.note ? list.note : 'not specified'}</p>
        <p>date: {list.date ? list.date : 'not specified'}</p>
        <p>priority: {list.priority ? list.priority : 'not specified'}</p>
        <p className={list.priority ? `${list.priority}` : null}>{" "}</p>
      </div>
    </>
  )
}
