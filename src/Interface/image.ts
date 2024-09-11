export interface Image {
    id: string;
    urls: {
        regular: string;
        full: string;
    };
    user: {
        name: string;
    };
    slug: string;
    created_at: string;
    description: string;
    alt_description: string;
    width: number;
    height: number;
    blur_hash: string;

}