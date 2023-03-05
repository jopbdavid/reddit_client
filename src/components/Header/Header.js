import React from "react"
import "./header.css";
import { FaReddit } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi"

export const Header = () => {

return(
    
      <header className="App-header">
        
        <div className="App-logo">
            <FaReddit className="logo-icon"/>
            <p>Jaybee's Reddit</p>
        </div>
        <form className="search">
            <input
            type="text"
            placeholder="Search"
            aria-label="Search Posts"
            />
            <button type="submit">
                <HiOutlineSearch/>
            </button>
        </form>

      </header>
    
)

}