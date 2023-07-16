import Feed from '../components/Feed'
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and Share 
      <br className="hidden sm:block"/>
      <span className="orange_gradient text-center">Ai-powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptopia is a community of writers and artists who use Ai to generate prompts for their work.</p>

      <Feed />

    </section>
  )
}

export default Home
