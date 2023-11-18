import React, { Component } from 'react';
import api from '../src/api';
import DogCard from './DogDetails';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
  sortDirection: 'asc' | 'desc';
  selectedBreeds: string[] | null;
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
      sortDirection: 'asc',
      selectedBreeds: [],
    };
  }

  componentDidMount() {
    // Fetch data when the component mounts
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
      const { currentPage, sortDirection, selectedBreeds } = this.state;

      const response: DogSearchResponse = await api.get('/dogs/search', {
        params: {
          size: 100,
          from: (currentPage - 1) * 100,
          sort: `breed:${sortDirection}`,
          breeds: selectedBreeds,
        } as BreedRequestParams,
      });

      const dog_id_list: string[] = response.data.resultIds.slice(0, 100);

      const dogDetails: DogsResponse = await api.post('/dogs', dog_id_list);
      this.setState({ dogs: dogDetails.data as Dog[], error: undefined });
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

  render() {
    const { dogs, breeds, error, currentPage, sortDirection } = this.state;

    return (
      <div>
        <h2>Dog Search Results</h2>
        {error && <p>Error: {error}</p>}
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
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <DogCard dog={dog} />
            </li>
          ))}
        </ul>
        <div>
          {/* Pagination controls */}
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span> Page {currentPage} </span>
          <button onClick={() => this.handlePageChange(currentPage + 1)}>Next Page</button>
        </div>
      </div>
    );
  }
}

export default DogSearchComponent;
