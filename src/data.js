const details = [
  ['interstate', '01', 'Interstate', '2024', 'Across I-70', 'Nightfall along the American highway system — service plazas, motel signage, and the particular loneliness of driving after dark.'],
  ['low-country', '02', 'Low Country', '2023', 'Beaufort, SC', 'Marsh, wetland, and floodplain along the coastal south — land that is neither quite water nor quite ground.'],
  ['vacancy', '03', 'Vacancy', '2022', 'Tucson, AZ', 'Interiors left behind — motel rooms, storefronts, and houses mid-way through being reclaimed by weather and time.'],
  ['kin', '04', 'Kin', '2024', 'Kentucky', 'Portraits of family and neighbors made over eight years in one Midwestern county — a slow document of who stayed.'],
  ['static', '05', 'Static', '2021', 'West Texas', 'Still life studies made in available light — the small evidence left on a table, a sill, a dashboard.'],
  ['coastline', '06', 'Coastline', '2023', 'Outer Banks', 'The Atlantic edge in winter — empty boardwalks, working harbors, and the flat grey light of the off-season.'],
]

export const collections = details.map(([id, number, title, year, place, blurb]) => ({
  id, number, title, year, place, blurb,
  image: `https://picsum.photos/seed/macmotz-${id}-cover/1400/1750`,
  plates: Array.from({ length: 8 }, (_, index) => ({
    id: `${id}-${String(index + 1).padStart(2, '0')}`,
    src: `https://picsum.photos/seed/macmotz-${id}-${index + 1}/1100/1375`,
    alt: `${title}, study frame ${String(index + 1).padStart(2, '0')}`,
  })),
}))

export const allPlates = collections.flatMap((collection) => collection.plates.map((plate, index) => ({ ...plate, collection, frame: `F${String(index + 1).padStart(3, '0')}` })))
