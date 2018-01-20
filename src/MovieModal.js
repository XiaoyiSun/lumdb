import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Movie';
import Overdrive from 'react-overdrive';
import loading from './loading.svg';
import { LoadingWrapper } from './MovieDetail';
import { apiKey } from './MoviesList';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

class MovieModal extends Component {
  state = {
    movie: {},
    errMsg: '',
  }
  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=${apiKey}&language=en-US`);
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
        <MovieModalInfo>
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
        </MovieModalInfo>
      );
    }
  }
}

const MovieModalInfo = styled.div`
  background-color: white;
  width: 50%;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > div {
    margin-left: 1rem;
  }
  img {
    position: relative;
    top: -1.1rem;
  }
`;

export default MovieModal;
