import React, { useState, useEffect, useRef, useCallback } from 'react';
import {useNavigate} from "react-router-dom";
import { Image as IImage } from "@/interfaces/image.ts";
import {useErrorHandler} from "@/hooks/useErrorHandler.ts";
import {Column, Grid, ImageContainer, StyledImage} from "./virtualizedMasonryGrid.style.ts";
import Loading from "../Loading/Loading.tsx";

const PHOTOS_PER_PAGE = 20;
const BUFFER_SIZE = 2;
const apiUrl = import.meta.env.VITE_API_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;

interface VirtualizedMasonryGridProps {
    query: string;
}

const VirtualizedMasonryGrid: React.FC<VirtualizedMasonryGridProps> = ({ query }) => {
    const navigate = useNavigate();
    const setCustomError = useErrorHandler();
    const [photos, setPhotos] = useState<IImage[]>([]);
    const [columns, setColumns] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const currentPage = useRef(1);
    const loadedPhotoIds = useRef(new Set<string>());
    const isFetching = useRef(false);
    const isScrollingUp = useRef(false);
    const lastScrollY = useRef(0);
    const lastQuery = useRef('');

    const preloadImage = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = () => resolve();
            img.onerror = reject;
        });
    };

    const fetchPhotos = useCallback(async (page: number, newQuery: string) => {
        if (isFetching.current) return;

        isFetching.current = true;
        setIsLoading(true);

        try {
            let url = `${apiUrl}/photos?page=${page}&per_page=${PHOTOS_PER_PAGE}&client_id=${clientId}`;

            if (newQuery) {
                url = `${apiUrl}/search/photos?page=${page}&per_page=${PHOTOS_PER_PAGE}&query=${encodeURIComponent(newQuery)}&client_id=${clientId}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                data.errors.forEach((error: string) => {
                    setCustomError(`${response.status} - ${error}`)
                })
            }
            const fetchedPhotos: IImage[] = newQuery ? data.results : data;

            if (fetchedPhotos.length > 0) {
                const lcpImageUrl = `${fetchedPhotos[0].urls.regular}&w=1080&format=webp`;
                await preloadImage(lcpImageUrl);
            }

            setPhotos(prevPhotos => {
                if (newQuery !== lastQuery.current) {
                    loadedPhotoIds.current = new Set(fetchedPhotos.map(photo => photo.id));
                    return fetchedPhotos;
                }

                const newUniquePhotos = fetchedPhotos.filter(photo => !loadedPhotoIds.current.has(photo.id));
                newUniquePhotos.forEach(photo => loadedPhotoIds.current.add(photo.id));

                let newPhotos;
                if (isScrollingUp.current) {
                    newPhotos = [...newUniquePhotos, ...prevPhotos];
                } else {
                    newPhotos = [...prevPhotos, ...newUniquePhotos];
                }

                const maxPhotosToKeep = PHOTOS_PER_PAGE * (BUFFER_SIZE * 2 + 1);
                if (newPhotos.length > maxPhotosToKeep) {
                    if (isScrollingUp.current) {
                        const slicedPhotos = newPhotos.slice(0, maxPhotosToKeep);
                        loadedPhotoIds.current = new Set(slicedPhotos.map(photo => photo.id));
                        return slicedPhotos;
                    } else {
                        const slicedPhotos = newPhotos.slice(-maxPhotosToKeep);
                        loadedPhotoIds.current = new Set(slicedPhotos.map(photo => photo.id));
                        return slicedPhotos;
                    }
                }
                return newPhotos;
            });

            currentPage.current = page;
            lastQuery.current = newQuery;
        } catch (error) {
            if (error instanceof Error) {
                setCustomError(error.message)
            } else {
                setCustomError('Error fetching photos')
            }
        } finally {
            setIsLoading(false);
            isFetching.current = false;
        }
    }, [setCustomError]);

    const getColumns = () => {
        const cols: IImage[][] = Array.from({ length: columns }, () => []);
        photos.forEach((photo, index) => {
            cols[index % columns].push(photo);
        });
        return cols;
    };

    const getOptimalImageSize = (width: number, height: number) => {
        const viewportWidth = window.innerWidth;
        const columnWidth = viewportWidth / columns;
        const scaleFactor = columnWidth / width;
        const optimalHeight = Math.round(height * scaleFactor);
        return `${Math.round(columnWidth)}x${optimalHeight}`;
    };

    useEffect(() => {
        setPhotos([]);
        loadedPhotoIds.current.clear();
        currentPage.current = 1;
        lastScrollY.current = 0;
        isScrollingUp.current = false;

        fetchPhotos(1, query);
    }, [fetchPhotos, query]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) setColumns(1);
            else if (width < 768) setColumns(2);
            else if (width < 1024) setColumns(3);
            else if (width < 1366) setColumns(4);
            else setColumns(5);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '200px',
            threshold: 0.1,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const imgContainer = entry.target as HTMLElement;
                    const img = imgContainer.querySelector('img');
                    const src = img?.dataset.src;
                    if (src && img) {
                        preloadImage(src).then(() => {
                            img.src = src;
                            img.style.opacity = '1';
                        });
                    }
                    observerRef.current?.unobserve(imgContainer);
                }
            });
        }, options);

        return () => observerRef.current?.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!gridRef.current || isFetching.current) return;

            const currentScrollY = window.scrollY;
            isScrollingUp.current = currentScrollY < lastScrollY.current;
            lastScrollY.current = currentScrollY;

            const windowHeight = window.innerHeight;
            const gridHeight = gridRef.current.offsetHeight;

            if (isScrollingUp.current && currentScrollY <= 500 && currentPage.current > 1) {
                fetchPhotos(currentPage.current - 1, query);
            } else if (currentScrollY + windowHeight >= gridHeight - 500) {
                fetchPhotos(currentPage.current + 1, query);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchPhotos, query]);

    useEffect(() => {
        if (photos.length > 0) {
            const lcpImage = document.createElement('img');
            lcpImage.src = `${photos[0].urls.regular}&w=1080&format=webp`;
        }
    }, [photos]);

    return (
        <Grid ref={gridRef}>
            {getColumns().map((column, columnIndex) => (
                <Column key={columnIndex}>
                    {column.map((photo, index) => {
                        const optimalSize = getOptimalImageSize(photo.width, photo.height);
                        const imageUrl = `${photo.urls.regular}&w=${optimalSize.split('x')[0]}&format=webp`;

                        return (
                            <ImageContainer
                                onClick={() => navigate(`/images/${photo.id}`)}
                                key={photo.id}
                                $aspectRatio={`${photo.width} / ${photo.height}`}
                                ref={(el) => {
                                    if (el) {
                                        observerRef.current?.observe(el);
                                    }
                                }}
                            >
                                <StyledImage
                                    data-src={imageUrl}
                                    alt={photo.alt_description || ""}
                                    style={{ opacity: 0 }}
                                    loading={index === 0 && columnIndex === 0 ? 'eager' : 'lazy'}
                                />
                            </ImageContainer>
                        );
                    })}
                </Column>
            ))}
            {isLoading && (
                <Loading isOverlay />
            )}
        </Grid>
    );
};

export default VirtualizedMasonryGrid;