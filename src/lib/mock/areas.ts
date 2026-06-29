import { Area } from "@/types/area"

export const areas: Area[] = [
  {
    id: "1",
    slug: "cajon-del-maipo",
    name: "Cajón del Maipo",
    description: "Uno de los principales sectores de escalada de Chile.",
    country: "Chile",
    coordinates: "-33.6,-70.3",
    createdAt: new Date().toISOString(),
  },

  {
    id: "2",
    slug: "mampato",
    name: "Mampato",
    description: "Clásico sector de boulder en Santiago.",
    country: "Chile",
    createdAt: new Date().toISOString(),
  },
]