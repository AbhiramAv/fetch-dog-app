import React, { Component } from 'react';
import api from '../src/api';
import DogCard from './DogDetails';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogsResponse {
    data: Dog[]
}

interface SearchComponentState {
  dogs: Dog[];
  error?: string;
  currentPage: number;
  sortDirection: 'asc' | 'desc';
  selectedBreed: string | null;
}

interface DogSearchResponse{
  data: {
    next: string;
    prev: string;
    resultIds: string[];
    total: number;
  }
}
class DogSearchComponent extends Component<{}, SearchComponentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dogs: [],
      error: undefined,
      currentPage: 1,
      sortDirection: 'asc',
      selectedBreed: null,
    };
  }

  componentDidMount() {
    // Fetch data when the component mounts
    this.fetchDogs();
  }

  fetchDogs = async () => {
    try {
      const { currentPage, sortDirection, selectedBreed } = this.state;

      const response : DogSearchResponse = await api.get('/dogs/search', {
        params: {
          size: 100, 
          from: (currentPage - 1) * 100,
          sort: `breed:${sortDirection}`,
          breed: selectedBreed,
        },
      });

      const dog_id_list : string[]= []

      console.log('result.resultIds?', response);
      response.data.resultIds.forEach((item) => {
        console.log('hit here??', item);
        dog_id_list.push(item as string);
      });


      const dogDetails: DogsResponse = await api.post('/dogs', dog_id_list);
      
      console.log('what are we getting', JSON.stringify(dogDetails));


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

  handleBreedFilterChange = (breed: string | null) => {
    this.setState({ selectedBreed: breed, currentPage: 1 }, this.fetchDogs);
  };

  render() {
    const { dogs, error, currentPage, sortDirection, selectedBreed } = this.state;

    console.log('hit here?', JSON.stringify(this.state))
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
            <input
              type="text"
              value={selectedBreed || ''}
              onChange={(e) => this.handleBreedFilterChange(e.target.value)}
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
