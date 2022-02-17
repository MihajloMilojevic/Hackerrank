import React, {useState, useEffect} from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {

    const [articlesState, setArticlesState] = useState([]);

    const sortByUpvotes = input => {
        let arr = [...input];
        arr.sort((a, b) => {
            return b.upvotes - a.upvotes;
        })
        return arr;
    }
    const sortByDate = input => {
        let arr = [...input];
        arr.sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        })
        return arr;
    }

    useEffect(() => {
        setArticlesState(sortByUpvotes(articles))
    }, [articles]);

    const handleUpvote = () => {
        setArticlesState(sortByUpvotes(articlesState));
    }

    const handleDate = () => {
        setArticlesState(sortByDate(articlesState));
    }

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button onClick={handleUpvote} data-testid="most-upvoted-link" className="small">Most Upvoted</button>
                <button onClick={handleDate} data-testid="most-recent-link" className="small">Most Recent</button>
            </div>
            <Articles articles={articlesState}/>
        </div>
    );

}

export default App;
