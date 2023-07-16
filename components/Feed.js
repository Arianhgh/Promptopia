"use client";
import { useEffect, useState } from 'react'
import Promptcard from "@components/Promptcard";
const Promptcardlist = ({data, handletagclick}) => {
  return (
    <div className='prompt_layout mt-16'>
      {data.map((prompt) => (
        <Promptcard key={prompt._id} post={prompt} handletagclick={handletagclick}/>
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      setFilteredPosts(posts)
      return
    }
    //filter based on either prompt or tag or user
    const filtered = posts.filter((post) => {
      return post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) || post.tag.toLowerCase().includes(e.target.value.toLowerCase()) || post.creator.username.toLowerCase().includes(e.target.value.toLowerCase())
    }
    )
    setFilteredPosts(filtered)
  }
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    }
    fetchdata();
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-6/12 flex-center'>
        <input type='text' placeholder='search for a prompt' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>
      <Promptcardlist data={filteredPosts} handletagclick={()=>{}}/>
    </section>
  )
}

export default Feed
