import axios from 'axios';

const searchMovies = async searchTerm => {
    const movies = await axios.get(`https://movies-api-dch.herokuapp.com/search?term=${searchTerm}`);

    return movies.data;
};

const service = {
    searchMovies
}

export default service