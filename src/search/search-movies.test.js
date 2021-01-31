import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import service from './search-movies-service';
import Chance from 'chance';
const chance = new Chance();

test('should not fetch movies when search term is not provided', async () => {
    jest.spyOn(service, 'searchMovies');

    const {getByPlaceholderText} = render(<App />);

    getByPlaceholderText('Search Movie');
    expect(service.searchMovies).toHaveBeenCalledTimes(0);
});

test('should fetch movies', async () => {
    const movieTitle = chance.word();

    jest.spyOn(service, 'searchMovies').mockResolvedValue([
        {
            title: movieTitle
        }
    ]);

    const {getByPlaceholderText} = render(<App/>);

    const input = getByPlaceholderText('Search Movie');
    fireEvent.change(input, {target: {value: movieTitle}});
    
    expect(await screen.findByText(movieTitle)).toBeInTheDocument();
});
