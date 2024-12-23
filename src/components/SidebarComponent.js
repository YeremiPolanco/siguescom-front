import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faList, faPlus} from '@fortawesome/free-solid-svg-icons';

const SidebarComponent = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <button onClick={toggleSidebar} className={`btn btn-dark btn-menu ${isActive ? 'active' : ''}`}>
                ☰ Menú
            </button>
            <nav id="sidebar" className={isActive ? "active bg-dark" : "bg-dark"}>
                <div className="sidebar-header">
                    <h3>Menú</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/" className="nav-link">
                            <FontAwesomeIcon icon={faHome}/>
                            &nbsp;&nbsp; Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/categorias" className="nav-link">
                            <FontAwesomeIcon icon={faList}/>
                            &nbsp;&nbsp; Categorías
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-categoria" className="nav-link">
                            <FontAwesomeIcon icon={faPlus}/>
                            &nbsp;&nbsp; Agregar Categoría
                        </Link>
                    </li>
                    <li>
                        <Link to="/proveedores" className="nav-link">
                            <FontAwesomeIcon icon={faList}/>
                            &nbsp;&nbsp; Proveedores
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-proveedor" className="nav-link">
                            <FontAwesomeIcon icon={faPlus}/>
                            &nbsp;&nbsp; Agregar Proveedor
                        </Link>
                    </li>
                    <li>
                        <Link to="/productos" className="nav-link">
                            <FontAwesomeIcon icon={faList}/>
                            &nbsp;&nbsp; Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-producto" className="nav-link">
                            <FontAwesomeIcon icon={faPlus}/>
                            &nbsp;&nbsp; Agregar Producto
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarComponent;
