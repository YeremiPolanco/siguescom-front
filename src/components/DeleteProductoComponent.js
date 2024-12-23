// Importa las dependencias necesarias
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import ProductoService from "../Services/ProductoService";
import ProveedorService from "../Services/ProveedorService";
import CategoriaService from "../Services/CategoriaService";

// Define el componente
export const DeleteProductoComponent = () => {
    // Define los estados para el nombre, la descripción y el error
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [estado, setEstado] = useState('');
    const [proveedor, setProveedor] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const deleteProducto = async (e) => {
        e.preventDefault();
        try {
            // Elimina la categoría usando el servicio y maneja la promesa
            console.log(id);
            await ProductoService.deleteProducto(id);
            // Navega de regreso a la lista de categorías después de eliminar
            navigate('/productos');
        } catch (error) {
            // Maneja cualquier error que ocurra durante la eliminación
            setError("Error al eliminar la producto");
            console.log(error);
        }
    }


    // Obtiene los detalles de la categoría cuando el componente se monta
    useEffect(() => {
        ProductoService.getProductoById(id).then((response) => {
            setNombre(response.data.name);
            setDescripcion(response.data.description);
            setPrecio(response.data.price);
            setCantidad(response.data.quantity);
            setEstado(response.data.status);
            setProveedor(response.data.supplier); // Objeto completo de proveedor
            setCategoria(response.data.category); // Objeto completo de categoría
        }).catch(error => {
            console.log(error);
        });

        // Obtener proveedores
        obtenerProveedores();

        // Obtener categorias
        obtenerCategorias();
    }, [id]);

    const obtenerProveedores = async () => {
        try {
            const response = await ProveedorService.getAllProveedores();
            setProveedores(response.data);
        } catch (error) {
            console.log('Error al obtener proveedores:', error);
        }
    };

    const obtenerCategorias = async () => {
        try {
            const response = await CategoriaService.getAllCategorias();
            setCategorias(response.data);
        } catch (error) {
            console.log('Error al obtener categorias:', error);
        }
    };

    // Renderiza el componente
    return (
        <div className="container mt-5">
            <h2 className="text-center">Eliminar Categoría</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className={'card-body'}>
                            <Form>
                                <Form.Group className="mb-2" controlId="formBasicName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Digite su nombre" value={nombre} readOnly
                                                  onChange={(e) => setNombre(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicDescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" placeholder="Digite su descripción" value={descripcion} readOnly
                                                  onChange={(e) => setDescripcion(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicPrice">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" placeholder="Digite su Precio" value={precio} readOnly
                                                  onChange={(e) => setPrecio(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicQuantity">
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control type="number" placeholder="Digite su Cantidad" value={cantidad} readOnly
                                                  onChange={(e) => setCantidad(e.target.value)}/>
                                </Form.Group>


                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <ButtonGroup>
                                        <Button
                                            variant={estado === 'Activo' ? 'success' : 'secondary'}
                                            onClick={() => setEstado('Activo')}
                                            readOnly
                                        >
                                            Activo
                                        </Button>
                                        <Button
                                            variant={estado === 'Inactivo' ? 'danger' : 'secondary'}
                                            onClick={() => setEstado('Inactivo')}
                                            readOnly
                                        >
                                            Inactivo
                                        </Button>
                                    </ButtonGroup>

                                </div>

                                <Form.Group className="mb-2" controlId="formBasicProveedor">
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Select value={proveedor?.name} disabled>
                                        <option value="">Selecciona un proveedor...</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.supplierId} value={proveedor.name}>{proveedor.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text>Proveedor seleccionado: {proveedor?.name}</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select value={categoria?.name} disabled>
                                        <option value="">Selecciona una categoría...</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.categoryId} value={categoria.name}>{categoria.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text>Categoría seleccionada: {categoria?.name}</Form.Text>
                                </Form.Group>

                                <Button variant="success" onClick={(e) => deleteProducto(e)}>eliminar</Button>
                                &nbsp;&nbsp;
                                <Link to={'/productos'} className={'btn btn-danger'}>Cancelar</Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporta el componente
export default DeleteProductoComponent;
