import styled from 'styled-components';

export const ErrorContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: $neutral-white;
    font-size: 26px;
    font-weight: 600;

    button {
        width: 100px;
        height: 32px;
        border-radius: 8px;
        background-color: #eca5a5;
        outline: none;
        border: none;
        cursor: pointer;
        margin-top: 16px;
        color: #7a0000;
        
        &:hover {
            background-color: #efc2c2;
        }
    }
`;

export const ErrorTitle  = styled.div`
    color: #4e575d;
    font-size: 28px;
`

export const ErrorDescription  = styled.div`
    color: #e95252;
    font-size: 22px;
`