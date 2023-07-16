import Promptcard from "./Promptcard"

const Profile = ({name,desc,data,handleedit,handledelete}) => {
  
  return (
    <section className='w-full'>
        <h1 className="head_text text-left">
            <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="text-left desc">{desc}</p>
        <div className='mt-10 prompt_layout'>
            {data.map((prompt) => (
                <Promptcard key={prompt.id} post={prompt} handleedit={()=>handleedit(prompt)} handledelete={()=>handledelete(prompt)}/>
            ))}
            </div>

    </section>
  )
}

export default Profile
