// DogSearchComponent.tsx

import React, { Component } from 'react';
import api from '../api';
import DogCard from './DogCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items vertically in the center */
  margin-bottom: 20px;

  div {
    width: relative;
    display: flex; /* Add a flex container for the labels */
    gap: 20px; /* Adjust the gap between Sort Direction and Filter by Breed */
  }
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }

    &.active {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #ddd;
      color: #666;
      cursor: not-allowed;
    }
  }
`;


// New styled component for card row
const CardRow = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

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
  itemsPerPage: number; // Corrected from `25` to `number`
  totalItems: number;
  sortDirection: 'asc' | 'desc';
  selectedBreeds: string[] | null;
  favoriteDogs: Dog[];
  matchResult?: { match: string };
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
      itemsPerPage: 25,
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

  handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout button clicked');
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
    const pageNumbers = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

    // Calculate the number of cards per row (change this as needed)
    const cardsPerRow = 5;
    const totalRows = Math.ceil(dogs.length / cardsPerRow);

    // Generate an array of row indices
    const rowIndices = Array.from({ length: totalRows }, (_, i) => i);

    return (
      <Container>
        <h2>Dog Search</h2>
        {error && <p className="error-message">Error: {error}</p>}
        <FilterContainer>
  <div>
    <label>
      Filter by Breed
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={breeds}
        sx={{ width: 300 }}
        onChange={this.handleBreedFilterChange}
        renderInput={(params) => <TextField {...params}  />}
      />
            </label>
            <label>
  Sort Direction
  <Autocomplete
    disablePortal
    id="sort-direction-autocomplete"
    options={['Ascending', 'Descending']}
    value={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
    onChange={(event, value) => {
      const newSortDirection = value === 'Ascending' ? 'asc' : 'desc';
      this.setState({ sortDirection: newSortDirection }, this.fetchDogs);
    }}
    style={{ width: "190px", fontSize: "14px" }}
    renderInput={(params) => <TextField {...params} />}
  />
</label>
  </div>
  <div>
    <StyledButton className="generate-match" onClick={this.generateMatch}>
      Generate Match
    </StyledButton>
  </div>
</FilterContainer>

        {rowIndices.map((rowIndex) => (
          <CardRow key={rowIndex} className="card-row">
            {dogs.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow).map((dog) => (
              <li key={dog.id} className="card">
                <DogCard
                  dog={dog}
                  onAddToFavorites={() => this.toggleFavorite(dog)}
                  isFavorite={favoriteDogs.some((favDog) => favDog.id === dog.id)}
                />
                <button
                  onClick={() => this.toggleFavorite(dog)}
                  className={favoriteDogs.some((favDog) => favDog.id === dog.id) ? 'remove-favorite' : 'add-favorite'}
                >
                  {favoriteDogs.some((favDog) => favDog.id === dog.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </li>
            ))}
          </CardRow>
        ))}
        <Pagination>
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
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
            Next
          </button>
        </Pagination>
        {/* Display Matched Dog Information */}
        {matchResult && (
          <div>
            <h2>Match Result</h2>
            <p>Match ID: {matchResult.match}</p>
            {dogs.map((dog) => {
              if (dog.id === matchResult.match) {
                return (
                  <div key={dog.id}>
                    <h3>Matched Dog Information</h3>
                    <DogCard
                      dog={dog}
                      onAddToFavorites={() => this.toggleFavorite(dog)}
                      isFavorite={favoriteDogs.some((favDog) => favDog.id === dog.id)}
                    />
                    {/* Add any additional details you want to display */}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </Container>
    );
  }
}

export default DogSearchComponent;
