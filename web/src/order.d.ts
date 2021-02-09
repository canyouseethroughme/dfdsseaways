export interface AccordionSections {
  noPersons: boolean
  date: boolean
  time: boolean
  menu: boolean
  pay: boolean
  confirmation: boolean
}

export interface MenuSectionType {
  header: string
  dbKey: string
}

export interface OrderItem {
  id: number
  amount?: number
  price: number
  name: string
}
