import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import service from './search-movies-service';

test('should not fetch movies when search term is not provided', async () => {
    jest.spyOn(service, 'searchMovies');

    const {getByPlaceholderText} = render(<App />);

    getByPlaceholderText('Search Movie');
    expect(service.searchMovies).toHaveBeenCalledTimes(0);
});

test('should fetch movies', async () => {
    jest.spyOn(service, 'searchMovies').mockResolvedValue([
        {
            title: 'John Wick'
        }
    ]);

    const {getByPlaceholderText} = render(<App/>);

    const input = getByPlaceholderText('Search Movie');
    fireEvent.change(input, {target: {value: 'John Wick'}});
    
    expect(await screen.findByText('John Wick')).toBeInTheDocument();
});
