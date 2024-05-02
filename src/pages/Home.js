import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config.js";
import DeleteArticle from "./DeleteArticle";
// import { Link } from "react-router-dom";
import './Home.css'

export default function Articles({ isAuth }) {


    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const articleRef = collection(db, "Articles");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);

        });
    }, []);

    return (
        <div>
            {articles.length === 0 ? (
                <p>No articles found!</p>
            ) : (
                articles.map(
                    ({
                        id,
                        title,
                        description,
                        phoneNo,
                        imageUrl,
                        createdAt,
                        createdBy,
                        userId,
                        price
                    }) => (
                        <div className="article" key={id}>

                            <div className="row">
                                <div className="img">
                                    <img
                                        src={imageUrl}
                                        alt="title"
                                        style={{ height: 180, width: 180 }}
                                    />
                                </div>
                                <div className="img">
                                    <h3>{title}</h3> <span><h3 className="price"> ₹ {price}</h3></span>

                                    <h5>{description}</h5>

                                    <h6 className="createdby">{createdBy}</h6>
                                    <h6 className="phoneNo">{phoneNo}</h6>

                                    <p>{createdAt.toDate().toDateString()}</p>
                                    {(isAuth) && auth.currentUser.uid === userId && (
                                        <DeleteArticle id={id} imageUrl={imageUrl} className="del" />
                                    )}
                                </div>

                            </div>
                        </div>
                    )
                )
            )}
        </div>
    );
}




// import React, { useEffect, useState } from "react";
// import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import { auth, db } from "../firebase-config";

// function Home({ isAuth }) {
//     const [postLists, setPostList] = useState([]);
//     const postsCollectionRef = collection(db, "posts");

//     useEffect(() => {
//         const getPosts = async () => {
//             const data = await getDocs(postsCollectionRef);
//             setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         };

//         getPosts();
//     });

//     const deletePost = async (id) => {
//         const postDoc = doc(db, "posts", id);
//         await deleteDoc(postDoc);
//     };

//     return (
//         <div className="homePage">
//             {postLists.map((post) => {
//                 return (
//                     <div className="post">
//                         <div className="postHeader">
//                             <div className="title">
//                                 <h1> {post.title}</h1>
//                             </div>

//                             <div className="deletePost">
//                                 {isAuth && post.author.id === auth.currentUser.uid && (
//                                     <button onClick={() => { deletePost(post.id); }} >
//                                         &#128465;
//                                     </button>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="postTextContainer"> {post.postText} </div>
//                         <h3>{post.author.name}</h3>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default Home;


