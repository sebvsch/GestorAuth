import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { IUsuario } from "../Interfaces/IUsuario";

type ModalEditProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: IUsuario) => void;
    user: IUsuario | null;
}

export const ModalEdit: FC<ModalEditProps> = ({ isOpen, onClose, onSave, user }) => {

    const [editedUser, setEditedUser] = useState<IUsuario | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        if (editedUser) {
            onSave(editedUser);
        }
    };

    useEffect(() => {
        if (user) {
            setEditedUser({ ...user });
        }
    }, [user]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Editar Usuario</ModalHeader>
                    <ModalBody>
                        {editedUser && (
                            <>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    value={editedUser.nombreCompleto}
                                    onChange={handleInputChange}
                                    placeholder="Nombre Completo"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="nombreUsuario"
                                    value={editedUser.nombreUsuario}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de Usuario"
                                    className="w-full p-2 border rounded mt-2"
                                />
                                <input
                                    type="text"
                                    name="tipoUsuario"
                                    value={editedUser.tipoUsuario}
                                    onChange={handleInputChange}
                                    placeholder="Tipo de Usuario"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" onPress={handleSave}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}