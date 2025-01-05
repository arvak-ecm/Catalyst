import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface AboutProps {
  appName: string
  version: string
  author: string
  description: string
}

const About = ({ appName, version, author, description }: AboutProps) => {
  return (
    <DialogContent className="max-w-[400px]">
      <DialogHeader>
        <DialogTitle>About</DialogTitle>
        <div className="flex flex-col gap-1 my-5 ">
          <DialogDescription className="mt-3">
            <strong>Application: </strong> {appName}
          </DialogDescription>
          <DialogDescription>
            <strong>Version: </strong> {version}
          </DialogDescription>
          <DialogDescription>
            <strong>Author: </strong> {author}
          </DialogDescription>
          <DialogDescription className="mt-3">{description}</DialogDescription>
        </div>
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button size="sm" type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default About
