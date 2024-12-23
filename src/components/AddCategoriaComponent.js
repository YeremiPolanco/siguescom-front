import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ProductoService from "../Services/ProductoService";
import ProveedorService from "../Services/ProveedorService";
import CategoriaService from "../Services/CategoriaService";

export const AddProductoComponent = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [costo, setCosto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [estado, setEstado] = useState('');
    const [proveedor, setProveedor] = useState(null); // Objeto completo de proveedor
    const [categoria, setCategoria] = useState(null); // Objeto completo de categoría
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const saveOrUpdatedProducto = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nombre);
        formData.append('description', descripcion);
        formData.append('price', precio);
        formData.append('cost', costo);
        formData.append('quantity', cantidad);
        formData.append('status', estado);
        formData.append('supplier', JSON.stringify(proveedor)); // Objeto completo de proveedor
        formData.append('category', JSON.stringify(categoria)); // Objeto completo de categoría
        formData.append('image', imagen); // Agregar la imagen al formulario

        if (id) {
            ProductoService.updateProducto(id, formData).then((response) => {
                console.log(response.data);
                navigate('/productos');
            }).catch(error => {
                console.log(error);
            });
        } else {
            ProductoService.createProducto(formData).then((response) => {
                console.log(response.data);
                navigate('/productos');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        ProductoService.getProductoById(id).then((response) => {
            setNombre(response.data.name);
            setDescripcion(response.data.description);
            setPrecio(response.data.price);
            setCosto(response.data.cost)
            setCantidad(response.data.quantity);
            setEstado(response.data.status);
            setProveedor(response.data.supplier); // Objeto completo de proveedor
            setCategoria(response.data.category); // Objeto completo de categoría
        }).catch(error => {
            console.log(error);
        });

        obtenerProveedores();
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

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <div className={'card'}>
                        <h2 className={'text-center'}>
                            {id ? 'Edit Producto' : 'Registrar Producto'}
                        </h2>
                        <div className={'card-body'}>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Digite su nombre" value={nombre}
                                                      onChange={(e) => setNombre(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicDescription">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type="text" placeholder="Digite su descripción" value={descripcion}
                                                      onChange={(e) => setDescripcion(e.target.value)}/>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicPrice">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control type="number" placeholder="Digite su Precio" value={precio}
                                                      onChange={(e) => setPrecio(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicCosto">
                                        <Form.Label>Costo</Form.Label>
                                        <Form.Control type="number" placeholder="Digite su Costo" value={costo}
                                                      onChange={(e) => setCosto(e.target.value)}/>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicCantidad">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control type="number" placeholder="Digite su Cantidad" value={cantidad}
                                                      onChange={(e) => setCantidad(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicEstado">
                                        <Form.Label>Estado</Form.Label>
                                        <div>
                                            <Button variant={estado === 'Activo' ? 'success' : 'outline-success'} onClick={() => setEstado('Activo')} className="me-2">
                                                Activo
                                            </Button>
                                            <Button variant={estado === 'Inactivo' ? 'danger' : 'outline-danger'} onClick={() => setEstado('Inactivo')}>
                                                Inactivo
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicImage">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control type="file" onChange={(e) => handleImageChange(e)} />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicProveedor">
                                        <Form.Label>Selecciona un proveedor:</Form.Label>
                                        <Form.Select value={proveedor?.supplierId} onChange={(e) => setProveedor({ supplierId: e.target.value })}>
                                            <option value="">Selecciona un proveedor...</option>
                                            {proveedores.map((proveedor) => (
                                                <option key={proveedor.supplierId} value={proveedor.supplierId}>{proveedor.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicCategoria">
                                        <Form.Label>Selecciona una Categoria:</Form.Label>
                                        <Form.Select value={categoria?.categoryId} onChange={(e) => setCategoria({ categoryId: e.target.value })}>
                                            <option value="">Selecciona una categoria...</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.categoryId} value={categoria.categoryId}>{categoria.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <div className="text-center">
                                    <Button variant="primary" onClick={(e) => saveOrUpdatedProducto(e)}>{id ? 'Actualizar' : 'Guardar'}</Button>
                                    <Link to={'/productos'} className={'btn btn-danger ms-2'}>Cancelar</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddProductoComponent;
