  export const url = "https://www.reddit.com/"

  export const getSubRedditPosts = async (subreddit) => {
    const response = await fetch(`${url}/search.json?q=${subreddit}`);
    const json = await response.json();
    
    return json.data.children.map((post)=> post.data)   
};

 export const getSubReddits = async () => {
    const response = await fetch(`${url}subreddits.json`)
    const json = await response.json();

    return json.data.children.map(subreddit => subreddit.data)
};

export const getPostComments = async (permalink) => {
    const response = await fetch (`${url}${permalink}.json`)
    const json = await response.json();

    
    return json[1].data.children.map(subreddit => subreddit.data)
}

