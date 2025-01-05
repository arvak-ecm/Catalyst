import { RouterProvider, useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  router: ReturnType<typeof useRouter>
  basePath: string
}

const AnimatedRouter = ({ router, basePath }: Props) => {
  ///const router = useRouter()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.state.location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RouterProvider router={router} basepath={basePath} />
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRouter
