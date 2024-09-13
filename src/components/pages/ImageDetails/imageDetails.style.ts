import styled from "styled-components";

export const Details = styled.div`
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const BackButton = styled.div`
    width: 48px;
    height: 48px;
    position: absolute;
    border-radius: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 500;
    right: 24px;
    color: #8b8b8b;
    
    &:hover {
        background-color: #fafafa;
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 66.66%;
    margin-top: 64px;
`;

export const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Author = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #6c6c6c;
    text-align: center;
    margin: 16px 0 8px;
`;

export const Description = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: #6c6c6c;
    text-align: center;
`;

export const Date = styled.div`
    font-size: 16px;
    color: #6c6c6c;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
`;