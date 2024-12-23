import React, {useEffect, useState} from "react";
import ProveedorService from "../Services/ProveedorService";
import {Link, useNavigate, useParams} from "react-router-dom";

export const AddProveedorComponent = () =>{
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdatedProveedor = (e) =>{
        e.preventDefault();
        const proveedor = {
            name: nombre,
            address: direccion,
            phone: telefono
        };

        if (id){
            ProveedorService.updatedProveedor(id, proveedor).then((response) => {
                console.log(response.data)
                navigate('/proveedores')
            }).catch(error =>{
                console.log(error);
            });
        }
        else {
            ProveedorService.createProveedor(proveedor).then((response) => {
                console.log(response.data)
                navigate('/proveedores')
            }).catch(error =>{
                console.log(error);
            });
        }

        console.log(proveedor);

    }

    useEffect(() => {
        ProveedorService.getProveedorById(id).then((response) => {
            setNombre(response.data.name);
            setDireccion(response.data.address);
            setTelefono(response.data.phone)
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const title = () =>{
        if (id){
            return <h2 className={'text-center'}>Edit Proveedor</h2>
        }
        else {
            return <h2 className={'text-center'}>Registrar Proveedor</h2>

        }
    }

    return (
        <div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'card col-md-6 offset-md-3 offset-md-3'}>
                        <h2 className={'text-center'}>
                            {
                                title()
                            }
                        </h2>
                        <div className={'card-body'}>
                            <form>
                                <div className={'form-group mb-2'}>
                                    <label className={'form-label'}>Nombre</label>
                                    <input
                                        type={'text'}
                                        placeholder={'Digite su nombre'}
                                        name={'name'}
                                        className={'form-control'}
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className={'form-group mb-2'}>
                                    <label className={'form-label'}>Dirección</label>
                                    <input
                                        type={'text'}
                                        placeholder={'Digite su dirección'}
                                        name={'address'}
                                        className={'form-control'}
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>
                                <div className={'form-group mb-2'}>
                                    <label className={'form-label'}>Telefono</label>
                                    <input
                                        type={'text'}
                                        placeholder={'Digite su Telefono'}
                                        name={'phone'}
                                        className={'form-control'}
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>
                                <button className={'btn btn-success'} onClick={(e) => saveOrUpdatedProveedor(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to={'/proveedores'} className={'btn btn-danger'}>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProveedorComponent;