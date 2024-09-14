import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {dateFormat} from "@/utils/date.ts";
import {Image as IImage} from "@/interfaces/image.ts";
import {useErrorHandler} from "@/hooks/useErrorHandler.ts";
import {Author, BackButton, Description, Details, ImageContainer, StyledImage, Date} from "./imageDetails.style.ts";

import Loading from "../../shared/Loading/Loading.tsx";

const ImageDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IImage | null>(null);
    const setCustomError = useErrorHandler();

    useEffect(() => {
        const loadImageById = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/photos/${id}?client_id=${import.meta.env.VITE_CLIENT_ID}`);
                const data = await response.json();

                if (!response.ok) {
                    data.errors.forEach((error: string) => {
                        setCustomError(`${response.status} - ${error}`)
                    })
                }

                setData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);

                if (error instanceof Error) {
                    setCustomError(error.message)
                } else {
                    setCustomError('An unknown error occurred')
                }
            }
        };

        loadImageById();
    }, [id, setCustomError]);

    const getWebPUrl = (url: string) => {
        const urlObj = new URL(url);
        urlObj.searchParams.set('fm', 'webp');
        return urlObj.toString();
    };

    const getAVIFUrl = (url: string) => {
        const urlObj = new URL(url);
        urlObj.searchParams.set('fm', 'avif');
        return urlObj.toString();
    };


    if (loading) return <Loading />;

    if (!data) return;

    return (
        <Details>
            <BackButton onClick={() => navigate('/')}>X</BackButton>
            <ImageContainer>
                <picture>
                    <source
                        type="image/avif"
                        srcSet={`${getAVIFUrl(data.urls.small)} 400w, ${getAVIFUrl(data.urls.regular)} 1080w`}
                        sizes="(max-width: 400px) 400px, 1080px"
                    />
                    <source
                        type="image/webp"
                        srcSet={`${getWebPUrl(data.urls.small)} 400w, ${getWebPUrl(data.urls.regular)} 1080w`}
                        sizes="(max-width: 400px) 400px, 1080px"
                    />
                    <StyledImage
                        src={data.urls.regular}
                        alt={data.description || data.alt_description || 'Unsplash Image'}
                        loading="lazy"
                        srcSet={`${data.urls.small} 400w, ${data.urls.regular} 1080w`}
                        sizes="(max-width: 400px) 400px, 1080px"
                    />
                </picture>
            </ImageContainer>
            <Author>{data.user.name}</Author>
            <Description>{data.alt_description}</Description>
            <Date>{dateFormat(data.created_at)}</Date>
        </Details>
    );
}

export default ImageDetails;