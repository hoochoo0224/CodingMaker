import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import '../../styles/ui/scroll-area.css'

export function ScrollArea({ className = '', children, ...props }) {
  return (
    <ScrollAreaPrimitive.Root
      className={`scroll-area ${className}`}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="scroll-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="scroll-bar"
      >
        <ScrollAreaPrimitive.Thumb className="scroll-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
}