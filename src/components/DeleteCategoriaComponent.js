// Importa las dependencias necesarias
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoriaService from '../Services/CategoriaService';

// Define el componente
export const DeleteCategoriaComponent = () => {
    // Define los estados para el nombre, la descripción y el error
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);

    // Obtiene el ID de la categoría de los parámetros de la URL
    const { id } = useParams();
    // Obtiene la función para navegar entre rutas
    const navigate = useNavigate();

    // Función para eliminar la categoría
    // Función para eliminar la categoría
    const deleteCategoria = async (e) => {
        e.preventDefault();
        try {
            // Elimina la categoría usando el servicio y maneja la promesa
            console.log(id);
            await CategoriaService.deleteCategoria(id);
            // Navega de regreso a la lista de categorías después de eliminar
            navigate('/categorias');
        } catch (error) {
            // Maneja cualquier error que ocurra durante la eliminación
            setError("Error al eliminar la categoría");
            console.log(error);
        }
    }


    // Obtiene los detalles de la categoría cuando el componente se monta
    useEffect(() => {
        CategoriaService.getCategoriaById(id).then((response) => {
            setNombre(response.data.name);
            setDescripcion(response.data.description);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    // Renderiza el componente
    return (
        <div className="container mt-5">
            <h2 className="text-center">Eliminar Categoría</h2>
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
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descripcion"
                                        value={descripcion}
                                        readOnly
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger" onClick={deleteCategoria}>Eliminar</button>
                                &nbsp;&nbsp; <Link to="/categorias" className="btn btn-secondary ms-2">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporta el componente
export default DeleteCategoriaComponent;
