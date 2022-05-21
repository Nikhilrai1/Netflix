import './App.scss';
import Home from './components/Home';
import Watch from './components/Watch';
import Register from './components/Register';
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


function App() {
  const user = true;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          {user && (
            <>
              <Route exact path="/movies" element={<Home type="movie" />} />
              <Route exact path="/series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
