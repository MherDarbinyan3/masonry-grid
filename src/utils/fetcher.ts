import {Image} from "../Interface/image.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const getImages = async (): Promise<Image[]> => {
    try {
        const response = await fetch(
            `${apiUrl}/photos?page=1&per_page=20&client_id=${import.meta.env.VITE_CLIENT_ID}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch images from Unsplash.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getImage = async (id: string): Promise<Image | null> => {
    if (!id) {
        return null;
    }

    try {
        const response = await fetch(
            `${apiUrl}/photos/${id}?client_id=${import.meta.env.VITE_CLIENT_ID}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch images from Unsplash.");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};