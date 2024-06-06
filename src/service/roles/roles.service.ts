import { mapperToRoleDTO, RolesDAO } from "../../models/roles";
import http from "../http.service";
import { rolesEndpoints } from "./roles-endpoints";

export const getListRoles = async () => {
    try {
        const { status, data, error } = await http.get<RolesDAO[]>(rolesEndpoints.getListRoles);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        const RolesDTO = data.map((role) => mapperToRoleDTO(role));

        return RolesDTO;
    } catch (error) {
        console.error(error);
    }
}