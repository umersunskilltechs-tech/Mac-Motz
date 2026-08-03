/*
  data.js — the single source of truth for collections and plates.
  Pages render from this file rather than hand-authored markup (CLAUDE.md rule 5).
  The current sources are online stand-ins. Replace them with local files in
  assets/plates/ when Mac's photography is available.
*/

// Preferred crop ratio for exported photography, used only as guidance in AGENTS.md.
export const PLATE_ASPECT = "4 / 5";

const TONES = ["rust", "moss", "slate", "clay", "dust", "ink"];

export const COLLECTIONS = [
  {
    id: "interstate",
    number: "01",
    title: "Interstate",
    blurb:
      "Nightfall along the American highway system — service plazas, motel signage, and the particular loneliness of driving after dark.",
    plates: [
      { id: "int-01", src: "https://picsum.photos/seed/macmotz-int-01/900/1125", alt: "Gas station canopy lit against a dark sky, seen from a passing car.", tone: "rust" },
      { id: "int-02", src: "https://picsum.photos/seed/macmotz-int-02/900/1125", alt: "Empty motel parking lot with a single vacancy sign glowing red.", tone: "rust" },
      { id: "int-03", src: "https://picsum.photos/seed/macmotz-int-03/900/1125", alt: "Overpass silhouette at dusk with taillights streaking below.", tone: "slate" },
      { id: "int-04", src: "https://picsum.photos/seed/macmotz-int-04/900/1125", alt: "Diner window reflecting neon from across the road.", tone: "rust" },
      { id: "int-05", src: "https://picsum.photos/seed/macmotz-int-05/900/1125", alt: "Long exposure of headlights on an empty interstate.", tone: "ink" },
      { id: "int-06", src: "https://picsum.photos/seed/macmotz-int-06/900/1125", alt: "Weigh station at 3am, fog rolling across the scales.", tone: "slate" },
    ],
  },
  {
    id: "low-country",
    number: "02",
    title: "Low Country",
    blurb:
      "Marsh, wetland, and floodplain along the coastal south — land that is neither quite water nor quite ground.",
    plates: [
      { id: "lc-01", src: "https://picsum.photos/seed/macmotz-lc-01/900/1125", alt: "Cypress trees standing in still black water at sunrise.", tone: "moss" },
      { id: "lc-02", src: "https://picsum.photos/seed/macmotz-lc-02/900/1125", alt: "Egret wading through tall marsh grass.", tone: "moss" },
      { id: "lc-03", src: "https://picsum.photos/seed/macmotz-lc-03/900/1125", alt: "Aerial view of a tidal creek cutting through the marsh.", tone: "slate" },
      { id: "lc-04", src: "https://picsum.photos/seed/macmotz-lc-04/900/1125", alt: "Sun breaking through fog over a flooded rice field.", tone: "dust" },
      { id: "lc-05", src: "https://picsum.photos/seed/macmotz-lc-05/900/1125", alt: "Weathered dock post half-submerged at low tide.", tone: "moss" },
    ],
  },
  {
    id: "vacancy",
    number: "03",
    title: "Vacancy",
    blurb:
      "Interiors left behind — motel rooms, storefronts, and houses mid-way through being reclaimed by weather and time.",
    plates: [
      { id: "vac-01", src: "https://picsum.photos/seed/macmotz-vac-01/900/1125", alt: "Faded floral wallpaper peeling in an abandoned bedroom.", tone: "clay" },
      { id: "vac-02", src: "https://picsum.photos/seed/macmotz-vac-02/900/1125", alt: "Light falling through broken blinds onto an empty motel bed frame.", tone: "dust" },
      { id: "vac-03", src: "https://picsum.photos/seed/macmotz-vac-03/900/1125", alt: "Storefront with a hand-painted CLOSED sign, dust on the glass.", tone: "clay" },
      { id: "vac-04", src: "https://picsum.photos/seed/macmotz-vac-04/900/1125", alt: "Kitchen cabinet doors left open in a vacated farmhouse.", tone: "dust" },
      { id: "vac-05", src: "https://picsum.photos/seed/macmotz-vac-05/900/1125", alt: "Stairwell with peeling paint and a single bare bulb.", tone: "ink" },
      { id: "vac-06", src: "https://picsum.photos/seed/macmotz-vac-06/900/1125", alt: "Reception desk of a shuttered roadside motel, bell still on the counter.", tone: "clay" },
      { id: "vac-07", src: "https://picsum.photos/seed/macmotz-vac-07/900/1125", alt: "Overgrown drive-in movie screen seen through a chain-link fence.", tone: "dust" },
    ],
  },
  {
    id: "kin",
    number: "04",
    title: "Kin",
    blurb:
      "Portraits of family and neighbors made over eight years in one Midwestern county — a slow document of who stayed.",
    plates: [
      { id: "kin-01", src: "https://picsum.photos/seed/macmotz-kin-01/900/1125", alt: "Portrait of an elderly farmer resting against a fence post.", tone: "rust" },
      { id: "kin-02", src: "https://picsum.photos/seed/macmotz-kin-02/900/1125", alt: "Two sisters sitting on a porch swing at dusk.", tone: "dust" },
      { id: "kin-03", src: "https://picsum.photos/seed/macmotz-kin-03/900/1125", alt: "Young boy in work boots standing in a soybean field.", tone: "moss" },
      { id: "kin-04", src: "https://picsum.photos/seed/macmotz-kin-04/900/1125", alt: "Grandmother's hands shelling peas at a kitchen table.", tone: "clay" },
      { id: "kin-05", src: "https://picsum.photos/seed/macmotz-kin-05/900/1125", alt: "Family gathered around a truck tailgate after a day's harvest.", tone: "rust" },
      { id: "kin-06", src: "https://picsum.photos/seed/macmotz-kin-06/900/1125", alt: "Portrait of a volunteer firefighter in front of the station.", tone: "slate" },
    ],
  },
  {
    id: "static",
    number: "05",
    title: "Static",
    blurb:
      "Still life studies made in available light — the small evidence left on a table, a sill, a dashboard.",
    plates: [
      { id: "sta-01", src: "https://picsum.photos/seed/macmotz-sta-01/900/1125", alt: "Chipped coffee mug and folded newspaper on a formica table.", tone: "dust" },
      { id: "sta-02", src: "https://picsum.photos/seed/macmotz-sta-02/900/1125", alt: "Rosary beads hanging from a rearview mirror.", tone: "ink" },
      { id: "sta-03", src: "https://picsum.photos/seed/macmotz-sta-03/900/1125", alt: "Row of canning jars on a windowsill catching afternoon light.", tone: "clay" },
      { id: "sta-04", src: "https://picsum.photos/seed/macmotz-sta-04/900/1125", alt: "Work gloves and a thermos on a truck bed.", tone: "rust" },
      { id: "sta-05", src: "https://picsum.photos/seed/macmotz-sta-05/900/1125", alt: "Old photographs fanned out on a quilt.", tone: "dust" },
    ],
  },
  {
    id: "coastline",
    number: "06",
    title: "Coastline",
    blurb:
      "The Atlantic edge in winter — empty boardwalks, working harbors, and the flat grey light of the off-season.",
    plates: [
      { id: "coa-01", src: "https://picsum.photos/seed/macmotz-coa-01/900/1125", alt: "Empty boardwalk under a grey winter sky.", tone: "slate" },
      { id: "coa-02", src: "https://picsum.photos/seed/macmotz-coa-02/900/1125", alt: "Fishing boats moored in a working harbor at low tide.", tone: "slate" },
      { id: "coa-03", src: "https://picsum.photos/seed/macmotz-coa-03/900/1125", alt: "Lifeguard stand boarded up for the season.", tone: "ink" },
      { id: "coa-04", src: "https://picsum.photos/seed/macmotz-coa-04/900/1125", alt: "Waves breaking against a jetty in fog.", tone: "moss" },
      { id: "coa-05", src: "https://picsum.photos/seed/macmotz-coa-05/900/1125", alt: "Rope coiled on a dock post, harbor blurred behind it.", tone: "slate" },
      { id: "coa-06", src: "https://picsum.photos/seed/macmotz-coa-06/900/1125", alt: "Beach house with storm shutters closed, dune grass in foreground.", tone: "dust" },
    ],
  },
];

