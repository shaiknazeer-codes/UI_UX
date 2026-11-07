'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import BentoGrid from '@/components/BentoGrid'
import WorkflowTabs from '@/components/WorkflowTabs'
import KeyboardSection from '@/components/KeyboardSection'
import IntegrationsGrid from '@/components/IntegrationsGrid'
import Changelog from '@/components/Changelog'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'
import GetStartedModal from '@/components/GetStartedModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col selection:bg-accent selection:text-white">
      {/* 1. Sticky Nav */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero with Interactive Command Palette */}
        <Hero onOpenModal={handleOpenModal} />

        {/* 3. Social Proof Strip */}
        <SocialProof />

        {/* 4. Feature Bento Grid */}
        <BentoGrid />

        {/* 5. Workflow Tabs (Plan / Build / Ship) */}
        <WorkflowTabs onOpenModal={handleOpenModal} />

        {/* 6. Keyboard Interactive Section */}
        <KeyboardSection />

        {/* 7. Integrations Grid */}
        <IntegrationsGrid />

        {/* 8. Changelog & Testimonials */}
        <Changelog />
        <Testimonials />

        {/* 9. Pricing */}
        <Pricing onOpenModal={handleOpenModal} />

        {/* 10. Closing CTA */}
        <ClosingCTA onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* 11. Accessible Get Started Modal */}
      <GetStartedModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

