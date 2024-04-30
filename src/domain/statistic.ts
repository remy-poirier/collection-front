import { Common } from "@/operations/common"
import {ItemWithCount} from "./collection"

export interface Statistics {
  nbItems: number
  totalValue: {
    amount: number
    date: string
  }
  mostValuableItems: ItemWithCount[]
}

export const defaultStatistics: Statistics = {
  nbItems: 0,
  totalValue: {
    amount: 0,
    date: Common.formatDate(new Date().toISOString())
  },
  mostValuableItems: []
}