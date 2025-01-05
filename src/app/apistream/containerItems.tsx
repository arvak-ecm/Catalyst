import { treeviewItemFocused } from '@/store/treeview'
import { memo } from 'react'

const ContainerItems = () => {
  console.log(`🚀 ======== ContainerItems ======== 🚀`)
  return (
    <div>
      <pre>{JSON.stringify(treeviewItemFocused.value, null, 2)}</pre>
    </div>
  )
}

export default memo(ContainerItems)
