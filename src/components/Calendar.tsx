import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { InlineWidget } from 'react-calendly'
import useIsLargeScreen from '@/hooks/useIsLargeScreen'
import { CalendarIcon, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog } from '@/components/ui/dialog'

const MeetingScheduler = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLargeScreen } = useIsLargeScreen()
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <Button
        onClick={openModal}
        variant={'secondary'}
        className="h-12 w-full rounded-full"
      >
        <CalendarIcon className="h-5 w-5" />
        Prendre rendez-vous
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="modal-overlay"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: isLargeScreen ? '90%' : '100%' }}
              exit={{ width: '0%' }}
              transition={{ duration: 0.5 }}
              className="modal-content"
            >
              <Button onClick={closeModal} className="flex w-full justify-end">
                <XIcon className="h-6 w-6 text-white" />
              </Button>
              <InlineWidget url="https://calendly.com/oussamachahidi20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default MeetingScheduler
