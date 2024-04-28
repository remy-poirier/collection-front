export interface User {
  id: string
  email: string
  fullName?: string
  items: string[]
  isAdmin?: boolean
  avatarUrl?: string
  totalValue: Record<string, number>
}