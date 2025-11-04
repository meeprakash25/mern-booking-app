type Props = {
  selectedPrice?: number
  onChange: (value?: number) => void
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Select Max Price</h4>
      <select
        className="p-1 w-full border-blue-300 border-1 rounded-md"
        value={selectedPrice}
        onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
        <option value="">Select max price</option>
        {[1000, 10000, 20000, 30000, 40000, 50000].map((price) => (
          <option key={`price${price}`} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PriceFilter