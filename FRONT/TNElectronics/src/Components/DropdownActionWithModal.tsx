import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { FC } from 'react';


type DropdownActionWithModalProps = {
    onOpen: () => void;
};

export const DropdownActionWithModal: FC<DropdownActionWithModalProps> = ({ onOpen }) => {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button color="default" variant='flat' size='sm' className='font-semibold text-gray-500'>Acciones</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones" onAction={(key) => key === "edit" && onOpen()}>
                    <DropdownItem key="edit">Editar</DropdownItem>
                    <DropdownItem key="delete" color="danger">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};
