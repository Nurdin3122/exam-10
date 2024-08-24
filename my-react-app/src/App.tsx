
import './App.css'
import {Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello,world</h1>}/>
        <Route path="*" element={<h3>Sorry,there is not such page</h3>}/>
      </Routes>
    </>
  )
};

export default App
