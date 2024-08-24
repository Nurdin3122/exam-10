import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../Redux/hooks.ts";
import {NewMutation} from "../../Types.ts";
import {fetchGetNews, fetchPostNew} from "../News/NewsThunk.ts";
const emptyState:NewMutation = {
    title:"",
    content:"",
    image:null,
}

const AddNewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState<NewMutation>(emptyState);

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(newPost)
        try {
            await dispatch(fetchPostNew(newPost));
            await dispatch(fetchGetNews());
            navigate('/');
        } catch (error) {
            console.error('Failed to post new entry:', error);
        }
    }


    const changeForm = (event: React.ChangeEvent<HTMLInputElement >) => {
        setNewPost((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewPost(prevState => ({
                ...prevState, [name]: files[0]}));
        }
    };
    return (
        <div>
            <h3 className="mt-5 mb-3">Add new post</h3>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Title</label>
                    <input type="text"
                           className="form-control"
                           id="title" name="title"
                           value={newPost.title}
                           onChange={changeForm}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">content</label>
                    <input type="content"
                           className="form-control"
                           id="content"
                           name="content"
                           aria-describedby="emailHelp"
                           value={newPost.content}
                           onChange={changeForm}
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
                    <input type="file"
                           className="form-control"
                           id="Image"
                           name="image"
                           onChange={fileInputChangeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    );
};

export default AddNewPost;