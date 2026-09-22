import { Capabilities } from "@/components/capabilities"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { SiteHeader } from "@/components/site-header"
import { Story } from "@/components/story"

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Hero />
        <Story />
        <Capabilities />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
