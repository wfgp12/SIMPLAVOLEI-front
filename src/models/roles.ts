export function mapperToRoleDTO(roleDAO: RolesDAO):RolesDTO {
    return {
        id: roleDAO._id,
        name: roleDAO.name,
    }
}
export function mapperToRoleDAO(roleDTO: RolesDTO):RolesDAO {
    return {
        _id: roleDTO.id,
        name: roleDTO.name,
    }
}



export interface RolesDAO {
    _id:  string;
    name: string;
}

export interface RolesDTO {
    id:  string;
    name: string;
}
