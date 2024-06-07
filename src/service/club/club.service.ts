import { ClubDAO } from "../../models/club";
import { PlayerDAO } from "../../models/player";
import http from "../http.service";

export const getAllClubs = async () => {
    try {
        const { status, data, error } = await http.get<ClubDAO[]>('http://localhost:3031/api/clubs');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const createSolicitud = async (clubId: number, userId: string) => {
    try {
        const { status, data, error } = await http.post(`http://localhost:3031/api/clubs/${clubId}/join`, {userId});
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const getClubMyDirector = async ( userId: string) => {
    try {
        const { status, data, error } = await http.get<ClubDAO>(`http://localhost:3031/api/clubs/${userId}/club`);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const getSolicitudByClub = async ( clubId: number) => {
    try {
        const { status, data, error } = await http.get<PlayerDAO[]>(`http://localhost:3031/api/clubs/${clubId}/solicitudes`);
        if (status === 'error' || !data) throw new Error(error?.message as string);
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
export const acceptDeclineRequest = async ( clubId: number, playerId: number, accepted: boolean) => {
    try {
        const { status, data, error } = await http.post(`http://localhost:3031/api/clubs/${clubId}/requests/${playerId}`, {accepted});
        if (status === 'error' || !data) throw new Error(error?.message as string);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}