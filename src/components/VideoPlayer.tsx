// import React from 'react'
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
// import { PlayIcon } from 'lucide-react'
// import { Button } from './ui/button'

// type Props = {}

// const VideoPlayer = (props: Props) => {
//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button variant={'outline'} className="rounded-full">
//           <PlayIcon className="h-2 w-2 text-[#776AF6]" />
//           <span>Watch video</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <video className="h-full w-full" controls>
//           <source src="/dentiliink.mp4" />
//         </video>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default VideoPlayer

'use client'
import { useRef, useState } from 'react'

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current?.play()
  }

  return (
    <div className="relative h-full w-full">
      {/* Video */}
      <video
        ref={videoRef}
        className="h-full w-full rounded-md"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        controls={isPlaying}
      >
        <source src="/dentiliink.mp4" />
      </video>

      {/* Overlay Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50">
          <button
            onClick={handlePlay}
            className="rounded-full bg-[#776AF6] p-4 shadow-md hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
