import React from 'react';
import {Link} from "react-router-dom";
import News from "../../Components/News/News.tsx";

const Home = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="mini-block d-flex">
                <div className="block-btn-new-post   ms-auto">
                    <Link to="/add-new-post" className="btn btn-primary">Add new post</Link>
                </div>
            </div>
            <div className="block-posts">
                <h2 className="text-center">Posts</h2>
                <News/>
            </div>

        </div>
    );
};

export default Home;