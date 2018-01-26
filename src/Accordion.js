import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { apiKey } from './MoviesList';

const BACKDROP_S_PATH = 'http://image.tmdb.org/t/p/w300';
const BACKDROP_L_PATH = 'http://image.tmdb.org/t/p/w780';
const TRAILER_PATH = 'https://www.youtube.com/embed/';

class Accordion extends Component {
  state = {
    trailerPath: '',
    selected: 0,
  }
  componentDidMount() {
    this.getVideo(0);
  }
  getVideo = async (i) => {
    try {
      console.log(`https://api.themoviedb.org/3/movie/${this.props.movies[i].id}/videos?api_key=${apiKey}&language=en-US`)
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.movies[i].id}/videos?api_key=${apiKey}&language=en-US`);
      const videos = await res.json();
      const fullPath = `${TRAILER_PATH}${videos.results[0].key}`;
      this.setState({
        trailerPath: fullPath,
        selected: i,
      })
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { movies } = this.props;
    return (
      <div style={{backgroundColor: '#111'}}>
        <p style={{ textAlign: 'left', color: '#eee', marginLeft: '1.5rem', marginTop: '0' }}>RECOMMENDATIONS</p>
        <AccordionHorizontal>
          {movies.map((movie, index) => (
            <AccordionItem key={index}>
              <p style={{color: 'white', position: 'absolute', bottom: 12, left: 10}}>{movie.title}</p>
              <AccordionItemImage
                src={`${BACKDROP_S_PATH}${movie.backdrop_path}`}
                alt={movie.title}
                active={index === this.state.selected}
                onClick={() => this.getVideo(index)}
              />
            </AccordionItem>
          ))}
        </AccordionHorizontal>
        <AccordionDetailWrapper>
          <AccordionBackground backdrop={`${BACKDROP_L_PATH}${movies[this.state.selected].backdrop_path}`} />
          <AccordionDetail>
            <iframe
              src={`${this.state.trailerPath}`}
              title={movies[this.state.selected].title}
              width='500'
              height='300'
              allowFullScreen={true}
            />
            <div style={{maxWidth: 400, padding: 20, textAlign: 'left', marginLeft: 30}}>
              <h2 style={{fontWeight: 600, fontSize: 27}}>{movies[this.state.selected].title}</h2>
              <p style={{fontSize: 14}}>{movies[this.state.selected].release_date}</p>
              <p style={{fontSize: 14, fontWeight: 100, marginBottom: 40}}>{movies[this.state.selected].overview}</p>
              <Link to={`/${movies[this.state.selected].id}`} style={{backgroundColor: 'transparent', color: 'white', border: '1px solid white', textDecoration: 'none', fontSize: 12, paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22}}>VISIT MOVIE PAGE</Link>
            </div>
          </AccordionDetail>
        </AccordionDetailWrapper>
      </div>
    );
  }
}

const AccordionHorizontal = styled.div`
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AccordionItem = styled.div`
  text-align: left;
  margin-left: 1.5rem;
  padding-bottom: 1rem;
  position: relative;
  cursor: pointer;
`;

const AccordionItemImage = styled.img`
  border: ${props => props.active ? '1.5px solid #eee' : '1.5px solid #111'};
`;

const AccordionDetailWrapper = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
`;

const AccordionBackground = styled.div`
  height: 400px;
  width: 100%;
  background-image: url(${props => props.backdrop});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: grayscale(1) blur(2px) brightness(20%);
`;

const AccordionDetail = styled.div`
  height: 100%;
  backgroundColor: transparent;
  position: absolute;
  top: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Accordion;
