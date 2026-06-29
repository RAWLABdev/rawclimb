export type AscentType =
  | "flash"
  | "onsight"
  | "redpoint"
  | "project"

export interface Ascent {
  id: string

  routeId: string

  userId: string

  type: AscentType

  date: string

  notes?: string
}