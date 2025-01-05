import { ScrollArea } from '@/components/ui/scroll-area'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div id="container-home" className="flex-1 box-border h-full">
      <h1>Home</h1>
      <p>Welcome to your app!</p>
      <Link to="/apistream/collection">Link</Link>
      <ScrollArea className="w-48 h-[calc(100%-80px)] rounded-md border">
        <div className="">
          {[...Array(1000)].map((_, i) => {
            return (
              <div className="bg-blue-300" key={i}>
                hola {i}
              </div>
            )
          })}
          {/*<TreeView
                  dbKey="APISTREAM"
                  tableKey="COLLECTIONS"
                  treeId={APISTREAM_CONFIG.collections.idTree}
                  SubMenuItemComponent={(props) => <SubMenuItemTreeView {...props} />}
                />*/}
        </div>
      </ScrollArea>
    </div>
  )
}
