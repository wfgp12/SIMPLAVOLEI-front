
import { ChangeEvent, useState } from "react";
type FormValues<T> = {
    [K in keyof T]: string;
};

interface FormFunctions<T> {
    values: FormValues<T>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setValues: (state: FormValues<T>) => void
    resetForm: () => void;
}

export const useForm = <T extends {}>(initialState: T): FormFunctions<T> => {
    const [state, setState] = useState<FormValues<T>>(() => {
        const defaultState: FormValues<T> = {} as FormValues<T>;
        for (const key in initialState) {
            defaultState[key] = '';
        }
        return defaultState;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const setValue = <K extends keyof T>(field: K, value: T[K]) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const setValues = (newValues: FormValues<T>) => {
        for (const field in newValues) {
            if (Object.prototype.hasOwnProperty.call(newValues, field)) {
                setState((prevState) => ({
                    ...prevState,
                    [field]: newValues[field]
                }));
            }
        }
    };

    const resetForm = () => {
        setState(() => {
            const resetState: FormValues<T> = {} as FormValues<T>;
            for (const key in initialState) {
                resetState[key] = '';
            }
            return resetState;
        });
    };

    return {
        values: state,
        setValue,
        setValues,
        handleChange,
        resetForm,
    };
};
