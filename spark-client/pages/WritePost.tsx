import {gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useState } from "react";

const CREATE_POST =gql`
query createPost($postId: String!){
    post(id: $postId){
        id
        title
        content
        image
    }
}   
`


export default function WritePost() {
    const [isImageUpload, setImageUploaded] = useState(false);
    const [isdataURL, setdataURL] = useState("");
    const {data, loading} =useQuery(CREATE_POST);
     console.log(data)
     
     const uploadImage =async (f:any) => {
        console.log("image upload", f.target.files[0])
        try{
            
            const imgURL = URL.createObjectURL(f.target.files[0]);
            setImageUploaded(true)
            setdataURL(imgURL);
        }
        catch (err) {
            console.log("upload failed ", err)
          }
    }
    return (
        <div>
            <form>
           <div>
            <label>제목</label>
            <input type="text" placeholder="Upload" required></input>
           </div>
           <div>
            <label>컨텐츠</label>
            <textarea placeholder='WritePost' required />
           </div>
           <div>
            <label>사진업로드</label>
            <input onChange={uploadImage} type="file" accept="image/*" placeholder='이미지업로드하세요' required></input>
            {
                  isImageUpload ?
                  loading ? "Loading image..." : "Upload complete!"
                    : null
                }
           </div>
           </form>
           <div style={{
               height: '40%',
               width: '40%'
           }}>
            <img src={isdataURL}/>
           </div>
        </div>
        

    )
}