import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FC, Key } from 'react';

type Campos = {
    label: string;
    placeholder: string;
    value: string | number;
    defaultValue: string | number;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

type DropdownActionWithModalProps = {
    campos: Campos[]
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onOpen: () => void;
    isOpen: boolean
    onOpenChange: () => void;
    onClose: () => void;

}

export const DropdownActionWithModal: FC<DropdownActionWithModalProps> = ({ campos, onSubmit, onOpen, isOpen, onOpenChange }) => {


    const handleAction = (key: Key) => {
        if (key === "edit") {
            onOpen();
        }
        if (key === "delete") {
            alert("Eliminar acción seleccionada");
        }
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button color="default" variant='flat' size='sm' className='font-semibold text-gray-400'>Acciones</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones de usuario" onAction={handleAction}>
                    <DropdownItem key="edit">Editar</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                <form onSubmit={onSubmit}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>
                                    Editar Usuario
                                </ModalHeader>
                                <ModalBody>
                                    {campos.map((campo, index) => (
                                        <Input
                                            key={index}
                                            label={campo.label}
                                            placeholder={campo.placeholder}
                                            variant="bordered"
                                            disabled={campo.disabled}
                                            onChange={campo.onChange}
                                            defaultValue={campo.defaultValue.toString()}
                                        />
                                    ))}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant='flat' className='font-semibold text-gray-400' onPress={onClose}>Cerrar</Button>
                                    <Button type="submit" color="primary" variant='flat' className='font-semibold text-blue-400'>
                                        Guardar cambios
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}