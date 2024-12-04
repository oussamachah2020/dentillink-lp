'use client'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckCircleIcon,
  Infinity,
} from 'lucide-react'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { SlimLayout } from '@/components/SlimLayout'
import { databases } from '@/utils/client'
import { ID } from 'appwrite'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormSchema = {
  firstName: string
  lastName: string
  email: string
  source: string
}

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormSchema>()
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  function redirection() {
    setTimeout(() => {
      router.replace('/')
    }, 2000)
  }

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

  function submit(values: FormSchema) {
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
        redirection()
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      {submitted ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <CheckCircleIcon className="h-24 w-24 text-green-500" />
          <h2 className="text-xl font-semibold">
            Thank you for your interest in Harmony!
          </h2>
          <p className="w-[90%] text-center text-gray-500">
            Your information has been saved successfully. We'll keep you updated
            about our product and reach out to you with more details soon. If
            you have any immediate questions, feel free to contact us.
          </p>
        </div>
      ) : (
        <SlimLayout>
          <div className="flex">
            <Link href="/" aria-label="Home">
              <div className="flex h-16 shrink-0 flex-row items-center gap-3">
                <Infinity color="#3146F5" className="h-12 w-auto" />
                <div className="flex flex-col -space-y-1">
                  <h2 className="text-lg font-bold text-[#3146F5]">HARMONY</h2>
                </div>
              </div>
            </Link>
          </div>
          <h2 className="mt-16 text-2xl font-bold text-gray-900">
            Join us in Harmony
          </h2>

          <form
            onSubmit={handleSubmit(submit)}
            className="mt-10 flex flex-col gap-8"
          >
            <div className="flex h-full flex-row items-center justify-center gap-3">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First name"
                    type="text"
                    autoComplete="given-name"
                    required
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last name"
                    type="text"
                    autoComplete="family-name"
                    required
                  />
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  className="w-full"
                  required
                />
              )}
            />

            <Controller
              name="source"
              control={control}
              rules={{ required: 'Source is required' }}
              render={({ field }) => (
                <SelectField
                  {...field}
                  className="col-span-full"
                  label="How did you hear about Harmony?"
                >
                  <option value="">Select an option</option>
                  <option value="search-engine">Search engine</option>
                  <option value="social-media-ad">Social media ad</option>
                  <option value="friend-or-colleague">
                    Friend or colleague
                  </option>
                  <option value="podcast">Podcast</option>
                </SelectField>
              )}
            />

            {/* Submit Button */}
            <div className="col-span-full">
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
              >
                <span className="flex items-center justify-center">
                  Sign up{' '}
                  <span aria-hidden="true" className="ml-2">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </span>
              </Button>
            </div>
          </form>
        </SlimLayout>
      )}
    </>
  )
}
