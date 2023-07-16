'use client';


import { useState, useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation';
import Form from "@components/Form";

const updatePrompt = () => {

    const router = useRouter();
    const[submitting, setSubmitting] = useState(false);
    const[post, setPost] = useState({prompt: "", tag: ""});
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch(`/api/prompt/${id}`);
            const data = await res.json();
            setPost({prompt: data.prompt, tag: data.tag});
        }
        if (id) {
            fetchdata();
        }
    }, [id]);
    const updatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!id){
            alert("No post to update");
            return;
        }
        try{
            const res = await fetch(`/api/prompt/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
            });
            setSubmitting(false);
            const json = await res.json();
            if(!res.ok){
                throw Error(json.message);
            }
            router.push("/");
        }
        catch(err){
            console.log(err);
        }
        finally{
            setSubmitting(false);
        }


    }

    

  return (
    <div className='w-full'>
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handlesubmit={updatePost}/>
    </div>
  )
}

export default updatePrompt
