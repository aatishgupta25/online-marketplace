import { Timestamp, collection, addDoc } from "firebase/firestore";
import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, db, auth } from "../firebase-config.js";
import './CreatePost.css'

function AddArticle() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        phoneNo: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
        price: "",
    })

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);

        const uploadImage = uploadBytesResumable(storageRef, formData.image);
        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    title: "",
                    description: "",
                    phoneNo: "",
                    image: "",
                    price: "",
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "Articles");
                    addDoc(articleRef, {
                        title: formData.title,
                        description: formData.description,
                        phoneNo: formData.phoneNo,
                        imageUrl: url,
                        createdAt: Timestamp.now().toDate(),
                        createdBy: auth.currentUser.displayName,
                        userId: auth.currentUser.uid,
                        price: formData.price,
                    })
                        .then(() => {
                            console.log("added successfully")
                            alert("Listed !")
                            setProgress(0);
                        })
                        .catch((err) => {
                            console.log("added unsuccessfully")

                        });
                });
            }
        );
    };




    return (
        <div>
            <h1 classname="heading"> Create a New Listing</h1>

            <div className="indcomp">
                <h2 htmlFor="">Name</h2>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => handleChange(e)} />
            </div>
            <div className="indcomp">
                <h2 htmlFor="">Description </h2>
                <textarea placeholder="Give a brief description of the product" name="description" className="form-control" value={formData.description} onChange={(e) => handleChange(e)} />
            </div>
            <div className="indcomp">
                <h2 htmlFor="">Phone No.</h2>
                <input type="number" name="phoneNo" className="form-control" value={formData.phoneNo} onChange={(e) => handleChange(e)} />
            </div>
            <div className="indcomp">
                <h2 htmlFor="">Price</h2>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={(e) => handleChange(e)} />
            </div>
            <div className="indcomp">
                <h2 htmlFor="">Image</h2>
                <input type="file" name="image" accept="image/*" className="form-control" onChange={(e) => handleImageChange(e)} />
            </div>
            {progress === 0 ? null : (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped mt-2"
                        style={{ width: `${progress}%` }}
                    >
                        {`Uploading image ${progress}%`}
                    </div>
                </div>
            )}

            <button className="publish" onClick={handlePublish} > Publish </button>


        </div>
    )
}

export default AddArticle


// import React, { useState, useEffect } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db, auth, storage } from "../firebase-config";
// import { useNavigate } from "react-router-dom";
// import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// import { v4 } from 'uuid';

// function CreatePost({ isAuth }) {
//     const [title, setTitle] = useState("");
//     const [postText, setPostText] = useState("");

//     const postsCollectionRef = collection(db, "posts");
// let navigate = useNavigate();

//     const createPost = async () => {
//         await addDoc(postsCollectionRef, {
//             title,
//             postText,
//             author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
//         });
//         navigate("/home");
//     };

// useEffect(() => {
//     if (!isAuth) {
//         navigate("/login");
//     }
// }, []);

//     const [imageUpload, setImageUpload] = useState(null);
//     const [imageList, setImageList] = useState([]);

//     const imageListRef = ref(storage, 'images/')

//     useEffect(() => {
//         listAll(imageListRef).then((response) => {
//             response.items.forEach((item) => {
//                 getDownloadURL(item).then((url) => {
//                     setImageList((prev) => [...prev, url])
//                 });
//             });

//         });
//     }, []);


//     const uploadImage = () => {
//         if (imageUpload == null) return;
//         const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 setImageList((prev) => [...prev,])

//             })
//         })
//         alert("uploaded")
//     };

//     return (


//         <div className="createPostPage">


//             <div className="cpContainer">
//                 <h1>Create A Post</h1>

//                 <div>
//                     <input
//                         type="file"
//                         onChange={(event) => {
//                             setImageUpload(event.target.files[0])
//                         }} />
//                     <button onClick={uploadImage}> Upload Image
//                     </button>{imageList.map((url) => {
//                         return (<div>
//                             <img class="spl" src={url} alt="" />
//                         </div>)
//                     })}
//                 </div>

//                 <div className="inputGp">
//                     <label> Title:</label>
//                     <input
//                         placeholder="Title..."
//                         onChange={(event) => {
//                             setTitle(event.target.value);
//                         }}
//                     />
//                 </div>
//                 <div className="inputGp">
//                     <label> Post:</label>
//                     <textarea
//                         placeholder="Post..."
//                         onChange={(event) => {
//                             setPostText(event.target.value);
//                         }}
//                     />
//                 </div>
//                 <button onClick={createPost}> Submit Post</button>
//             </div>
//         </div>
//     );
// }

// export default CreatePost;
