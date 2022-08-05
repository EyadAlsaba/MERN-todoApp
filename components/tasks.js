export default function Tasks({ list }) {

  console.log(list)
  return (
    <>
      <h3>Tasks</h3>
      {
        list && list.map((task, index) => {
          return (
            <div key={index}>
              <title>{task['list_title']}</title>
            </div>
          )
        })
      }
    </>
  )
}