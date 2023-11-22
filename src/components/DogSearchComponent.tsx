import React, { Component } from 'react';
import api from '../api';
import DogCard from './DogCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import MatchResultCard from './MatchResultCard';

// Interfaces for TypeScript type checking
interface CardRowProps {
  cardsPerRow: number;
}

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
  itemsPerPage: number;
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

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CardRow = styled.ul<CardRowProps>`
  display: flex;
  list-style: none;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;

  li {
    width: calc(${props => 100 / props.cardsPerRow}% - 20px);
    margin-bottom: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  div {
    width: relative;
    display: flex;
    gap: 20px;
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

const MatchedResultSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #f5f5f5;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
`;

const ClearFavoritesButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

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
    // Reset state on component mount
    this.setState(
      {
        dogs: [],
        error: undefined,
        currentPage: 1,
        totalItems: 0,
        sortDirection: 'asc',
        selectedBreeds: [],
        favoriteDogs: [],
        matchResult: undefined,
      },
      this.fetchDogs
    );
    this.fetchBreeds();
  }

  clearFavorites = () => {
    // Clear favorite dogs and match result
    this.setState({ favoriteDogs: [], matchResult: undefined }, () => {
      this.fetchDogs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  fetchBreeds = async () => {
    // Fetch dog breeds and update state
    try {
      const response = await api.get('/dogs/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {
      console.error('Failed to fetch breeds', error);
    }
  };

  fetchDogs = async () => {
    // Fetch dogs based on current state and update state
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
      console.log('Fetching dogs for page:', this.state.currentPage);
      const dogDetails: DogsResponse = await api.post('/dogs', dog_id_list);

      this.setState({
        dogs: dogDetails.data as Dog[],
        totalItems: response.data.total,
        error: undefined,
      });
    } catch (error) {
      // Handle error fetching dogs
      this.setState({ dogs: [], error: 'Failed to fetch dogs' });
    }
  };

  handlePageChange = (newPage: number) => {
    // Handle page change and fetch dogs
    const { totalPages } = this.calculateTotalPages();
    newPage = Math.min(Math.max(newPage, 1), totalPages);

    this.setState({ currentPage: newPage }, () => {
      this.fetchDogs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  calculateTotalPages = () => {
    // Calculate total pages based on total items and items per page
    const { totalItems, itemsPerPage } = this.state;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return { totalPages };
  };

  handleSortChange = () => {
    // Toggle sort direction and fetch dogs
    this.setState(
      prevState => ({
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
      }),
      this.fetchDogs
    );
  };

  handleBreedFilterChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    // Handle breed filter change and fetch dogs
    const selectedBreeds = value ? [value] : [];
    this.setState({ selectedBreeds, currentPage: 1 }, this.fetchDogs);
  };

  toggleFavorite = (dog: Dog) => {
    // Toggle favorite status and update state
    const { favoriteDogs } = this.state;
    const isFavorite = favoriteDogs.some(favDog => favDog.id === dog.id);

    if (isFavorite) {
      const updatedFavorites = favoriteDogs.filter(favDog => favDog.id !== dog.id);
      this.setState({ favoriteDogs: updatedFavorites });
    } else {
      this.setState(prevState => ({
        favoriteDogs: [...prevState.favoriteDogs, dog],
      }));
    }
  };

  generateMatch = async () => {
    // Generate match, fetch matched dog details
    try {
      const { favoriteDogs } = this.state;
      const favoriteDogIds = favoriteDogs.map(favDog => favDog.id);

      console.log('Favorite Dog IDs:', favoriteDogIds);

      const generateMatch = await api.post('/dogs/match', favoriteDogIds);

      console.log('Match Generation Response:', generateMatch);

      const matchId = generateMatch.data.match;

      console.log('Match ID:', matchId);

      const matchResponse = await api.post('/dogs', [matchId]);

      console.log('Fetching Matched Dogs Response:', matchResponse);

      this.setState({ matchResult: { match: matchId } }, () => {
        const matchResultSection = document.getElementById('match-result-section');
        console.log('Match Result Section:', matchResultSection);

        if (matchResultSection) {
          animateScroll.scrollTo(matchResultSection.offsetTop, {
            duration: 800,
            smooth: 'easeInOutQuad',
          });
        }
      });
    } catch (error) {
      console.error('Failed to generate match', error);
    }
  };

  render() {
    // Destructuring state for easier use
    const {
      dogs,
      breeds,
      error,
      currentPage,
      sortDirection,
      favoriteDogs,
      matchResult,
    } = this.state;

    // Calculate total pages and page numbers
    const { totalPages } = this.calculateTotalPages();
    const maxDisplayedPages = 10;
    const middlePage = Math.floor(maxDisplayedPages / 2);

    let startPage = Math.max(currentPage - middlePage, 1);
    let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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
                renderInput={params => <TextField {...params} />}
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
                style={{ width: '190px', fontSize: '14px' }}
                renderInput={params => <TextField {...params} />}
              />
            </label>
          </div>
          <div>
            {favoriteDogs.length > 0 ? (
              <>
                <StyledButton className="generate-match" onClick={this.generateMatch}>
                  Generate Match
                </StyledButton>
              </>
            ) : (
              <p>Add dogs to favorites to generate a match!</p>
            )}
          </div>
        </FilterContainer>

        {rowIndices.map(rowIndex => (
          <CardRow key={rowIndex} className="card-row" cardsPerRow={cardsPerRow}>
            {dogs.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow).map(dog => (
              <li key={dog.id} className="card">
                <DogCard
                  dog={dog}
                  onAddToFavorites={() => this.toggleFavorite(dog)}
                  isFavorite={favoriteDogs.some(favDog => favDog.id === dog.id)}
                />
              </li>
            ))}
          </CardRow>
        ))}
        <Pagination>
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {pageNumbers.map(number => (
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
        {/* Matched Dog Information */}
        <MatchedResultSection id="match-result-section">
          {matchResult && matchResult.match && (
            <>
              <h3>Your Perfect Match!</h3>
              <p>Get ready to meet your favorite dog:</p>
              {dogs.map(dog => {
                if (dog.id === matchResult.match) {
                  return <MatchResultCard key={dog.id} dog={dog} />;
                }
                return null;
              })}
              <ClearFavoritesButton onClick={this.clearFavorites}>Clear Favorites</ClearFavoritesButton>
            </>
          )}
        </MatchedResultSection>
      </Container>
    );
  }
}

export default DogSearchComponent;
