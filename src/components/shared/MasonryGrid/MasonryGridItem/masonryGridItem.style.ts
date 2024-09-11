import styled from "styled-components";

export const Grid = styled.figure`
    margin: 0 0 16px 0;
    display: grid;
    grid-template-rows: 1fr auto;
    break-inside: avoid;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 6px 6px;
        transform: scale(1.02);
    }
`;

export const GridImage = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt,
}))`
    max-width: 100%;
    display: block;
    grid-row: 1 / -1;
    grid-column: 1;
    border-radius: 10px;
`