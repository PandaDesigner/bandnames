import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const BandAdd = ({ newBands }) => {
    const [valor, setValor] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        if (valor.trim().length > 0) {
            //TODO: LLamar la funcion para emitier el evento
            newBands(valor)

            setValor('');
        }

        console.log(valor)
    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                action=""
                onSubmit={onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                />
            </form>
        </>
    )
}
