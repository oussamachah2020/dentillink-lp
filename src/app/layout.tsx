import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: 'Dentiliink',
    default: 'Dentiliink - management system for dentists',
  },
  description:
    'Découvrez notre solution complète de gestion du temps et des activités, conçue pour simplifier votre quotidien. Planifiez vos rendez-vous avec précision grâce à un calendrier intuitif, suivez vos heures de travail pour toute la semaine, et maîtrisez vos finances avec des outils avancés de gestion des dépenses. Notre plateforme est idéale pour les professionnels, les entreprises et les prestataires de soins, offrant également une gestion efficace des patients pour optimiser vos services. Restez organisé, économisez du temps et améliorez votre productivité dès aujourd’hui !',
  icons: {
    icon: '/logo.svg',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}
