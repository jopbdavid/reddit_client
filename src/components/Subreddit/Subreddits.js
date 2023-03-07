import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSubreddits, selectSubreddits } from "../../store/subRedditSlice"
import {selectSelectedSubreddit, setSelectedSubreddit} from "../../store/redditSlice"
import { Card } from "../Posts/Card"
import "./Subreddits.css"

export const Subreddits = () => {

const subreddits = useSelector(selectSubreddits)
const dispatch = useDispatch();
const selectedSubreddit = useSelector(selectSelectedSubreddit)

useEffect(() => {
  dispatch(fetchSubreddits());
}, [dispatch])

return(
    <Card className="subreddit-card">
      <h2>Subreddits</h2>
      <ul className="subreddits-list">
          {subreddits.map((subreddit) => {
            return <li key={subreddit.key}
                className={`${
                  selectedSubreddit === subreddit.url && `selected-subreddit`
                }`}
            >
              <button type="button" onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}>
              <img src={
                  subreddit.icon_img ||
                  `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                } 
                alt={`${subreddit.display_name}`}
                className="subreddit-icon"
                style={{ border: `3px solid ${subreddit.primary_color}` }}
              />
                {subreddit.display_name}
              </button>
              
            </li>
          })}
      </ul> 
    </Card>
)



}