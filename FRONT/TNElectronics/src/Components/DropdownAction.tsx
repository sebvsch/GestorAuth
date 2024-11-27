import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { FC } from 'react';


type DropdownActionProps = {
    onOpen: () => void;
    onDelete?: () => void;
};

export const DropdownAction: FC<DropdownActionProps> = ({ onOpen, onDelete }) => {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button color="default" variant='flat' size='sm' className='font-semibold text-gray-500'>Acciones</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones" onAction={(key) => {
                    if (key === "edit") onOpen();
                    if (key === "delete" && onDelete) onDelete();
                }}>
                    <DropdownItem key="edit">Editar</DropdownItem>
                    <DropdownItem key="delete" color="danger">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};