// Temporary online photography until Mac's own files are supplied.
// Keeping this normalization here means every page receives an image URL,
// even if a collection entry is left as `src: null`.
COLLECTIONS.forEach((collection) => {
  // Add extra online study frames so each homepage chapter has a fuller,
  // slower carousel while the real archive is being prepared.
  const targetFrameCount = 10;
  const originalCount = collection.plates.length;
  for (let index = originalCount; index < targetFrameCount; index += 1) {
    collection.plates.push({
      id: `${collection.id}-extra-${String(index + 1).padStart(2, "0")}`,
      src: null,
      alt: `${collection.title} study frame ${index + 1}.`,
      tone: collection.plates[index % originalCount].tone,
    });
  }
  collection.plates.forEach((plate) => {
    if (!plate.src) {
      plate.src = `https://picsum.photos/seed/macmotz-${plate.id}/900/1125`;
    }
  });
});

// Flat, ordered list of every plate with collection context — used by the frame counter
// and the Portfolio contact-sheet grid.
export const ALL_PLATES = COLLECTIONS.flatMap((collection) =>
  collection.plates.map((plate, index) => ({
    ...plate,
    collectionId: collection.id,
    collectionTitle: collection.title,
    collectionNumber: collection.number,
    indexInCollection: index + 1,
  }))
);

export function frameNumber(globalIndex) {
  return `F${String(globalIndex + 1).padStart(3, "0")}`;
}

export const TOTAL_PLATES = ALL_PLATES.length;
export const TONE_LIST = TONES;
