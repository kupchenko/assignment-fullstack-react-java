import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MovieDetails} from "./pages/MovieDetails";
import {MoviesPage} from "./pages/MoviesPage";
import {DefaultTemplate} from "./components/template/DefaultTemplate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultTemplate/>}>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movies/:movieId" element={<MovieDetails/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
