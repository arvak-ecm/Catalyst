import { createFileRoute } from '@tanstack/react-router'
import { TOKEN_VALUE } from '@/store/storeGlobal'

import JwtPage from '@/app/decode/jwt_page'

TOKEN_VALUE.value =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const Route = createFileRoute('/decode/_layout/jwt/')({
  loader: async () => {
    //await handleChangeToken(TOKEN_VALUE.value)
  },
  component: RouteComponent
})

function RouteComponent() {
  console.log(`🚀 ======== ROUTE LAYOUT JWT ======== 🚀`)
  return <JwtPage />
}
