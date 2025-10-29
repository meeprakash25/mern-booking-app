const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex flex-col justify-between items-center gap-0 sm:gap-5 sm:flex-row">
        <span className="text-3xl text-white font-bold tracking-tight">myholidays.com</span>
        <span className="text-white font-bold tracking-tight flex flex-col gap-0 sm:gap-4 xs:flex-row">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </span>
      </div>
    </div>
  )
}

export default Footer
