import http from "../http.service";
import { playerEndPoints } from "./player-endpoints";
import { CreatePlayerForm, PlayerDTO } from '../../models/player';

export const getDataSheet = async () => {
    try {
        const { status, data, error } = await http.get<PlayerDTO>(playerEndPoints.getDataSheet);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data ;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createDataSheet = async (values: CreatePlayerForm) => {
    try {
        const { status, data, error } = await http.post(playerEndPoints.createDataSheet, {...values});
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data ;
    } catch (error) {
        return Promise.reject(error);
    }
}