import React, { useEffect, useState } from "react";
import ProductoService from "../Services/ProductoService";
import ProveedorService from "../Services/ProveedorService";
import CategoriaService from "../Services/CategoriaService";

const Index = () => {
    // Estados para almacenar los datos de categorías, proveedores y productos
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);

    // Estados para almacenar la cantidad de proveedores, categorías y la suma total de precios de los productos
    const [cantidadProveedores, setCantidadProveedores] = useState(0);
    const [cantidadCategorias, setCantidadCategorias] = useState(0);
    const [totalPreciosProductos, setTotalPreciosProductos] = useState(0);

    // Función para obtener los datos de categorías
    const obtenerCategorias = async () => {
        try {
            const response = await CategoriaService.getAllCategorias();
            setCategorias(response.data);
            setCantidadCategorias(response.data.length);
        } catch (error) {
            console.error('Error al obtener los datos de categorías:', error);
        }
    };

    // Función para obtener los datos de proveedores
    const obtenerProveedores = async () => {
        try {
            const response = await ProveedorService.getAllProveedores();
            setProveedores(response.data);
            setCantidadProveedores(response.data.length);
        } catch (error) {
            console.error('Error al obtener los datos de proveedores:', error);
        }
    };

    // Función para obtener los datos de productos
    const obtenerProductos = async () => {
        try {
            const response = await ProductoService.getAllProductos();
            setProductos(response.data);

            // Calcular la suma total de precios de los productos
            const total = response.data.reduce((accumulator, currentValue) => {
                // Verificar si tanto el precio como la cantidad son números antes de calcular el subtotal
                if (!isNaN(currentValue.price) && !isNaN(currentValue.quantity)) {
                    const subtotal = currentValue.price * currentValue.quantity;
                    return accumulator + subtotal;
                } else {
                    return accumulator;
                }
            }, 0);

            setTotalPreciosProductos(total);
        } catch (error) {
            console.error('Error al obtener los datos de productos:', error);
        }
    };

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        obtenerCategorias();
        obtenerProveedores();
        obtenerProductos();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-primary shadow">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Cantidad de Proveedores</h5>
                            <p className="card-text h2">{cantidadProveedores}</p>
                            <p className="card-text">Explora los diferentes proveedores de productos</p>
                            <a href="/proveedores" className="btn btn-primary">Ver Proveedores</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-primary shadow">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Cantidad de Categorías</h5>
                            <p className="card-text h2">{cantidadCategorias}</p>
                            <p className="card-text">Explora las diferentes categorías de productos</p>
                            <a href="/categorias" className="btn btn-primary">Ver Categorías</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-primary shadow">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Total de Precios de Productos</h5>
                            <p className="card-text h2">S/. {totalPreciosProductos}</p>
                            <p className="card-text">Analiza el costo total de todos los productos</p>
                            <a href="/productos" className="btn btn-primary">Ver Productos</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
