import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useState } from "react";

const CREATE_POST = gql`
  mutation CreatePost($postId: String!) {
    createPost(id: $postId) {
        id
        title
        post_content
        image
    }
  }
`


export default function WritePost() {
    const [isImageUpload, setImageUploaded] = useState(false);
    const [isdataURL, setdataURL] = useState("");
    const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
        variables: { postId: 1 } 
    });
    

     console.log(data)

    const uploadImage = async (f: any) => {
        console.log("image upload", f.target.files[0])
        try {

            const imgURL = URL.createObjectURL(f.target.files[0]);
            setImageUploaded(true)
            setdataURL(imgURL);
        }
        catch (err) {
            console.log("upload failed ", err)
        }
    }
    
    return (
        <Wrapper>
            <FormWrap>
                <TitleBox>
                    <label className='title'>Posting to</label>
                    <input className='input' type="text" placeholder="제목" required></input>
                </TitleBox>
                <ContentBox>
                    <label className='content'>컨텐츠</label>
                    <textarea className='text' placeholder='내용을 입력하세요' required />
                </ContentBox>
                <HashBox>
                    <input className='hashtag' placeholder='#hash' required />
                </HashBox>
                <ImageBox>
                    <label className='image'>사진업로드</label>
                    <input className='upload' onChange={uploadImage} type="file" accept="image/*" placeholder='이미지업로드하세요' required></input>
                    {
                        isImageUpload ?
                            loading ? "Loading image..." : "Upload complete!"
                            : null
                    }
                </ImageBox>
            </FormWrap>
            <div style={{
                height: '40%',
                width: '40%'
            }}>
                <img aria-label="post image upload" src={isdataURL} />
            </div>
        </Wrapper>


    )
}

const Wrapper = styled.div`
    margin: 0 auto;
    background-color: #393939;
    color: #fafafa;
    min-height: calc(100vh - 52px);
    padding: 20px;
    box-sizing: border-box;
`;

const FormWrap = styled.form`
    display: grid;
    
    align-items: center;
    justify-content: center;
    max-width: 1400px;
    margin: 100px auto 0;
`;

const TitleBox = styled.div`
.title {
    display: grid;
    cursor:auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
  }

.input{
    
    width: 600px;
    height: 30px;
    font-size: 16px;
}
`;
const ContentBox = styled.div`
.content {
    display: grid;
    cursor:auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
    
  }

.text{

    width: 600px;
    height: 180px;
    font-size: 16px;
}
`;
const ImageBox = styled.div`
.image {
    display: grid;
    cursor:auto;
    font-weight: 600;
    font-size: 32px;
    line-height: 60px;
  }

.upload{
    
}
`;

const HashBox = styled.div`
.hashtag{
    margin: 5px auto;
    width: 600px;
    height: 30px;
    font-size: 16px;
}
`;
