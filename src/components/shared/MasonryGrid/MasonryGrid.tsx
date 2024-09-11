import React from "react";
import {Image} from "../../../Interface/image.ts";
import {Container} from "./masonryGrid.style.ts";
import MasonryGridItem from "./MasonryGridItem/MasonryGridItem.tsx";

interface MasonryGridProps {
    images: Image[];
}

const MasonryGrid:React.FC<MasonryGridProps> = ({
    images,
}) => (
    <Container>
        {images.map((image: Image) => (
            <MasonryGridItem key={image.id} image={image} />
        ))}
    </Container>
);

export default MasonryGrid;