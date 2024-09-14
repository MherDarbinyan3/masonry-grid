import {useContext} from "react";
import {ErrorHandler} from "../types/error.ts";
import {ErrorContext} from "../context/ErrorContext.ts";

export const useErrorHandler = (): ErrorHandler => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorHandler must be used within an ErrorBoundary');
    }
    return context;
};