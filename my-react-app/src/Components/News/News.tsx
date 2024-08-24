import React, {useEffect} from 'react';
import {fetchDeleteNew, fetchGetNews} from "./NewsThunk.ts";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks.ts";
import {selectLoading, selectMews} from "../../Redux/NewsSlice.ts";
import Spinner from "../Spinner/Spinner.tsx";
import {Link} from "react-router-dom";
import "./News.css"


const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectMews);
    const loading = useAppSelector(selectLoading);
    console.log(news)

    useEffect ( () => {
        dispatch(fetchGetNews())
    }, [dispatch]);

    const DeletePost = async (id:number) => {
        await dispatch(fetchDeleteNew(id));
        await dispatch(fetchGetNews());

    }

    return (
        <>
            {loading ? <Spinner/> : (
                news.map(oneNew => (
                    <div key={oneNew.id} className="card block-card mt-4 ms-auto me-auto">
                        <div className="d-flex flex-column mt-5 mb-5">
                            <div className="block-img">
                                <img className="card-img-top" src={oneNew.image_url}
                                     alt="there is not a picture, sorry"/>
                            </div>
                            <div className="block-body-card">
                                <p className="card-text">{oneNew.title}</p>
                                <p className="card-text text-secondary">{oneNew.created_at}</p>
                            </div>
                            <div className="block-footer-card mt-3">
                                <Link to={`/posts/${oneNew.id}`} className="btn btn-success me-4">READ FULL POST</Link>
                                <button className="btn btn-danger" onClick={() => DeletePost(oneNew.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            )
            }

        </>
    );
};

export default News;