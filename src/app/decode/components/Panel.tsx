import ActionsBar from '@/components/ActionsBar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { actionBar, TOKEN_VALUE } from '@/store/storeGlobal'
import { effect } from '@preact/signals-react'
import { useEffect } from 'react'

interface props {
  title: string
  className?: string
  idAction: string
  children: React.ReactNode
  isFooter?: boolean
}

const Panel = ({
  title,
  className,
  idAction,
  children,
  isFooter = false
}: props) => {
  actionBar.value = ''
  const actionBarEffect = effect(() => {
    switch (actionBar.value) {
      case `COPY_${idAction}`:
        console.log(`COPY_${idAction}`)
        break
      case `CLEAR_${idAction}`:
        if (idAction === 'JWT') TOKEN_VALUE.value = ''
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
      <CardHeader className="bg-item-selected p-3">
        <CardTitle className="flex flex-row items-center">
          {title}
          <ActionsBar className="ml-auto" idAction={idAction} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">{children}</CardContent>
      {isFooter && (
        <CardFooter className="mt-auto items-center">sdadsd</CardFooter>
      )}
    </Card>
  )
}

export default Panel
