import React, {useCallback, useState} from "react";
import TextInput from "../../shared/TextInput/TextInput.tsx";
import {ImagesContainer} from "./images.style.ts";
import {debounce} from "../../../utils/debounce.ts";
import VirtualizedMasonryGrid from "../../shared/VirtualizedMasonryGrid/VirtualizedMasonryGrid.tsx";

const Images: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [query, setQuery] = useState<string>('');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setQuery(value)
        }, 1000),
        []
    );

    const handleChange = (value: string) => {
        setValue(value);
        debouncedSearch(value);
    };

    return (
        <ImagesContainer>
            <TextInput value={value} onChange={handleChange} />
            <VirtualizedMasonryGrid query={query} />
        </ImagesContainer>
    );
}

export default Images;