import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"

interface Props {
  children: React.ReactNode
  showSearchBar?: boolean
}

const Layout = ({ children, showSearchBar = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {showSearchBar && (
        <div className="container mx-auto">
          <SearchBar />
        </div>
      )}
      <div className="container mx-auto py-5 flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
