import styled from 'styled-components';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'
import axios from "axios";

const CREATE_POST =gql`
mutation CreatePost($title: String!, $post_content: String!, $user_id: Int, $hashtags: [String]) {
    createPost(title: $title, post_content: $post_content, user_id: $user_id, hashtags: $hashtags)
  }
`

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

    const [fileImg, setFileImg] = useState(null);
    const sendFileToIPFS = async () => {
      console.log("시작", new Date().toLocaleString())
      if (fileImg) {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                'pinata_api_key': `54f614daf83b97f523ed`,
                'pinata_secret_api_key': `ee4d5326c60c345322fe611f7a1a04fb6a51077ee3e1c4d1305d1cc5fc11667a`,
                "Content-Type": "multipart/form-data"
            },
        });
        console.log("resFile", resFile)
        const ImgHash = `https://ipfs.moralis.io:2053/ipfs/${resFile.data.IpfsHash}`;
        setdataURL([...isdataURL, ImgHash]);
        console.log(ImgHash); 
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
                    <input type="file" onChange={(e) =>setFileImg(e.target.files[0])} required />
                    <button type='button' onClick={() => sendFileToIPFS()} >등록</button>
                    {
                        isImageUpload ?
                            loading ? "Loading image..." : "Upload complete!"
                            : null
                    }
                </ImageBox>
            </FormWrap>


            {isdataURL.map((token) => {
                return (
                    <div key={token} style={{
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
