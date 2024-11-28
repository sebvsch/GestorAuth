import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FC } from "react";

type Campos = {
    label: string;
    placeholder: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

type ModalAddProps = {
    titulo: string
    campos: Campos[]
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const ModalAdd: FC<ModalAddProps> = ({ isOpen, onOpenChange, onClose, campos, onSubmit, titulo }) => {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <form onSubmit={onSubmit}>
                    <ModalContent>
                        {onClose && (
                            <>
                                <ModalHeader>{`Agregar nuevo ${titulo}`}</ModalHeader>
                                <ModalBody>
                                    {campos.map((campo, index) => (
                                        <Input
                                            key={index}
                                            label={campo.label}
                                            placeholder={campo.placeholder}
                                            value={campo.value.toString()}
                                            onChange={campo.onChange}
                                        />
                                    ))}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant='flat' onPress={onClose}>Cerrar</Button>
                                    <Button type="submit" color="primary">Guardar cambios</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}