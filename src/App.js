import Details from './Pages/Details.jsx';
import Main from './Pages/Main.jsx'
import Favorites from './Pages/FavoriteCities.jsx'
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Details />} path='/details' />
      <Route element={<Favorites />} path='/favorites' />
    </Routes>
  );
}

export default App;
