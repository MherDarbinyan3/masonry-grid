import styled from "styled-components";

export const Container = styled.div`
    column-count: 5;
    column-gap: 16px;
    padding: 20px;

    @media screen and (max-width: 1366px) {
        column-count: 4;
    }

    @media screen and (max-width: 1024px) {
        column-count: 3;
    }

    @media screen and (max-width: 768px) {
        column-count: 2;
    }

    @media screen and (max-width: 480px) {
        column-count: 1;
    }
`;