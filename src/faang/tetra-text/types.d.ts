export type TetraTextProps = {
  align?: 'center' | 'end' | 'start' | 'auto'
  children?: ReactNode
  color?:
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryDeemphasizedButton'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnMedia'
  | 'tertiary'
  | 'white'
  dir?: 'ltr' | 'rtl' | 'auto'
  id?: string
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  numberOfLines?: number
  preserveNewLines?: boolean
  suppressHydrationWarning?: boolean
  truncationTooltip?: any
  type: TypeKeys
}
