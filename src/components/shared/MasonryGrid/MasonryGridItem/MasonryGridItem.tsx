import React from "react";
import { useNavigate } from "react-router-dom";
import {Image} from "../../../../Interface/image.ts";
import {Grid, GridImage} from "./masonryGridItem.style.ts";

interface MasonryGridItemProps {
    image: Image;
}

const MasonryGridItem:React.FC<MasonryGridItemProps> = ({
    image,
}) => {
    const navigate = useNavigate();

    return (
        <Grid onClick={() => navigate(`/images/${image.id}`)}>
            <GridImage src={image.urls.regular} alt={image.alt_description} />
        </Grid>
    );
}

export default MasonryGridItem;