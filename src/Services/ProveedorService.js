import axios from "axios";

const PROVEEDOR_BASE_REST_API_URL = "http://localhost:8082/api/supplier";
const PROVEEDOR_BASE_REST_API_URL_SAVE = "http://localhost:8082/api/supplier/save";


class ProveedorService{
    static getAllProveedores() {
        return axios.get(PROVEEDOR_BASE_REST_API_URL);
    }

    static createProveedor(proveedor){
        return axios.post(PROVEEDOR_BASE_REST_API_URL_SAVE, proveedor);
    }

    static getProveedorById(proveedorId) {
        return axios.get(PROVEEDOR_BASE_REST_API_URL + '/' + proveedorId);
    }

    static updatedProveedor(proveedorId, proveedor) {
        return axios.put(PROVEEDOR_BASE_REST_API_URL + '/' + proveedorId, proveedor);
    }

    static deleteProveedoor(proveedorId) {
        console.log(proveedorId)
        return axios.delete(PROVEEDOR_BASE_REST_API_URL + '/' + proveedorId);
    }
}

export default ProveedorService;