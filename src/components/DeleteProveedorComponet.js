// Importa las dependencias necesarias
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProveedorService from "../Services/ProveedorService";

// Define el componente
export const DeleteProveedorComponent = () => {
    // Define los estados para el nombre, la descripción y el error
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState(null);

    // Obtiene el ID de la categoría de los parámetros de la URL
    const { id } = useParams();
    // Obtiene la función para navegar entre rutas
    const navigate = useNavigate();

    const deleteProveedor = async (e) => {
        e.preventDefault();
        try {
            // Elimina la categoría usando el servicio y maneja la promesa
            console.log(id);
            await ProveedorService.deleteProveedoor(id);
            // Navega de regreso a la lista de categorías después de eliminar
            navigate('/proveedores');
        } catch (error) {
            // Maneja cualquier error que ocurra durante la eliminación
            setError("Error al eliminar la proveedor");
            console.log(error);
        }
    }


    // Obtiene los detalles de la categoría cuando el componente se monta
    useEffect(() => {
        ProveedorService.getProveedorById(id).then((response) => {
            setNombre(response.data.name);
            setDireccion(response.data.address);
            setTelefono(response.data.phone);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    // Renderiza el componente
    return (
        <div className="container mt-5">
            <h2 className="text-center">Eliminar Proveedor</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={nombre}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        value={direccion}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Telefono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={telefono}
                                        readOnly
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger" onClick={deleteProveedor}>Eliminar
                                </button>
                                &nbsp;&nbsp; <Link to="/proveedor" className="btn btn-secondary ms-2">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporta el componente
export default DeleteProveedorComponent;
