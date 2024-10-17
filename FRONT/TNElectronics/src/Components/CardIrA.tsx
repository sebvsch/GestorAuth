import { Link } from "react-router-dom";

type CardIrAProps = {
    direccion: string,
    titulo: string,
    colorTexto: string
}

const CardIrA = ({ titulo, direccion, colorTexto }: CardIrAProps) => {


    return (
        <Link to={`${direccion}`}>
            <div className="border w-auto h-auto rounded-3xl bg-white hover:scale-105 ease-in duration-250" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.050)' }}>
                <h1 className="text-2xl ml-7 m-7">Ir a <span className={`font-semibold ${colorTexto}`}>{titulo}<i className="fa-solid fa-arrow-right ml-[5px] text-lg"></i></span></h1>

            </div>
        </Link>
    )
}

export { CardIrA }