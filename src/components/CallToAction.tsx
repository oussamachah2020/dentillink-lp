import Image from 'next/image'

import { Container } from '@/components/Container'
import { Button } from './ui/button'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-[#776AF6] py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Commencez dès aujourd'hui.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Lancez votre pratique dentaire sur la voie du succès dès aujourd'hui
            avec une gestion simplifiée et efficace
          </p>
          <Button variant={'secondary'} className="mt-10 rounded-full">
            Profitez de 30 jours gratuits dès maintenant
          </Button>
        </div>
      </Container>
    </section>
  )
}
