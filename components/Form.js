import Link from "next/link"

const Form = ({type, post, setPost, submitting, handlesubmit} ) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">Share your thoughts with the world</p>
        <form className="w-full max-w-2xl mt-10 flex flex-col gap-7 glassmorphism" onSubmit={handlesubmit}>
            <label className="font-satoshi font-semibold text-base text-gray-700">your Prompt
            <textarea  value={post.prompt} onChange={(e) => setPost({...post, prompt: e.target.value})} placeholder="write your prompt here" required className="form_textarea"/>
            </label>
            <label className="font-satoshi font-semibold text-base text-gray-700">your Tags
            <input  value={post.tag} onChange={(e) => setPost({...post, tag: e.target.value})} placeholder="#tag" required className="form_input"/>
            </label>
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
                <button type="submit" className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                </button>

            </div>
            

        </form>


    </section>
  )
}

export default Form
