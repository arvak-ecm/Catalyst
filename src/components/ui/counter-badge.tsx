interface CounterBadgeProps {
  count: number
}

export function CounterBadge({ count }: CounterBadgeProps) {
  return (
    <span className="px-2 py-0.5 text-sm font-medium bg-muted text-muted-foreground rounded-(--radius) ring-1 ring-border/50">
      {count}
    </span>
  )
}
