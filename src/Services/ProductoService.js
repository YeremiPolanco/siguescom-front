import axios from "axios";

const PRODUCTO_BASE_REST_API_URL = "http://localhost:8082/api/product";
const PRODUCTO_BASE_REST_API_URL_SAVE = "http://localhost:8082/api/product/save";

class ProductoService{
    static getAllProductos() {
        return axios.get(PRODUCTO_BASE_REST_API_URL);
    }

    static createProducto(producto) {
        return axios.post(PRODUCTO_BASE_REST_API_URL_SAVE, producto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static getProductoById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }

    static updateProducto(id, producto) {
        return axios.put(PRODUCTO_BASE_REST_API_URL + '/' + id, producto, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }


    static deleteProducto(productoId) {
        console.log(productoId)
        return axios.delete(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }
}

export default ProductoService;