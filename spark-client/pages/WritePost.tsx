import styled from 'styled-components';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'
import { create } from "ipfs-http-client";

const CREATE_POST =gql`
mutation CreatePost($title: String!, $post_content: String!, $user_id: Int, $hashtags: [String]) {
    createPost(title: $title, post_content: $post_content, user_id: $user_id, hashtags: $hashtags)
  }
`
// 무시해 주셔도 됩니다. (잘 돌아가지만 수정할 예정)
const client = create("https://ipfs.infura.io:5001/api/v0");

export default function WritePost() {
    const [isImageUpload, setImageUploaded] = useState(false);
    const [isdataURL, setdataURL] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [hash, setHash] = useState("");
    const [addNote, { loading, error }] = useMutation(CREATE_POST);


    const handleClick = () => {
        console.log(title)
        console.log(content)
        console.log(hash)
        console.log(isdataURL)
        
        // 아직 업로드 x
        // addNote({ variables: { 
        //     title: title,
        //     post_content: content,
        //     user_id: 1,
        //     hashtags: [hash]
        //  } });
    };



    const uploadImage = async (f: any) => {
        //console.log("image upload", f.target.files[0])
        const img = f.target.files[0];
        try {
            const added = await client.add(img); //파일 업로드
            const url = `https://ipfs.io/ipfs/${added.path}`;
            console.log(url)
            setImageUploaded(true)
            // 무시해 주셔도 됩니다. (잘 돌아가지만 수정할 예정)
            setdataURL([...isdataURL, url]);
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
                    <input className='input' type="text" 
                    onChange={({ target: { value } }) => setTitle(value)}
                    placeholder="제목" required></input>
                </TitleBox>
                <ContentBox>
                    <label className='content'>컨텐츠</label>
                    <textarea className='text' 
                    onChange={({ target: { value } }) => setContent(value)}
                    placeholder='내용을 입력하세요' required />
                </ContentBox>
                <HashBox>
                    <input className='hashtag' 
                    onChange={({ target: { value } }) => setHash(value)}
                    placeholder='#hash' required />
                </HashBox>
                <ImageBox>
                    <label className='image'>사진업로드</label>
                    <input className='upload' onChange={uploadImage} type="file" accept="image/*" required></input>
                    {
                        isImageUpload ?
                            loading ? "Loading image..." : "Upload complete!"
                            : null
                    }
                </ImageBox>
            </FormWrap>


            {isdataURL.map((token) => {
                return (
                    <div style={{
                        height: '40%',
                        width: '40%'
                    }}>           
                        <img alt='imgURL' src={token}/>
                     </div>
                );
            })}
            
            <button onClick={handleClick}>제출</button>
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
