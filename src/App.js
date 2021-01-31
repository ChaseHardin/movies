import service from './search/search-movies-service';
import React, {useState, useEffect} from 'react';
import {DebounceInput} from 'react-debounce-input';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (searchTerm) {
        const response = await service.searchMovies(searchTerm);
        setMovies(response);
      }
    }
    
    fetch();
  }, [searchTerm])

  const handleOnSearch = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      <DebounceInput
          placeholder={'Search Movie'}
          minLength={2}
          debounceTimeout={300}
          onChange={handleOnSearch} />

      {movies.map(movie => <div key={movie.title}>{movie.title}</div>)}
    </div>
  )
}

export default App;
