'use client';

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from "@components/Form";

const Createprompt = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const[submitting, setSubmitting] = useState(false);
    const[post, setPost] = useState({prompt: "", tag: ""});
    const createPost = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({ prompt: post.prompt, userID: session?.user.id, tag: post.tag }),
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
        <Form type="Create" post={post} setPost={setPost} submitting={submitting} handlesubmit={createPost}/>
    </div>
  )
}

export default Createprompt
