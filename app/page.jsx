'use client'
import { useState, useEffect } from 'react'

import BootSequence  from '@/components/BootSequence'
import SystemNav     from '@/components/SystemNav'
import StatusBar     from '@/components/StatusBar'
import MissionControl from '@/components/MissionControl'
import SystemOverview from '@/components/SystemOverview'
import SkillsMatrix  from '@/components/SkillsMatrix'
import ProjectLab    from '@/components/ProjectLab'
import CareerLog     from '@/components/CareerLog'
import OpenChannel   from '@/components/OpenChannel'
import OsFooter      from '@/components/OsFooter'

export default function Home() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('rahyan-os-booted')) setBooted(true)
  }, [])

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* OS Shell */}
      <SystemNav />
      <StatusBar />

      {/* Main canvas — offset for sidebar (xl) and top bar (mobile) */}
      <main className="xl:ml-52 pt-12 xl:pt-0 mb-7">
        <MissionControl />
        <SystemOverview />
        <SkillsMatrix />
        <ProjectLab />
        <CareerLog />
        <OpenChannel />
        <OsFooter />
      </main>
    </>
  )
}
