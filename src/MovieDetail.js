import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Movie';
import loading from './loading.svg';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
    errMsg: '',
  }
  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=xxxxxx&language=en-US`);
      if (res.ok) {
        const movie = await res.json();
        setTimeout(() => this.setState({ movie }), 300);
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
    const { movie } = this.state;
    if (Object.keys(movie).length === 0) {
      return (
        <LoadingWrapper>
          <img src={loading} alt="loading icon" />
        </LoadingWrapper>
      );
    } else {
      return (
        <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
          <MovieInfo>
            {movie.poster_path &&
              <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            }
            <div>
              <h1>{movie.title}</h1>
              <h3>{movie.release_date}</h3>
              <p>{movie.overview}</p>
            </div>
          </MovieInfo>
        </MovieWrapper>
      );
    }
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
