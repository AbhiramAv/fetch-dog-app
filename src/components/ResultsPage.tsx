// DogSearchComponent.tsx

import React, { Component } from 'react';
import api from '../api';
import DogCard from './DogDetails';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../css/styling.css'; // Import the CSS file

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogsResponse {
  data: Dog[];
}

interface BreedRequestParams {
  size: number;
  from: number;
  sort: string;
  breeds?: string[] | null;
}

interface SearchComponentState {
  dogs: Dog[];
  breeds: string[];
  error?: string;
  currentPage: number;
  itemsPerPage: 24;
  totalItems: number;
  sortDirection: 'asc' | 'desc';
  selectedBreeds: string[] | null;
  favoriteDogs: Dog[];
  matchResult?: { match: string }; // Add matchResult to state
}

interface DogSearchResponse {
  data: {
    next: string;
    prev: string;
    resultIds: string[];
    total: number;
  };
}

class DogSearchComponent extends Component<{}, SearchComponentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dogs: [],
      breeds: [],
      error: undefined,
      currentPage: 1,
      itemsPerPage: 24,
      totalItems: 0,
      sortDirection: 'asc',
      selectedBreeds: [],
      favoriteDogs: [],
    };
  }

  componentDidMount() {
    this.fetchDogs();
    this.fetchBreeds();
  }

  fetchBreeds = async () => {
    try {
      const response = await api.get('/dogs/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {
      console.error('Failed to fetch breeds', error);
    }
  };

  fetchDogs = async () => {
    try {
      const { currentPage, itemsPerPage, sortDirection, selectedBreeds } = this.state;

      const response: DogSearchResponse = await api.get('/dogs/search', {
        params: {
          size: itemsPerPage,
          from: (currentPage - 1) * itemsPerPage,
          sort: `breed:${sortDirection}`,
          breeds: selectedBreeds,
        } as BreedRequestParams,
      });

      const dog_id_list: string[] = response.data.resultIds.slice(0, itemsPerPage);

      const dogDetails: DogsResponse = await api.post('/dogs', dog_id_list);
      this.setState({
        dogs: dogDetails.data as Dog[],
        totalItems: response.data.total,
        error: undefined,
      });
    } catch (error) {
      this.setState({ dogs: [], error: 'Failed to fetch dogs' });
    }
  };

  handlePageChange = (newPage: number) => {
    this.setState({ currentPage: newPage }, this.fetchDogs);
  };

  handleSortChange = () => {
    this.setState(
      (prevState) => ({
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
      }),
      this.fetchDogs
    );
  };

  handleBreedFilterChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    const selectedBreeds = value ? [value] : [];
    this.setState({ selectedBreeds, currentPage: 1 }, this.fetchDogs);
  };

  toggleFavorite = (dog: Dog) => {
    const { favoriteDogs } = this.state;
    const isFavorite = favoriteDogs.some((favDog) => favDog.id === dog.id);

    if (isFavorite) {
      const updatedFavorites = favoriteDogs.filter((favDog) => favDog.id !== dog.id);
      this.setState({ favoriteDogs: updatedFavorites });
    } else {
      this.setState((prevState) => ({
        favoriteDogs: [...prevState.favoriteDogs, dog],
      }));
    }
  };

  generateMatch = async () => {
    try {
      const { favoriteDogs } = this.state;
      const favoriteDogIds = favoriteDogs.map((favDog) => favDog.id);
  
      // Log the favoriteDogIds being sent to /dogs/match
      console.log('Favorite Dog IDs:', favoriteDogIds);
  
      const generateMatch = await api.post('/dogs/match', favoriteDogIds);
  
      // Log the response from /dogs/match
      console.log('Match Generation Response:', generateMatch);
  
      const matchResponse = await api.post('/dogs', generateMatch);
  
      // Log the response from /dogs
      console.log('Fetching Matched Dogs Response:', matchResponse);
  
      this.setState({ matchResult: matchResponse.data });
    } catch (error) {
      console.error('Failed to generate match', error);
    }
  };

  render() {
    const {
      dogs,
      breeds,
      error,
      currentPage,
      itemsPerPage,
      totalItems,
      sortDirection,
      favoriteDogs,
      matchResult,
    } = this.state;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="container">
        <h2>Dog Search Results</h2>
        {error && <p className="error-message">Error: {error}</p>}
        <div className="filter-container">
          <div>
            <label>
              Sort Direction:
              <select value={sortDirection} onChange={this.handleSortChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
            <label>
              Filter by Breed:
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={breeds}
                sx={{ width: 300 }}
                onChange={this.handleBreedFilterChange}
                renderInput={(params) => <TextField {...params} label="Breed" />}
              />
            </label>
          </div>
          <div>
            <button className="generate-match" onClick={this.generateMatch}>
              Generate Match
            </button>
          </div>
        </div>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id} className="card">
              <DogCard dog={dog} />
              <button
                onClick={() => this.toggleFavorite(dog)}
                className={favoriteDogs.some((favDog) => favDog.id === dog.id) ? 'remove-favorite' : 'add-favorite'}
              >
                {favoriteDogs.some((favDog) => favDog.id === dog.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => this.handlePageChange(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
        {matchResult && (
          <div>
            <h2>Match Result</h2>
            <p>Match ID: {matchResult.match}</p>
            {dogs.map((dog) => {
              if (dog.id === matchResult.match) {
                return (
                  <div key={dog.id}>
                    <h3>Matched Dog Information</h3>
                    <DogCard dog={dog} />
                    {/* Add any additional details you want to display */}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DogSearchComponent;
