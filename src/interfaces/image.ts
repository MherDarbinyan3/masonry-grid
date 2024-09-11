import {Urls, User} from "../types/image.ts";

export interface Image {
    id: string;
    urls: Urls;
    user: User;
    slug: string;
    created_at: string;
    description: string;
    alt_description: string;
    width: number;
    height: number;
    blur_hash: string;
}