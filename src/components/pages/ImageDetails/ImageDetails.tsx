import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getImage} from "../../../utils/fetcher.ts";
import {Author, BackButton, Description, Details, ImageContainer, Image, Date} from "./imageDetails.style.ts";
import {dateFormat} from "../../../utils/date.ts";
import {Image as IImage} from "../../../interfaces/image.ts";
import Loading from "../../shared/Loading/Loading.tsx";


const ImageDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IImage | null>(null);

    useEffect(() => {
        const loadImageById = async () => {
            const fetchedImage = await getImage(id || '');
            setData(fetchedImage);
            setLoading(false);
        };

        loadImageById();
    }, []);

    if (loading) return <Loading />;

    if (!data) return;

    return (
        <Details>
            <BackButton onClick={() => navigate('/')}>X</BackButton>
            <ImageContainer>
                <Image src={data.urls.full} alt={data.alt_description} />
            </ImageContainer>
            <Author>{data.user.name}</Author>
            <Description>{data.alt_description}</Description>
            <Date>{dateFormat(data.created_at)}</Date>
        </Details>
    );
}

export default ImageDetails;