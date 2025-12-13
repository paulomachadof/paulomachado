import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       Hi, I'm Paulo!
      </h1>
      <p className="mb-4">
        {`I'm a Product Manager with a strong foundation in computer science and engineering. My career spans from system analysis to senior product management roles at companies like Dell and Mentoro, where I've consistently delivered products that exceed business objectives 🚀.
        
        I specialize in bridging the gap between user needs and business goals through rigorous product discovery, data-driven decision making, and cross-functional collaboration. My approach combines technical depth with strategic thinking to create products that matter. 🎯`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
