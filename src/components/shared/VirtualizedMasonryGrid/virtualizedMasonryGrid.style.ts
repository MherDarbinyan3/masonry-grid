import styled from "styled-components";

interface ImageContainerProps {
    $aspectRatio: string;
}

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 24px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 5px;
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  aspect-ratio: ${props => props.$aspectRatio};
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
    transform: scale(1.02);
  }
`;

export const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  border-radius: 6px;
`;