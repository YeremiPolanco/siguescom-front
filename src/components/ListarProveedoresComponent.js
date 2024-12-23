import React, { useEffect, useState } from 'react';
import ProveedorService from "../Services/ProveedorService";
import { Link } from "react-router-dom";

export const ListarProveedoresComponent = () => {
    const [proveedores, setProveedores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [proveedoresPerPage] = useState(5);

    useEffect(() => {
        ProveedorService.getAllProveedores()
            .then(response => {
                setProveedores(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Calcular índices de los primeros y últimos elementos de la página actual
    const indexOfLastProveedores = currentPage * proveedoresPerPage;
    const indexOfFirstProveedores = indexOfLastProveedores - proveedoresPerPage;
    const currentProveedores = proveedores.slice(indexOfFirstProveedores, indexOfLastProveedores);

    // Cambiar página
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={'container'}>
            <h2 className={'text-center'}>Lista de categorías</h2>
            <Link to={'/add-proveedor'} className={'btn btn-primary mb-2'}>Agregar Proveedor</Link>
            <div className="table-responsive"> {/* Contenedor responsivo */}
                <table className={'table table-bordered table-striped'}>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProveedores.map(
                        proveedor => (
                            <tr key={proveedor.supplierId}>
                                <td>{proveedor.supplierId}</td>
                                <td>{proveedor.name}</td>
                                <td>{proveedor.address}</td>
                                <td>+51 {proveedor.phone}</td>
                                <td>
                                    <Link className={'btn btn-info'} to={`/edit-proveedor/${proveedor.supplierId}`}>Editar</Link>
                                    &nbsp;&nbsp; <Link className={'btn btn-danger'} to={`/delete-proveedor/${proveedor.supplierId}`}>Eliminar</Link>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(proveedores.length / proveedoresPerPage)).keys()].map(number => (
                        <li key={number + 1} className="page-item">
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ListarProveedoresComponent;