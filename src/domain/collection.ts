import { User } from "./user"

export interface Item {
  id: string
  name: string
  prices: Record<string, number>
  image: string
  highestPrice: number
  url: string
  createdAt: string
  updatedAt: string
  lastPrice: number
  users?: Pick<User, "id" | "email">[]
  count?: number
  userId: string
  status?: string
}

export type ItemWithCount = Item & { count: number }

export interface ItemCreation {
  name: string
  url: string
  price: number
  image: string
}