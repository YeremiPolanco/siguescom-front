import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProductoService from "../Services/ProductoService";

export const ListarProductoComponent = () => {
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productosPerPage] = useState(5);

    useEffect(() => {
        listarProductos()
    }, []);

    const listarProductos = () =>{
        ProductoService.getAllProductos()
            .then(response => {
                setProductos(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Calcular índices de los primeros y últimos elementos de la página actual
    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    const currentProductos = productos.slice(indexOfFirstProducto, indexOfLastProducto);

    // Cambiar página
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={'container'}>
            <h2 className={'text-center'}>Lista de Productos</h2>
            <Link to={'/add-producto'} className={'btn btn-primary mb-2'}>Agregar Producto</Link>
            <div className="table-responsive"> {/* Contenedor responsivo */}
                <table className={'table table-bordered table-striped'}>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Costo</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Imagen</th>
                        <th>Proveedor</th>
                        <th>Categoria</th>
                        <th>Aciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProductos.map(
                        producto => (
                            <tr key={producto.productId}>
                                <td>{producto.productId}</td>
                                <td>{producto.name}</td>
                                <td>{producto.description}</td>
                                <td>S/. {producto.price}</td>
                                <td>S/. {producto.cost}</td>
                                <td>{producto.quantity}</td>
                                <td>{producto.status}</td>
                                <td>{producto.image}</td>
                                <td>{producto.supplier.name}</td>
                                <td>{producto.category.name}</td>

                                <td>
                                    <Link className={'btn btn-info'}
                                          to={`/edit-producto/${producto.productId}`}>Editar</Link>
                                    &nbsp;&nbsp; <Link className={'btn btn-danger'}
                                                       to={`/delete-producto/${producto.productId}`}>Eliminar</Link>
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
                    {[...Array(Math.ceil(productos.length / productosPerPage)).keys()].map(number => (
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

export default ListarProductoComponent;
