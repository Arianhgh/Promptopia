"use client"
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from "@components/Profile";

const Myprofile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await res.json();
          setPosts(data);
  
        }
        if (session?.user.id) {
            fetchdata();
        }
      }, [])
    const handleedit = async (prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`);
        
    }
    const handledelete = async (prompt) => {
        const hasconfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasconfirmed){
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`, {method: "DELETE"});
                const filtered = posts.filter((post) => post._id !== prompt._id);
                setPosts(filtered);
            }
            catch(err){
                console.log(err);
            }
        }

    }

  return (
    <div className='w-full'>
        <Profile name="Arian" desc="welcome to your profile" data={posts} handleedit={handleedit} handledelete={handledelete}/>
        
    </div>
  )
}

export default Myprofile
