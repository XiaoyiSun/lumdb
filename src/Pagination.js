import React from 'react';
import styled from 'styled-components';

const Pagination = ({
  currentPage,
  changePage,
  totalPages,
  pagesIndicesList
}) => (
  <PaginationWrapper>
    <PaginationItem disable={currentPage === 1}>
      <a onClick={() => changePage(1)}>First</a>
    </PaginationItem>
    <PaginationItem disable={currentPage === 1}>
      <a onClick={() => changePage(currentPage-1)}>Previous</a>
    </PaginationItem>
    {pagesIndicesList.map((i) => (
      <PaginationItem active={i === currentPage} key={i}>
        <a onClick={() => changePage(i)}>{i}</a>
      </PaginationItem>
    ))}
    <PaginationItem disable={currentPage === totalPages}>
      <a onClick={() => changePage(currentPage+1)}>Next</a>
    </PaginationItem>
    <PaginationItem disable={currentPage === totalPages}>
      <a onClick={() => changePage(totalPages)}>Last</a>
    </PaginationItem>
  </PaginationWrapper>
);

export default Pagination;

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PaginationItem = styled.li`
  margin: 5px;
  cursor: ${props => props.disable ? 'default' : 'pointer'};
  > a {
    background-color: ${props => props.active ? '#56d5fa' : '#292929'};
    color: ${props => props.active || props.disable ? '#222' : '#eee'};
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0 10px #080808;
    border-radius: 5px;
  }
`;
