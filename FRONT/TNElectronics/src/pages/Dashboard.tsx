import { FC } from "react";
import { CardIrA } from "../Components/CardIrA";

const Dashboard: FC = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 m-4">
                <CardIrA titulo="Productos" direccion="/productos" colorTexto="text-orange-500" />
                <CardIrA titulo="Usuarios" direccion="/usuarios" colorTexto="text-green-500" />
            </div>
        </>
    );
}

export { Dashboard };
