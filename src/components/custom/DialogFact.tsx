import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'

interface Props {
  description?: React.ReactNode | string
  children: React.ReactNode
  title?: string
  size?: string
}

const DialogFact = ({
  children,
  description,
  title,
  size = '400px'
}: Props) => {
  const { t } = useTranslation()
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className={`max-w-[${size}]`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div className="text-sm text-muted-foreground">{description}</div>
        </DialogHeader>
        |
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button size="sm" type="button" variant="secondary">
              {t('components.dialog.btnClose')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogFact
