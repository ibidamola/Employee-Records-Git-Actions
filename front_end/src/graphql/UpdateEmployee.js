import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE_BY_ID =gql

`mutation Mutation($currId: ID, $updatedData: EmployeeInput) {
    updateEmployeeById(curr_id: $currId, updated_data: $updatedData) {
      FirstName
      LastName
      Age
      CurrentStatus
      DateOfJoining
      Title
      Department
      EmployeeType
      
    
    }
  }`