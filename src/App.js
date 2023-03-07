
import './App.css';
import {Header} from './components/Header/Header';
import {Home} from './components/Home/Home';
import {Subreddits} from './components/Subreddit/Subreddits';
import React from 'react';

function App() {
return (
  <>
    <Header/>
      <main>
        <Home/>
      </main>
      <aside>
        <Subreddits/>
      </aside>
    
    </>
  );
}

export default App;
