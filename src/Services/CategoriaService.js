import axios from "axios";

const CATEGORIA_BASE_REST_API_URL = "http://localhost:8082/api/category";
const CATEGORIA_BASE_REST_API_URL_SAVE = "http://localhost:8082/api/category/save";

class CategoriaService {
    static getAllCategorias() {
        return axios.get(CATEGORIA_BASE_REST_API_URL);
    }

    static createCategoria(categoria){
        return axios.post(CATEGORIA_BASE_REST_API_URL_SAVE, categoria);
    }

    static getCategoriaById(categoriaId) {
        return axios.get(CATEGORIA_BASE_REST_API_URL + '/' + categoriaId);
    }

    static updatedCategoria(categoriaId, categoria) {
        return axios.put(CATEGORIA_BASE_REST_API_URL + '/' + categoriaId, categoria);
    }

    static deleteCategoria(categoriaId) {
        console.log(categoriaId)
        return axios.delete(CATEGORIA_BASE_REST_API_URL + '/' + categoriaId);
    }
}

export default CategoriaService;
