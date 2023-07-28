/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


export const BandList = ({ data, voteBand, deleteBand, nameChangeBand }) => {

    const [bands, setBands] = useState(data);
    useEffect(() => {

        setBands(data)

    }, [data])

    const handelName = (event, id) => {
        const newName = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName
            }
            return band
        }))
    }

    const onOffBlur = (id, name) => {
        console.log(id, name)
        //TODO: Disparar evento de socket
        nameChangeBand(id, name)
    }

    const crearRows = () => {
        return (
            bands.map(({ id, name, votes }) => (

                <tr key={id}>

                    <td><button
                        className="btn btn-primary"
                        onClick={() => voteBand(id)}
                    >+1</button></td>
                    <td>
                        <input
                            className="form-control"
                            value={name}
                            onChange={(event) => handelName(event, id)}
                            onBlur={() => onOffBlur(id, name)}
                        />
                    </td>
                    <td> <h3>{votes}</h3> </td>
                    <td> <button
                        className="btn btn-danger"
                        onClick={() => deleteBand(id)}
                    >Borrar</button> </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr className="">
                        <th> </th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>
        </>
    )
}
