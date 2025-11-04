export type Props = {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = []
  for (let i = 1; i <= pages; i++){
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center rounded-lg">
      <ul className="flex border border-blue-300 rounded">
        { pageNumbers.map((number) => (
          <li key={`page${number}`} className={ `px-3 py-1 ${page === number ? "bg-blue-400" : ""}` }>
            <button onClick={() => onPageChange(number)}>{ number }</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination