export interface Area {
  id: number
  public_id: string
  name: string
  description: string | null
  image_path: string | null
  latitude: number | null
  longitude: number | null
  country_name: string | null
}

export async function getAreas(): Promise<Area[]> {
  const response = await fetch("/api/areas", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch areas")
  }

  return response.json()
}