import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import StorePage from "./pages/StorePage/StorePage";
import PostmanPage from "./pages/PostmanPage/PostmanPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <nav className="nav">
                    <div className="nav__inner">
                        <div className="nav__brand">TechStore</div>
                        <div className="nav__links">
                            <NavLink to="/" end className="nav__link">
                                Магазин
                            </NavLink>
                            <NavLink to="/postman" className="nav__link">
                                Скриншоты Postman
                            </NavLink>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<StorePage />} />
                    <Route path="/postman" element={<PostmanPage />} />
                </Routes>
                <footer className="app-footer">
                    <div className="app-footer__inner">&copy; {new Date().getFullYear()} TechStore</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
