import React from "react";
import { Card } from "./Card";
import { TiArrowDownOutline, TiArrowDownThick, TiArrowUpOutline, TiArrowUpThick, TiMessage } from "react-icons/ti";
import Skeleton from 'react-loading-skeleton';
import Comment from "../Comments/Comment";
import "./Post.css";
import Avatar from './Avatar';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';

export const Post = (props) => {
    const { post, onToggleComments } = props; // descontrução dos props passados na página HOME quando há o rendering
    const [voteValue, setVoteValue] = useState(0); // Definião de state local para gerir os upvotes e downvotes nos posts

    const renderUpVote = () => {
        if (voteValue === 1) {
            return <TiArrowUpThick className="icon-action"/>;
        }
        return <TiArrowUpOutline className="icon-action"/>
    };
    const renderDownVote = () => {
        if (voteValue === 0) {
            return <TiArrowDownThick className="icon-action"/>;
        }
        return <TiArrowDownOutline className="icon-action"/>
    };
    const onHandleVote = (e) => { //Manipulação do rendering e styling dos upvotes e downvotes: se valores iguais = desativar arrow se != ativar verde(1) ou vermelho(-1);
        if (e === voteValue){
        setVoteValue(0);
        } else if(e === 1) {
        setVoteValue(1);
        }
        setVoteValue(-1);
    };

    const getVoteType = () => {
        if (voteValue === 1){
            return "up-vote";
        } else if(voteValue === -1) {
            return "down-vote";
        }
        return "";
    };
    const renderComments = () => { // Função para gerir o estado de visibilidade dos comentarios por post: 1) erros 2) loading 3) sucess => map function para listar e criação OBJ <Comment> para rendering
        if (post.errorComments) {   
            return (
                <div><h3>Error Loading Comments</h3></div>
            );
        }
        if (post.loadingComments) {
            return(
                <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                </div>
            );
        }
        if (post.showingComments) {
            return(
                <div>
                {post.comments.map((comment) => {
                    return (
                        <Comment comment={comment} key={comment.id}/>
                    )
                })}
                </div>
            )
        }
        return null;
    }

    return (
        <article key={post.id}>
            <Card>
                <div className="post-wrapper">
                    <div className="post-votes-container">
                        <button type="button" className={`icon-action-button up-vote ${
                        voteValue === 1 && "active" }`}
                        onClick={() => onHandleVote(1)}>
                        {renderUpVote()}
                        </button>
                        <p className={`posts-votes-value ${getVoteType()}`}>
                            {shortenNumber(post.ups, 1)}
                        </p>
                    </div>
                    <div className="post-votes-container">
                        <button type="button" className={`icon-action-button down-vote ${
                        voteValue === -1 && "active" }`}
                        onClick={() => onHandleVote(-1)}>
                        {renderDownVote()}
                        </button>
                    </div>
                    <div className="post-container">
                        <h3 className="post-title"> {post.title}</h3>
                        <div className="post-image-container">
                            <img className="post-image" src ={post.url} alt=""/>
                        </div>
                    

                    <div className="post-details">
                        <span className="author-details">
                          <Avatar name={post.author} />
                             <span className="author-username">{post.author}</span>
                        </span>
                         <span>{moment.unix(post.created_utc).fromNow()}</span>
                            <span className="post-comments-container">
                        <button
                             type="button"
                            className={`icon-action-button ${ //Botão para controlo do rendering dos comments
                             post.showingComments && 'showing-comments'
                             }`}
                            onClick={() => onToggleComments(post.permalink)}
                            aria-label="Show comments"
                             >
                            <TiMessage className="icon-action" />
                            </button>
                             {shortenNumber(post.num_comments, 1)}
                         </span>
                        </div>

                        {renderComments()}
                 </div>        
           
           
           
                </div>
            </Card>

        </article>
    );


};