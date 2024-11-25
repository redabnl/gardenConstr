import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
`;

// const FilterButton = styled.button`
//   padding: 10px 15px;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;
//   background-color: ${({ active }) => (active ? 'black' : 'white')};
//   color: ${({ active }) => (active ? 'white' : 'black')};
//   border-radius: 5px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #333;
//     color: white;
//   }
// `;
const FilterButton = styled.button.attrs((props) => ({
    active: undefined // Prevents the `active` prop from being passed to the DOM
  }))`
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background-color: ${({ active }) => (active ? 'black' : 'white')};
    color: ${({ active }) => (active ? 'white' : 'black')};
    border-radius: 5px;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #333;
      color: white;
    }
  `;
  


function ProjectFilter({ filter, onFilterChange }) {
    return (
      <FilterContainer>
        <FilterButton
          active={filter === 'All'}
          onClick={() => onFilterChange('All')}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === 'Indoor'}
          onClick={() => onFilterChange('Indoor')}
        >
          Indoor
        </FilterButton>
        <FilterButton
          active={filter === 'Outdoor'}
          onClick={() => onFilterChange('Outdoor')}
        >
          Outdoor
        </FilterButton>
      </FilterContainer>
    );
  }
  
  export default ProjectFilter;
  

