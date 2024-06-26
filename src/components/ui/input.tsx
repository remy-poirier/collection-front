import * as React from 'react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator.tsx'
import { CurrencyIcon } from '../currency-icon'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.JSX.Element | string
  endIcon?: React.JSX.Element | string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, endIcon, className, type, ...props }, ref) => {
    return (
      <div className="items-center gap-2 flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input">
        {startIcon && (
          <>
            {startIcon}
            <Separator orientation="vertical" />{' '}
          </>
        )}
        <input
          type={type}
          className={cn(
            'w-full outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <>
            <Separator orientation="vertical" />
            {endIcon}
          </>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: string
}

const BigInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, currency, ...props }, ref) => {
    return (
      <div className="items-center gap-2 flex h-auto w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input">
        <input
          type="number"
          className={cn(
            'w-full text-[60px] px-2 outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            className,
          )}
          ref={ref}
          {...props}
        />
        <Separator orientation="vertical" />
        <CurrencyIcon size={60} currency={currency} />
      </div>
    )
  },
)
BigInput.displayName = 'BigInput'


export { Input, BigInput }