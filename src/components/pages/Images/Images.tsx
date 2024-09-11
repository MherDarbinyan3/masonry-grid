import React, {useEffect, useState} from "react";
import {Image} from "../../../Interface/image.ts";
import MasonryGrid from "../../shared/MasonryGrid/MasonryGrid.tsx";
import Loading from "../../shared/Loading/Loading.tsx";
import {getImages} from "../../../utils/fetcher.ts";

const Images: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadImages = async () => {
            const fetchedImages = await getImages();
            setImages(fetchedImages);
            setLoading(false);
        };

        loadImages();
    }, []);

    if (loading) return <Loading />;

    return (
        <MasonryGrid images={images} />
    );
}

export default Images;