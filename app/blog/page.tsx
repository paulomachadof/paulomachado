import { Projects } from 'app/components/posts'

export const metadata = {
  title: 'projects',
  description: 'my projects.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        projects
      </h1>
      <Projects />
    </section>
  )
}
