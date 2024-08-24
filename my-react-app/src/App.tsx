
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Container/Header/header.tsx";
import Home from "./Container/Home/Home.tsx";
import AddNewPost from "./Components/AddNewPost/AddNewPost.tsx";
import OneNew from "./Components/OneNew/OneNew.tsx";

const App = () => {
  return (
    <>
        <header>
            <Header/>
        </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/add-new-post" element={<AddNewPost/>}/>
          <Route path="posts/:id" element={<OneNew/>}/>
        <Route path="*" element={<h3>Sorry,there is not such page</h3>}/>
      </Routes>
    </>
  )
};

export default App
