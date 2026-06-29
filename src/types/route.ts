export type RouteType =
  | "boulder"
  | "sport"
  | "trad"
  | "indoor"

export interface ClimbingRoute {
  id: string
  zoneId: string

  name: string

  grade: string

  type: RouteType

  description?: string

  height?: number
}