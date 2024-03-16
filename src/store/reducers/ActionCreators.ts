import axios, { AxiosError } from "axios";
import { ICard } from "../../models/ICard";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface MyError {
    errorMessage: string
    field_errors: Record<string, string>
}

export const fetchCards = createAsyncThunk(
    'card/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const resp = await axios.get<ICard[]>('https://fakestoreapi.com/products?limit=5');
            return resp.data;
        }
        catch (err: any) {
            let error: AxiosError<MyError> = err;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue('Ошибка при загрузке информации о продуктах!');
        }

    }
)