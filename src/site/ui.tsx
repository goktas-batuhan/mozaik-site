import { Check, Copy } from 'lucide-react'
import { useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/utils'

const buttonBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,border-color,transform] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

export const buttonStyles = {
  primary: cn(buttonBase, 'h-10 bg-foreground px-5 text-background hover:bg-foreground/85'),
  outline: cn(buttonBase, 'h-10 border bg-background/60 px-5 backdrop-blur hover:bg-accent'),
  ghost: cn(buttonBase, 'h-9 px-3 text-muted-foreground hover:bg-accent hover:text-foreground'),
  icon: cn(buttonBase, 'size-9 text-muted-foreground hover:bg-accent hover:text-foreground'),
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: LinkProps & { variant?: keyof typeof buttonStyles }) {
  return <Link className={cn(buttonStyles[variant], className)} {...props} />
}

export function Badge({
  tone = 'neutral',
  className,
  ...props
}: ComponentPropsWithoutRef<'span'> & { tone?: 'neutral' | 'primary' | 'success' | 'warning' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] leading-4 tracking-wide uppercase',
        tone === 'neutral' && 'text-muted-foreground',
        tone === 'primary' && 'border-primary/30 bg-primary/10 text-primary',
        tone === 'success' && 'border-success/30 bg-success/10 text-success',
        tone === 'warning' && 'border-destructive/30 bg-destructive/10 text-destructive',
        className,
      )}
      {...props}
    />
  )
}

export function StatusBadge({ status }: { status: 'stable' | 'beta' }) {
  return (
    <Badge
      tone={status === 'stable' ? 'success' : 'warning'}
      title={status === 'stable' ? 'Passed the quality gate' : 'Did not pass every gate check yet'}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}

export function CopyButton({ value, label = 'Copy', className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)
  return (
    <button
      type="button"
      className={cn(buttonStyles.icon, 'size-8 shrink-0', className)}
      aria-label={copied ? 'Copied' : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setCopied(false), 1600)
        } catch {
          // pano izni yoksa sessiz geç
        }
      }}
    >
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}

/** Tek satırlık komut; terminal görünümü + kopyala. */
export function Command({ value, className }: { value: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 rounded-xl border bg-card py-1.5 pr-1.5 pl-4 font-mono text-[13px]', className)}>
      <span aria-hidden className="text-primary select-none">
        $
      </span>
      <code tabIndex={0} className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">{value}</code>
      <CopyButton value={value} label="Copy command" />
    </div>
  )
}

/** Shiki'nin derleme anında ürettiği HTML'i gösterir. */
export function CodeBlock({
  html,
  raw,
  title,
  className,
  maxHeight = '32rem',
}: {
  html: string
  raw: string
  title?: ReactNode
  className?: string
  maxHeight?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card', className)}>
      <div className="flex items-center justify-between border-b py-1.5 pr-1.5 pl-4">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <CopyButton value={raw} label="Copy code" />
      </div>
      <div
        className="overflow-auto py-4 [scrollbar-width:thin]"
        style={{ maxHeight }}
        tabIndex={0}
        role="region"
        aria-label={typeof title === 'string' ? `${title} source` : 'Source code'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

/** Erişilebilir sekmeler: ok tuşlarıyla gezilir. */
export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: ReactNode }[]
  value: string
  onChange: (id: string) => void
  className?: string
}) {
  const id = useId()
  return (
    <div
      role="tablist"
      className={cn('inline-flex rounded-full border bg-muted/50 p-1', className)}
      onKeyDown={(e) => {
        const i = tabs.findIndex((t) => t.id === value)
        const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
        if (next === null) return
        e.preventDefault()
        const tab = tabs[(next + tabs.length) % tabs.length]
        onChange(tab.id)
        document.getElementById(`${id}-${tab.id}`)?.focus()
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          id={`${id}-${t.id}`}
          type="button"
          role="tab"
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          onClick={() => onChange(t.id)}
          className={cn(
            'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
            t.id === value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl space-y-3', className)}>
      {eyebrow && <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {children && <p className="text-pretty text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  )
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden fill="currentColor" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
