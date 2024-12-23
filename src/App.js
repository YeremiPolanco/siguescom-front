import './App.css';
import ListarCategoriasComponent from "./components/ListarCategoriasComponent";
import {HeaderComponent} from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddCategoriaComponent from "./components/AddCategoriaComponent";
import Index from "./components/Index";
import SidebarComponent from "./components/SidebarComponent";
import ListarProveedoresComponent from "./components/ListarProveedoresComponent";
import AddProveedorComponent from "./components/AddProveedorComponent";
import DeleteCategoriaComponent from "./components/DeleteCategoriaComponent";
import DeleteProveedorComponent from "./components/DeleteProveedorComponet";
import ListarProductoComponent from "./components/ListarProductoComponent";
import AddProductoComponent from "./components/AddProductoComponent";
import DeleteProductoComponent from "./components/DeleteProductoComponent";

function App() {
  return (
      <div>
          <BrowserRouter>
              <HeaderComponent/>
              <div className={"container"}>
                  <SidebarComponent/>
                  {/* Agrega el componente Sidebar aquí */}

                  {/* Contenido principal */}
                  <div className="content">
                      <Routes>
                          <Route exact path={"/"} element={<Index/>}/>
                          <Route
                              exact
                              path={"/categorias"}
                              element={<ListarCategoriasComponent/>}
                          />
                          <Route
                              exact
                              path={"/add-categoria"}
                              element={<AddCategoriaComponent/>}
                          />
                          <Route
                              exact
                              path={"/delete-categoria/:id"}
                              element={<DeleteCategoriaComponent/>}
                          />
                          <Route
                              exact
                              path={"/edit-categoria/:id"}
                              element={<AddCategoriaComponent/>}
                          />
                          <Route
                              exact
                              path={"/proveedores"}
                              element={<ListarProveedoresComponent/>}
                          />
                          <Route
                              exact
                              path={"/add-proveedor"}
                              element={<AddProveedorComponent/>}
                          />
                          <Route
                              exact
                              path={"/edit-proveedor/:id"}
                              element={<AddProveedorComponent/>}
                          />
                          <Route
                              exact
                              path={"/delete-proveedor/:id"}
                              element={<DeleteProveedorComponent/>}
                          />
                          <Route
                              exact
                              path={"/productos"}
                              element={<ListarProductoComponent/>}
                          />
                          <Route
                              exact
                              path={"/add-producto"}
                              element={<AddProductoComponent/>}
                          />
                          <Route
                              exact
                              path={"/edit-producto/:id"}
                              element={<AddProductoComponent/>}
                          />
                          <Route
                              exact
                              path={"/delete-producto/:id"}
                              element={<DeleteProductoComponent/>}
                          />
                      </Routes>
                  </div>
              </div>
              <FooterComponent/>
          </BrowserRouter>
      </div>
  );
}

export default App;
