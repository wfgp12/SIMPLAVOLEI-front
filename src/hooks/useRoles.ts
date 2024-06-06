import { useEffect, useState } from "react"
import { getListRoles } from "../service/roles/roles.service";
import { RolesDTO } from "../models/roles";


export const useRoles = () => {
    const [roles, setRoles] = useState<RolesDTO[]>([]);
    useEffect(() => {
        getListRoles().then((res) => {
            if(!res) throw new Error('Error al obtener los roles')
            setRoles(res);
        }).catch((err) => {
            console.error(err.message);
        });
        return () => {
            setRoles([])
        }
    }, [])

    return {
        roles
    }
}
