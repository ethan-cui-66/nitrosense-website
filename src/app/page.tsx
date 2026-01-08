import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Model from '@/components/Model'
import Impact from '@/components/Impact'
import Brand from '@/components/Brand'
import Navigation from '@/components/ui/Navigation'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-nitro-black">
        <Navigation />
        
        <section id="hero">
          <Hero />
        </section>
        
        <section id="story">
          <Story />
        </section>
        
        <section id="model">
          <Model />
        </section>
        
        <section id="impact">
          <Impact />
        </section>
        
        <section id="brand">
          <Brand />
        </section>
      </main>
    </ErrorBoundary>
  )
}