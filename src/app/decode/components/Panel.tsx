import ActionsBar from '@/components/ActionsBar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { actionBar } from '@/store/storeGlobal'
import { effect } from '@preact/signals-react'
import { useEffect } from 'react'

interface props {
  title: string
  className?: string
  idAction: string
  children: React.ReactNode
}

const Panel = ({ title, className, idAction, children }: props) => {
  actionBar.value = ''
  const actionBarEffect = effect(() => {
    switch (actionBar.value) {
      case `COPY_${idAction}`:
        console.log(`COPY_${idAction}`)
        break
      case `CLEAR_${idAction}`:
        console.log(`CLEAR_${idAction}`)
        break
    }
  })

  useEffect(() => {
    return () => {
      actionBarEffect()
    }
  }, [])
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="bg-itemSelected p-3">
        <CardTitle className="flex flex-row items-center">
          {title}
          <ActionsBar className="ml-auto" idAction={idAction} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">{children}</CardContent>
      <CardFooter className="mt-auto items-center">sdadsd</CardFooter>
    </Card>
  )
}

export default Panel
