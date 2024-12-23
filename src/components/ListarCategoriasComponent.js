import React, { useEffect, useState } from 'react';
import CategoriaService from '../Services/CategoriaService';
import { Link } from "react-router-dom";

export const ListarCategoriasComponent = () => {
    const [categorias, setCategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriasPerPage] = useState(5);

    useEffect(() => {
        listarCategorias()
    }, []);

    const listarCategorias = () =>{
        CategoriaService.getAllCategorias()
            .then(response => {
                setCategorias(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Calcular índices de los primeros y últimos elementos de la página actual
    const indexOfLastCategoria = currentPage * categoriasPerPage;
    const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
    const currentCategorias = categorias.slice(indexOfFirstCategoria, indexOfLastCategoria);

    // Cambiar página
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={'container'}>
            <h2 className={'text-center'}>Lista de categorías</h2>
            <Link to={'/add-categoria'} className={'btn btn-primary mb-2'}>Agregar Categoria</Link>
            <div className="table-responsive"> {/* Contenedor responsivo */}
                <table className={'table table-bordered table-striped'}>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentCategorias.map(
                        categoria => (
                            <tr key={categoria.categoryId}>
                                <td>{categoria.categoryId}</td>
                                <td>{categoria.name}</td>
                                <td>{categoria.description}</td>
                                <td>
                                    <Link className={'btn btn-info'} to={`/edit-categoria/${categoria.categoryId}`}>Editar</Link>
                                    &nbsp;&nbsp; <Link className={'btn btn-danger'} to={`/delete-categoria/${categoria.categoryId}`}>Eliminar</Link>
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
                    {[...Array(Math.ceil(categorias.length / categoriasPerPage)).keys()].map(number => (
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

export default ListarCategoriasComponent;
