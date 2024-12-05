'use client'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import { TextField } from './Fields'
import { Controller, useForm } from 'react-hook-form'
import { databases } from '@/utils/client'
import { ID } from 'appwrite'
import { useState } from 'react'
import { ArrowRightIcon, CalendarIcon, CheckCircleIcon } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { InlineWidget } from 'react-calendly'
import MeetingScheduler from './Calendar'

function SwirlyDoodle(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 281 40"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
      />
    </svg>
  )
}

function CheckIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        'h-6 w-6 flex-none fill-current stroke-current',
        className,
      )}
      {...props}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Plan({
  name,
  price,
  description,
  href,
  features,
  featured = false,
}: {
  name: string
  price: string
  description: string
  href: string
  features: Array<string>
  featured?: boolean
}) {
  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        featured
          ? 'order-first bg-blue-600 py-8 shadow-md lg:order-none'
          : 'lg:py-8',
      )}
    >
      <h3 className="mt-5 font-display text-lg text-white">{name}</h3>
      <p
        className={clsx(
          'mt-2 text-base',
          featured ? 'text-white' : 'text-slate-400',
        )}
      >
        {description}
      </p>
      <p className="order-first font-display text-5xl font-light tracking-tight text-white">
        {price}
      </p>
      <ul
        role="list"
        className={clsx(
          'order-last mt-10 flex flex-col gap-y-3 text-sm',
          featured ? 'text-white' : 'text-slate-200',
        )}
      >
        {features.map((feature) => (
          <li key={feature} className="flex">
            <CheckIcon className={featured ? 'text-white' : 'text-slate-400'} />
            <span className="ml-4">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={featured ? 'default' : 'outline'}
        color="white"
        className="mt-8"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button>
    </section>
  )
}

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email(),
  source: z.string().min(1),
})

export function Pricing() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [submitted, setSubmitted] = useState(false)

  async function notifyUser(email: string, fullName: string) {
    try {
      await fetch('/api/mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          to: email,
          userFullName: fullName,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function notifyAdmin(email: string, fullName: string) {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          userFullName: fullName,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  function submit(values: z.infer<typeof FormSchema>) {
    const fullName = `${values.firstName} ${values.lastName}`
    const promise = databases.createDocument(
      '67448f23003618f9046f',
      '67448f48003e71360b62',
      ID.unique(),
      {
        fullName,
        email: values.email,
        source: values.source,
      },
    )

    promise
      .then((response) => {
        setSubmitted(true)
        reset()
        notifyUser(values.email, fullName)
        notifyAdmin(values.email, fullName)
      })
      .catch((err) => console.error(err))
  }

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-purple-950 py-20 sm:py-32"
    >
      <Container>
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-purple-400" />
              <span className="relative">Des prix simples,</span>
            </span>{' '}
            accessibles à tous.
          </h2>
          <p className="mt-4 text-lg text-white">
            Peu importe la taille de votre cabinet, notre logiciel est conçu
            pour vous offrir une solution optimale.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          {submitted ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <CheckCircleIcon className="h-24 w-24 text-green-400" />
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl text-white">
                  Thank you for your interest in Harmony!
                </h2>
                <p className="font-semibold text-white">
                  Check Your e-mail box
                </p>
              </div>
              <p className="w-[90%] text-center text-gray-500">
                Your information has been saved successfully. We'll keep you
                updated about our product and reach out to you with more details
                soon. If you have any immediate questions, feel free to contact
                us.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Demander un compte
              </h2>
              <p className="mt-4 text-white">
                Êtes-vous praticien ? L'un de nos experts vous recontactera.
              </p>
              <form
                onSubmit={handleSubmit(submit)}
                className="mx-auto mt-10 flex max-w-lg flex-col gap-8"
              >
                {/* <div className="flex w-full flex-col items-center gap-3 text-white">
                <p>Assistance</p>
                <p>
                  Un SAV illimité et inclus dans votre redevance d’utilisation.
                  Disponible 6j/7 de 8h30 à 17h30.
                </p>
              </div> */}

                <div className="flex h-full w-full flex-row items-center justify-between gap-3">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-white">Prénom</label>
                        <TextField
                          {...field}
                          label=""
                          type="text"
                          autoComplete="given-name"
                          className="w-full"
                          required
                        />
                        {errors && (
                          <span className="bg-red-500">
                            {errors.firstName?.message}
                          </span>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <div className="flex w-full flex-col gap-2">
                        <label className="text-white">Nom</label>
                        <TextField
                          {...field}
                          label=""
                          type="text"
                          className="w-full"
                          autoComplete="family-name"
                          required
                        />
                        {errors && (
                          <span className="bg-red-500">
                            {errors.lastName?.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Enter a valid email address',
                    },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label className="text-white">E-mail</label>
                      <TextField
                        {...field}
                        label=""
                        type="email"
                        autoComplete="email"
                        className="w-full"
                        required
                      />
                      {errors && (
                        <span className="bg-red-500">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                {/* Submit Button */}
                <div className="col-span-full">
                  <Button
                    className={`h-12 w-full cursor-pointer rounded-full bg-purple-400 text-white ${!isValid ? 'opacity-60' : 'opacity-100'}`}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    <span className="flex items-center justify-center">
                      Envoyer
                      <span aria-hidden="true" className="ml-2">
                        <ArrowRightIcon className="h-4 w-4" />
                      </span>
                    </span>
                  </Button>
                </div>
              </form>
              <div className="mt-5 flex w-full flex-col gap-4">
                <Separator />
                <MeetingScheduler />
              </div>
            </div>
          )}
        </div>
        {/* <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          <Plan
            name="Free"
            price=""
            description="Explore at your own"
            href="/register"
            features={[
              'Manage up to 5 projects',
              'Assign tasks to up to 5 team members',
              'View employee schedules',
              'Track finances for up to 2 accounts',
              'Basic reporting',
              'Email support',
            ]}
          />
          <Plan
            featured
            name="Pro"
            price=""
            description="Best for growing businesses needing more advanced management."
            href="/register"
            features={[
              'Manage up to 15 projects',
              'Assign tasks to up to 20 team members',
              'Employee payroll integration',
              'Track finances for up to 5 accounts',
              'Advanced reporting & analytics',
              'Priority support',
            ]}
          />
          <Plan
            name="Basic"
            price=""
            description="Ideal for freelancers or small teams just getting started."
            href="/register"
            features={[
              'Manage up to 5 projects',
              'Assign tasks to up to 5 team members',
              'View employee schedules',
              'Track finances for up to 2 accounts',
              'Basic reporting',
              'Email support',
            ]}
          />
        </div> */}
      </Container>
    </section>
  )
}
