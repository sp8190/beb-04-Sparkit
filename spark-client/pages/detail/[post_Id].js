import { useRouter } from 'next/router';
import {gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useState } from 'react';
const GET_POST = gql`
query getPost($postId: String!){
    post(id: $postId){
        id
        title
        content 
        like @client
    }
}
`
const PostTitle= styled.h1`
  
`
const Content=styled.textarea`
    
`
const LikeBtn = styled.button`
    
`

export default function Post(){
    const [isLiked, setIsLiked] = useState(0);
    const router= useRouter();
    const id = router.query.id;
    console.log(`toke_id = ${id}`); 
    const {data, loading , client:{cache}} =useQuery(GET_POST, {
        variables:{
            postId:id,
        },
    });
    const onClick = () =>{
        cache.writeFragment({
            id:`posts:${id}`,
            fragment: gql`
                fragment postFragment on posts {
                like
                }
            `,
            data: {
                like:setIsLiked(isLiked +1)
            }
        })
    }
    console.log(data, loading);
    return (<div>
        <PostTitle>{loading ? "Loading..." : `${data?.post?.title}`}</PostTitle>
        <Content>{data?.post?.content}</Content>

        <LikeBtn onClick={onClick}>{data?.post?.like? 0 :{isLiked}}</LikeBtn>
    </div>
    
    )
}