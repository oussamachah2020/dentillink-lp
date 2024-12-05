'use client'
import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Logo from '@/../public/logo.svg'
import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'
import { Button } from './ui/button'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition-transform',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition-transform',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      {({ open }) => (
        <>
          <PopoverButton
            className="relative z-10 flex h-8 w-8 items-center justify-center"
            aria-label="Toggle Navigation"
          >
            <MobileNavIcon open={open} />
          </PopoverButton>
          <PopoverBackdrop
            className={clsx(
              'fixed inset-0 bg-slate-300/50 transition-opacity duration-150',
              open ? 'opacity-100' : 'opacity-0',
            )}
          />
          <PopoverPanel
            className={clsx(
              'absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 transition-all duration-150',
              open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            )}
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/register">Join Us</MobileNavLink>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link
              href="#"
              aria-label="Home"
              className="flex flex-row items-center gap-3 text-blue-600"
            >
              <Image src={Logo} alt="logo" width={150} height={150} />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button className="rounded-full bg-[#776AF6]">
              <span>
                Commencez Dès{' '}
                <span className="hidden lg:inline">Aujourd'hui</span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
