// Placeholder photography via picsum.photos seeded URLs.
// Replace `cover` / frame `src` with real Mac Motz photography before launch —
// the shape of each record (id, number, title, year, location, description, frames[]) can stay the same.

export const collections = [
  {
    id: 'interstate',
    number: '01',
    title: 'Interstate',
    year: '2024',
    location: 'Across I-70',
    description:
      'Nightfall along the American highway system — service plazas, motel signage, and the particular loneliness of driving after dark.',
    cover: 'https://picsum.photos/seed/macmotz-interstate-cover/1600/2000',
    frames: [
      { alt: 'Empty gas station canopy lit fluorescent white against a black sky' },
      { alt: 'Motel vacancy sign glowing red beside an unlit parking lot' },
      { alt: 'Long exposure of headlights streaking past a highway overpass' },
      { alt: 'Vending machines humming in an otherwise dark rest stop breezeway' },
      { alt: 'Semi trucks idling in a row at a night truck stop' },
      { alt: 'A lone attendant booth lit inside an empty toll plaza' },
      { alt: 'Reflection of a neon diner sign in a rain-slicked parking lot' },
      { alt: 'Highway mile marker illuminated by a passing car’s headlights' },
    ],
  },
  {
    id: 'low-country',
    number: '02',
    title: 'Low Country',
    year: '2023',
    location: 'Beaufort, SC',
    description:
      'Marsh, wetland, and floodplain along the coastal south — land that is neither quite water nor quite ground.',
    cover: 'https://picsum.photos/seed/macmotz-lowcountry-cover/1600/2000',
    frames: [
      { alt: 'Spartina grass marsh at low tide under a pale morning sky' },
      { alt: 'A wooden dock disappearing into fog over still marsh water' },
      { alt: 'Egret standing motionless in a shallow tidal creek' },
      { alt: 'Live oak draped in Spanish moss above a flooded field' },
      { alt: 'Aerial-flat view of tidal channels cutting through green marsh' },
      { alt: 'Crab trap buoys floating in brackish brown water' },
      { alt: 'Sunset silhouette of marsh grass against a wide orange horizon' },
      { alt: 'Weathered pilings from a collapsed pier standing in shallow water' },
    ],
  },
  {
    id: 'vacancy',
    number: '03',
    title: 'Vacancy',
    year: '2022',
    location: 'Tucson, AZ',
    description:
      'Interiors left behind — motel rooms, storefronts, and houses mid-way through being reclaimed by weather and time.',
    cover: 'https://picsum.photos/seed/macmotz-vacancy-cover/1600/2000',
    frames: [
      { alt: 'Sun-bleached motel room with a stripped mattress and peeling wallpaper' },
      { alt: 'Dust covering the counter of an abandoned roadside diner' },
      { alt: 'Cracked swimming pool drained down to bare cement' },
      { alt: 'A rotary phone still hanging on the wall of an empty office' },
      { alt: 'Light falling through a broken window onto a warped wood floor' },
      { alt: 'Rows of empty shelves in a shuttered general store' },
      { alt: 'Curtains hanging still in a house with no furniture left' },
      { alt: 'Faded for-sale sign leaning against a boarded storefront' },
    ],
  },
  {
    id: 'kin',
    number: '04',
    title: 'Kin',
    year: '2024',
    location: 'Kentucky',
    description:
      'Portraits of family and neighbors made over eight years in one Midwestern county — a slow document of who stayed.',
    cover: 'https://picsum.photos/seed/macmotz-kin-cover/1600/2000',
    frames: [
      { alt: 'Grandmother seated on a porch swing at dusk' },
      { alt: 'Two brothers leaning against a pickup truck in a gravel driveway' },
      { alt: 'A child asleep on a couch with the television glowing blue' },
      { alt: 'Father and daughter sorting tools in a cluttered garage' },
      { alt: 'Family gathered around a kitchen table lit by a single overhead bulb' },
      { alt: 'An elderly neighbor standing in a doorway holding a screen door open' },
      { alt: 'Teenager sitting on the hood of a car watching the sun go down' },
      { alt: 'Hands of three generations resting together on a wooden table' },
    ],
  },
  {
    id: 'static',
    number: '05',
    title: 'Static',
    year: '2021',
    location: 'West Texas',
    description:
      'Still life studies made in available light — the small evidence left on a table, a sill, a dashboard.',
    cover: 'https://picsum.photos/seed/macmotz-static-cover/1600/2000',
    frames: [
      { alt: 'A pair of reading glasses resting on an open paperback' },
      { alt: 'Dashboard clutter lit by afternoon sun through a windshield' },
      { alt: 'A glass of water catching light on a windowsill' },
      { alt: 'Worn work gloves left on a porch railing' },
      { alt: 'A half-eaten meal on a diner table beside a coffee cup' },
      { alt: 'House keys and a rosary tangled together on a nightstand' },
      { alt: 'Sun-faded photographs pinned to a corkboard' },
      { alt: 'A folded road map beside a thermos on a truck seat' },
    ],
  },
  {
    id: 'coastline',
    number: '06',
    title: 'Coastline',
    year: '2023',
    location: 'Outer Banks',
    description:
      'The Atlantic edge in winter — empty boardwalks, working harbors, and the flat grey light of the off-season.',
    cover: 'https://picsum.photos/seed/macmotz-coastline-cover/1600/2000',
    frames: [
      { alt: 'Empty wooden boardwalk leading toward a grey winter ocean' },
      { alt: 'Fishing boats moored at a quiet harbor under overcast sky' },
      { alt: 'Waves breaking against a jetty of dark stone' },
      { alt: 'A single beach chair left folded on wind-swept sand' },
      { alt: 'Gulls standing on wet sand as fog rolls in over the water' },
      { alt: 'Shuttered ice cream stand with paint peeling near the shoreline' },
      { alt: 'Fishing nets piled on a dock at first light' },
      { alt: 'Lighthouse standing against a flat grey winter horizon' },
    ],
  },
]

export const allFrames = collections.flatMap((collection) =>
  collection.frames.map((frame, index) => ({
    ...frame,
    id: `${collection.id}-${String(index + 1).padStart(2, '0')}`,
    src: `https://picsum.photos/seed/macmotz-${collection.id}-${index + 1}/1200/1500`,
    frame: `F${String(index + 1).padStart(3, '0')}`,
    collection,
  })),
)

export const framesByCollection = Object.fromEntries(
  collections.map((collection) => [
    collection.id,
    allFrames.filter((frame) => frame.collection.id === collection.id),
  ]),
)

