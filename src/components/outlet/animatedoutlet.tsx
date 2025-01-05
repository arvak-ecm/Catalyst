import {
  Outlet,
  RouterContextProvider,
  getRouterContext,
  useMatch,
  useMatches
} from '@tanstack/react-router'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import cloneDeep from 'lodash-es/cloneDeep'
import { useContext, useRef } from 'react'

const TRANSITION = { duration: 0.5 }

const AnimatedOutletComponent = () => {
  const matches = useMatches()
  const match = useMatch({ strict: false })
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
  const nextMatch = matches[nextMatchIndex]

  const RouterContext = getRouterContext()
  const routerContext = useContext(RouterContext)
  const renderedContext = useRef(routerContext)
  const isPresent = useIsPresent()

  const updateRenderedContext = () => {
    renderedContext.current = cloneDeep(routerContext)
  }
  if (isPresent) {
    const clone = cloneDeep(routerContext)
    renderedContext.current = clone
  }
  return (
    <AnimatePresence mode={'wait'}>
      <motion.div
        key={nextMatch.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={TRANSITION}
        onAnimationComplete={updateRenderedContext}
      >
        <RouterContextProvider router={renderedContext.current}>
          <Outlet />
        </RouterContextProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export const AnimatedOutlet = AnimatedOutletComponent
