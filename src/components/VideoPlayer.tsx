import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlayIcon } from 'lucide-react'
import { Button } from './ui/button'

type Props = {}

const VideoPlayer = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className="rounded-full">
          <PlayIcon className="h-2 w-2 text-[#776AF6]" />
          <span>Watch video</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <video className="h-full w-full" controls>
          <source src="/dentiliink.mp4" />
        </video>
      </DialogContent>
    </Dialog>
  )
}

export default VideoPlayer
