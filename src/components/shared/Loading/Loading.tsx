import React from "react";
import styled from "styled-components";

const Loader = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Loading:React.FC = () => {
    return <Loader />
}

export default Loading;