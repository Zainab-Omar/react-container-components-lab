import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

export default class SearchableMovieReviewsContainer extends Component{
    constructor(){
        super()
        this.state = {
            reviews: [],
            searchTerm: ""
        }
    }

    handleSubmission=(event)=>{
        event.preventDefault()
        fetch(URL.concat(this.state.searchTerm))
        .then(res => res.json())
        .then(json => {
            this.setState({reviews: json.results})
    })}

    handleChange = event => {
        this.setState({searchTerm: event.target.value})
    }
        
    render(){
        return(
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmission}>
                    <label>Search Movie Reviews:</label>
                    <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange}></input>
                    <input type="submit" />
                </form>

                {typeof this.state.reviews === 'object' &&
                this.state.reviews.length > 0 }
                <MovieReviews reviews={this.state.reviews} />

            </div>
        )
    }
}
