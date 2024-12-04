import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Can Harmony handle payroll and employee management?',
      answer:
        'Absolutely! Harmony helps you manage employee schedules, payroll, and more, all in one platform.',
    },
    {
      question: 'Is my data secure on Harmony?',
      answer:
        'Yes, we take data security seriously with end-to-end encryption and regular security updates to ensure your business data is safe.',
    },
    {
      question: 'Can I manage multiple teams and projects?',
      answer:
        'Yes, Harmony is designed to support multiple teams and projects, making it easy to organize and assign tasks across departments.',
    },
  ],
  [
    {
      question: 'Does Harmony integrate with other tools?',
      answer:
        'Harmony integrates with various tools including payroll systems, bank accounts, and more to streamline your business operations.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes! We offer a 14-day free trial so you can experience all the features Harmony has to offer before committing to a plan.',
    },
    {
      question: 'How does Harmony help with project tracking?',
      answer:
        'Harmony allows you to easily track projects from start to finish, assign tasks, set deadlines, and monitor progress in real-time.',
    },
  ],
  [
    {
      question: 'Can I customize reports in Harmony?',
      answer:
        'Yes, Harmony provides flexible reporting options where you can create and customize reports based on your specific business needs.',
    },
    {
      question: 'Is there support if I run into any issues?',
      answer:
        'Of course! We offer 24/7 customer support, and our team is always ready to assist you with any issues or questions you have.',
    },
    {
      question: 'Can Harmony grow with my business?',
      answer:
        "Definitely! Harmony scales with your business, whether you're managing a small team or a large enterprise, we’ve got you covered.",
    },
  ],
];


export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
