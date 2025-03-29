import { gql } from "@apollo/client";

export const SEARCH_EMPLOYEES = gql`

query SearchEmployees($searchInput: SearchInput) {
  searchEmployees(searchInput: $searchInput) {
    Age
    CurrentStatus
    DateOfJoining
    EmployeeType
    Department
    FirstName
    LastName
    Title
    _id
  }
}

`