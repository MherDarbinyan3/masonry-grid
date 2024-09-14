import {createContext} from "react";
import {ErrorHandler} from "../types/error.ts";

export const ErrorContext = createContext<ErrorHandler | undefined>(undefined);