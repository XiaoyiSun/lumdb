import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import MovieModal from './MovieModal';
import MovieItem from './MovieItem';

class MoviesList extends Component {
  state = {
    movies: [],
    modalMovies: [],
    errMsg: '',
    show: false,
    showMovieId: '',
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
    try {
      const res2 = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=xxxxxx&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2');
      if (res2.ok) {
        const modalMovies = await res2.json();
        this.setState({
          modalMovies: modalMovies.results,
        });
      } else {
        this.setState({
          errMsg: `${res2.status} ${res2.statusText}`,
        });
      }
    } catch(e) {
      console.log(e);
    }
  }
  showModal = (id) => {
    this.setState({
      showMovieId: id,
      show: true,
    });
  }
  closeModal = (e) => {
    if (e.target.id === 'modal') {
      this.setState({
        show: false,
        showMovieId: '',
      });
    }
  }
  render() {
    return (
      <div>
        <MovieGrid>
          {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
        </MovieGrid>
        <MovieGrid>
          {this.state.modalMovies.map(movie => <MovieItem key={movie.id} movie={movie} showModal={this.showModal} />)}
        </MovieGrid>
        {this.state.show && 
          <MovieModalWrapper onClick={this.closeModal} id="modal">
            <MovieModal movieId={this.state.showMovieId} />
          </MovieModalWrapper>
        }
      </div>
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

const MovieModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
