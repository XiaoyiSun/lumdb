import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends Component {
  state = {
    movies: [],
    errMsg: '',
  }
  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=xxxxxx&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      if (res.ok) {
        const movies = await res.json();
        this.setState({
          movies: movies.results,
        });
      } else {
        this.setState({
          errMsg: `${res.status} ${res.statusText}`,
        });
      }
    } catch(e) {
      // a fetch() promise rejects with a TypeError when a network error is encountered, although this usually means a permissions issue or similar. An accurate check for a successful fetch() would include checking that the promise resolved, then checking that the Response.ok property has a value of true. An HTTP status of 404 does not constitute a network error.
      console.log(e);
    }
  }
  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
