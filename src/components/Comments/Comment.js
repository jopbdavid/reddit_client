import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './Comment.css';
import {Avatar} from '../Posts/Avatar';


export const Comment = (props) => {
    const { comment } = props; // descontrução do obj comment passado em props do elemento Post

    return (
        <div className='comment'>
            <div className='comment-metadata'>
                <Avatar name={comment.author}/>
                <p className='comment-author'>{comment.author}</p>
                <p className='comment-created-time'>{moment.unix(comment.created_utc).fromNow()}</p>

            </div>
            <ReactMarkdown source={comment.body}/>
        </div>
    )
}