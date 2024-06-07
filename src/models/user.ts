export function mapperToUserDTO(userDAO: UserDAO): UserDTO {
    const [name, lastName] = userDAO.fullName.split(' ')
    const roles = userDAO.roles.map(role => mapperToRoleDTO(role));
    return {
        id: userDAO._id,
        name: name,
        lastName: lastName,
        email: userDAO.email,
        documentNumber: userDAO.documentNumber,
        dateOfBirth: userDAO.dateOfBirth,
        country: userDAO.country,
        roles: roles
    }
}

export function mapperToUserDAO(userDTO: UserDTO): UserDAO {
    const roles = userDTO.roles.map(role => mapperToRoleDAO(role));
    return {
        _id: userDTO.id,
        fullName: `${userDTO.name} ${userDTO.lastName}`,
        email: userDTO.email,
        documentNumber: userDTO.documentNumber,
        dateOfBirth: userDTO.dateOfBirth,
        country: userDTO.country,
        roles: roles
    }
}

export function mapperToRoleDAO(RoleDTO: RoleDTO): RoleDAO {
    return {
        _id: RoleDTO.id,
        name: RoleDTO.name
    }
}

export function mapperToRoleDTO(RoleDAO: RoleDAO): RoleDTO {
    return {
        id: RoleDAO._id,
        name: RoleDAO.name
    }
}



export interface UserDTO {
    id: string;
    name: string;
    lastName: string;
    email: string;
    documentNumber: string;
    dateOfBirth: string;
    country: string;
    roles: RoleDTO[];
}

export interface RoleDTO {
    id: string,
    name: string
}

export interface RoleDAO {
    _id: string,
    name: string
}

export interface UserDAO {
    _id: string;
    fullName: string;
    email: string;
    documentNumber: string;
    dateOfBirth: string;
    country: string;
    roles: RoleDAO[];
}
