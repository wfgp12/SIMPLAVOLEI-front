

export interface PlayerDAO {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    jerseyNumber: number;
    position: string;
    weight: number;
    height: number;
    bloodType: string;
    category: string;
    userId: string;
    clubId: number;
}

export interface PlayerDTO {
    id: number;
    name: string;
    lastName: string;
    birthDate: string;
    age: number;
    jerseyNumber: number;
    position: string;
    weight: number;
    height: number;
    bloodType: string;
    category: string;
    clubId: number;
}

export type CreatePlayerForm = Omit<PlayerDAO, "id" | "clubId" | "userId">

