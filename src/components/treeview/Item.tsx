import { cn } from '@/lib/utils'
import { TreeItemRenderContext } from 'react-complex-tree'

interface props {
  depth: number
  title: React.ReactNode
  arrow: React.ReactNode
  context: TreeItemRenderContext<never>
}

//data-[rct-item-focus=true]:bg-itemSelected hover:bg-sidebar-accent

const Item = ({ depth, title, arrow, context }: props) => {
  const InteractiveComponent = context.isRenaming ? 'div' : 'button'
  return (
    <InteractiveComponent
      className={cn(
        'item-tree relative flex flex-row items-center transition-client text-muted-foreground w-full data-[rct-item-focus=true]:text-accent-foreground  bg-transparent cursor-default py-1.5 px-2 focus-visible:outline-hidden z-2 before:'
      )}
      type="button"
      {...context.itemContainerWithoutChildrenProps}
      {...(context.interactiveElementProps as any)}
    >
      <div
        /*style={{
          paddingLeft: `${depth * 16}px`
        }}*/
        className={cn(
          'flex flex-row w-full items-center gap-1 pr-[16px]',
          depth > 0 && ''
        )}
      >
        <i
          className={cn(
            'h-[16px] relative',
            depth > 0 && 'lineTree',
            arrow && 'w-1px'
          )}
        >
          {arrow}
        </i>
        <div className="text-sm w-full text-left truncate">{title}</div>
      </div>
    </InteractiveComponent>
  )
}

export default Item
