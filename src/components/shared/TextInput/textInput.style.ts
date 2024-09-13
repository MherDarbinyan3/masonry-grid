import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }
`;

export default StyledInput;