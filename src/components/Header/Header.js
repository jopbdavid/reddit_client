import React, { useState, useEffect } from "react"
import "./header.css";
import { FaReddit } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";

export const Header = () => {

    const searchTerm = useSelector((state) => state.reddit.searchTerm) // seletor para recolher o searchTerm definido para o state no store.
    const [searchTermLocal, setSearchTermLocal] = useState(""); // Definição local de state que permite trabalhar o searchTerm localmente..
    const dispatch = useDispatch();

    const onSearchTermChange = (e) => {   // Passo 1 -> SearchTerm e alterado no input - função permite registo e armazenamento do valor no elemento local
        setSearchTermLocal(e.target.value);
    }

    const onSearchTermSubmit = (e) => { //Passo 2 -> O valor armazenado é enviado (submit) dispara um evento dispatch para o store (slice) - valor e alterado no state
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    }

    useEffect(() => { //passo 3 -> Hook que atualiza o valor local do searchTerm sempre que o state do store e atualizado (apesar de haver redundância? quando e alterado localmente e enviado o valor é sempre igual ao do store.)
        setSearchTermLocal(searchTerm);
    }, [searchTerm])



return(
    
      <header className="App-header">
        
        <div className="App-logo">
            <FaReddit className="logo-icon"/>
            <p>Jaybee's Reddit</p>
        </div>
        <form className="search" onSubmit={onSearchTermSubmit}>
            <input
            type="text"
            placeholder="Search"
            aria-label="Search Posts"
            onChange={onSearchTermChange}
            />
            <button type="submit" onSubmit={onSearchTermSubmit}>
                <HiOutlineSearch/>
            </button>
        </form>

      </header>
    
)

}