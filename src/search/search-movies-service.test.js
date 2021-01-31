import service from './search-movies-service';
import Chance from 'chance';
import axios from 'axios';
const chance = new Chance();

jest.mock('axios');
test('should call axios given search params', async () => {
    const expectedMovies = chance.n(() => ({name: chance.word()}), 10);
    const searchTerm = chance.word();
    
    axios.get.mockResolvedValue({
        data: expectedMovies
    });
    
    const actual = await service.searchMovies(searchTerm);

    expect(axios.get).toHaveBeenNthCalledWith(1, `https://movies-api-dch.herokuapp.com/search?term=${searchTerm}`);
    expect(actual).toEqual(expectedMovies);
});