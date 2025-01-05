interface DividerProps {
  className?: string
  children: React.ReactNode
}

const Divider = ({ children }: DividerProps) => {
  return (
    <div className="text-foreground text-[12px] font-[400] flex justify-center items-center relative px-3 before:block before:h-[1px] before:w-full before:bg-primary before:content-normal before:mr-3 after:block after:h-[1px] after:w-full after:bg-primary after:content-normal after:ml-3">
      {children}
    </div>
  )
}

export default Divider
