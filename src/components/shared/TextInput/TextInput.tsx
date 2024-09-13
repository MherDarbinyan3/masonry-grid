import React, {ChangeEvent} from 'react';
import StyledInput from "./textInput.style.ts";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <StyledInput
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search..."
        />
    );
};

export default TextInput;