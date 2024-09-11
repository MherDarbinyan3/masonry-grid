import styled from "styled-components";

export const Details = styled.div`
    padding: 24px;
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
    display: flex;
    justify-content: center;
`;

export const Image = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt,
}))`
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
`

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