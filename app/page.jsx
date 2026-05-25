import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Qualification from '@/components/Qualification'
import LookingFor from '@/components/LookingFor'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollUp from '@/components/ScrollUp'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import CursorSpotlight from '@/components/CursorSpotlight'
import SectionNav from '@/components/SectionNav'
import Preloader from '@/components/Preloader'
import HireMeBar from '@/components/HireMeBar'
import EasterEgg from '@/components/EasterEgg'

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <CursorSpotlight />
      <ScrollProgress />
      <SectionNav />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Qualification />
        <LookingFor />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
      <HireMeBar />
      <EasterEgg />
    </>
  )
}
