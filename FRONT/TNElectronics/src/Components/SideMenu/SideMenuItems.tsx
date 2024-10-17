import { Link } from "react-router-dom";

type SideMenuItemsProps = {
    icon?: string,
    direccion: string
    titulo: string,
    activo: boolean
}

const SideMenuItems = ({ icon, direccion, titulo, activo }: SideMenuItemsProps) => {
    return (
        <Link
            to={direccion}
            className={`block py-2.5 px-8 rounded-lg ease-in duration-200 ${activo ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 hover:text-blue-500'}`}>
            <h1><i className={`${icon} mr-[5px]`}></i>{titulo}</h1>
        </Link>
    )
}

export { SideMenuItems }


