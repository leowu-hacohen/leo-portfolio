import CaseStudy from '../../components/CaseStudy'

export default function NamiPage() {
  return (
    <CaseStudy
      canvasBackdropSrc="/case-study/nami-canvas-backdrop.png"
      company="Nami"
      descriptor="AI-powered college counseling, built in 24 hours."
      role="Product Manager & Designer"
      timeline="April 2026 · 24 Hours"
      type="Hackathon · FullyHacks 2026"
      tools="Figma · Claude API · Next.js · Supabase"
      tags={['AI', 'EdTech', 'Hackathon', '1st Place', 'Claude API']}
      context="The college application process is overwhelming, expensive to navigate, and deeply inequitable. Students without access to private counselors (which cost $200 to $500/hr) are left to figure it out alone. At FullyHacks 2026, our team set out to close that gap. Nami is an AI college counselor that gives every student a personalized, on-demand advisor: one that knows their profile, asks the right questions, and helps them build a strategy, not just a list."
      contributions={[
        'Defined the core problem space and user persona in the first two hours of the hackathon',
        'Scoped the MVP feature set, narrowing from five ideas to one clear, shippable flow',
        'Designed all screens in Figma: onboarding, profile intake, counseling chat, and college list view',
        'Wrote the Claude API system prompt and tuned it through iterative testing against real student scenarios',
        'Led the pitch, framing Nami as an equity tool, not just a productivity tool',
      ]}
      metrics={[
        { value: '1st', label: 'Place · FullyHacks 2026' },
        { value: '24h', label: 'End-to-end build' },
        { value: '3', label: 'Team members' },
      ]}
      sections={[
        {
          label: 'Problem',
          heading: 'College advising is a $2B industry most students can\'t access.',
          body: 'Private college counselors charge hundreds of dollars per session. School counselors manage hundreds of students. The result: the students who need the most guidance get the least. We wanted to ask, what if every student had a counselor in their pocket? Not a chatbot with generic answers, but something that actually knows them.',
          hasImage: false,
        },
        {
          label: 'Approach',
          heading: 'One intake. Infinite follow-ups.',
          body: 'Nami starts with a structured onboarding (GPA, test scores, extracurriculars, intended major, financial constraints) and builds a persistent student profile. Every subsequent conversation is grounded in that context. The Claude API prompt was engineered to ask clarifying questions before giving advice, mimicking the rhythm of a real counseling session rather than a search engine.',
          hasImage: true,
        },
        {
          label: 'Design',
          heading: 'Calm, focused, nothing extra.',
          body: 'The UI was designed to feel like a conversation, not a dashboard. No clutter, no overwhelming forms. The onboarding breaks into small steps. The chat interface is the primary surface. A soft college list view lives one tap away. Every decision was made to reduce anxiety, because that\'s what the user is already feeling.',
          hasImage: true,
        },
        {
          label: 'Pitch',
          heading: 'Framing equity, not just efficiency.',
          body: 'Most hackathon pitches lead with features. We led with the gap. We opened with the stat (1 counselor per 482 students nationally) and made the judges feel the problem before we showed the product. The demo followed the arc of a real student: confused sophomore to confident applicant. Judges responded to the clarity of the mission more than the technical execution.',
          hasImage: false,
        },
      ]}
      nextHref="/work"
    />
  )
}
