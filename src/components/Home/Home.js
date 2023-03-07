import React, { useEffect } from "react";
import { AnimatedList } from "react-animated-list";
import "./home.css";
import { useDispatch, useSelector } from "react-redux" 
import { fetchComments, fetchPosts, selectFilteredPosts, setSearchTerm } from "../../store/redditSlice";
import {getRandomNumber} from "../../utils/getRandomNumber"
import {PostLoading} from "../Posts/PostLoading";
import {Post} from "../Posts/Post"

export const Home = () => {
    const reddit = useSelector((state) => state.reddit); //seletor para ir buscar o estado do reddit (definido no objeto redditSlice)
    const { isLoading, error, searchTerm, selectedSubreddit } = reddit; //descontrução do obj acima para utilização
    const posts = useSelector(selectFilteredPosts); //selector que vai buscar a informação da junção de dois seletores e dois estados (redditslice)
    const dispatch = useDispatch();


    // Hook que permite criar um side effect no componente homepage - garante também atualizar o state sempre que ocorre um update ao selected subreddit
    useEffect( () => {
        dispatch(fetchPosts(selectedSubreddit));
    },[selectedSubreddit]);

    // função para disparar o fetching dos comments quando é ligado o toggle comments.
    const onToggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index,permalink));
        }
        return getComments;
    }
    

//Rendering se loading o fetch request
if (isLoading){
    return(
        
            
            <AnimatedList animation="zoom">
                {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
            </AnimatedList>
        
        
    )
}

// Rendering se houver um error no fetch request
if (error){
    return(
        <div className="error">
            <h2>Failed to load posts.</h2>
            <button type="button"
            onClick={() => dispatch(fetchPosts(selectedSubreddit))}
            >Try again</button>
        </div>
    )
}

//Rendering se não existir resultados do fetch
if(posts.length === 0){
return(
    <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button"
        onClick={() => dispatch(fetchPosts(setSearchTerm("")))} //de acordo com a syntax do react o searchterm esta devido em state e setstate - setSearchTerm para reset ao state
        >Go home</button>
    </div>

    )
}
//Rendering se tudo OK - existem posts no array, sem erros e não estamos em loading
return(

    <div>
      
        {posts.map((post , index)=>{
            return <Post key={post.id} post={post} onToggleComments={onToggleComments(index)}/>
        })}
    
    </div>
)



}

