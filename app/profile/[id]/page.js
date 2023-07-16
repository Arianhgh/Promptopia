"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from "@components/Profile";

const Otherprofile = () => {
    const router = useRouter()
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchdata = async () => {
          const res = await fetch(`/api/users/${id}/posts`);
          const data = await res.json();
          setPosts(data);
  
        }
        const fetchuser = async () => {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();
            setUser(data);
        }
        if (id) {
            fetchuser();
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
        <Profile name={user?.username} desc="welcome to your profile" data={posts} handleedit={handleedit} handledelete={handledelete}/>
        
    </div>
  )
}

export default Otherprofile
