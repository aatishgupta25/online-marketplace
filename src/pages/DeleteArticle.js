import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebase-config.js";
import './DeleteArticle.css'
import { deleteObject, ref } from "firebase/storage";

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await deleteDoc(doc(db, "Articles", id));
                console.log("Article deleted successfully")
                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            } catch (error) {
                console.log("Error deleting article")
                console.log(error);
            }
        }
    };
    return (
        <div>
            <button className="btn-danger" onClick={handleDelete} style={{ cursor: "pointer" }} className="del"> Delete Listing  </button>
        </div>
    );
}