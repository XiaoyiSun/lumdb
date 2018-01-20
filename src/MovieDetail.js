import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Movie';
import Overdrive from 'react-overdrive';
import loading from './loading.svg';
import { apiKey } from './MoviesList';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
    errMsg: '',
  }
  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apiKey}&language=en-US`);
      if (res.ok) {
        const movie = await res.json();
        setTimeout(() => this.setState({ movie }));
      } else {
        this.setState({
          errMsg: `${res.status} ${res.statusText}`,
        });
      }
    } catch(e) {
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
              <Overdrive id={`${movie.id}`}>
                <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
              </Overdrive>
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

export const MovieInfo = styled.div`
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

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
