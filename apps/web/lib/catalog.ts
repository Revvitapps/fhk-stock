export type CollectionSlug = "worship" | "services" | "community" | "nextgen" | "workspace";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  blurb: string;
  cover: string;
};

export type CatalogAsset = {
  id: string;
  slug: string;
  title: string;
  collection: CollectionSlug;
  price: number;
  image: string;
  width: number;
  height: number;
  description: string;
  tags: string[];
};

export type LicenseTier = {
  id: "standard" | "extended";
  name: string;
  multiplier: number;
  summary: string;
};

export const licenseTiers: LicenseTier[] = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1,
    summary: "Web, social, slides, and print runs up to 5,000."
  },
  {
    id: "extended",
    name: "Extended",
    multiplier: 4,
    summary: "Unlimited print, merchandise, and paid advertising."
  }
];

export const collections: Collection[] = [
  {
    slug: "worship",
    name: "Worship",
    blurb: "Sunday sets, stage light, hymns, and rooms full of people singing.",
    cover: "/catalog/worship-stage-01.jpg"
  },
  {
    slug: "community",
    name: "Community",
    blurb: "The front door, the lobby, the potluck line, and the conversations in between.",
    cover: "/catalog/lobby-after-service.jpg"
  },
  {
    slug: "services",
    name: "Teaching & sacraments",
    blurb: "The message, baptism Sunday, communion, and church on the lawn.",
    cover: "/catalog/baptism-sunday.jpg"
  },
  {
    slug: "nextgen",
    name: "Kids & youth",
    blurb: "Craft tables on Sunday morning and pizza boxes on youth night.",
    cover: "/catalog/youth-night.jpg"
  },
  {
    slug: "workspace",
    name: "Study & workspace",
    blurb: "Sermon prep, café study, and quiet weekday work.",
    cover: "/catalog/editorial-nightfall.png"
  }
];

export const catalogAssets: CatalogAsset[] = [
  {
    id: "TM-0001",
    slug: "sunday-set-six-rows-back",
    title: "Sunday Set, Six Rows Back",
    collection: "worship",
    price: 29,
    image: "/catalog/worship-stage-01.jpg",
    width: 1856,
    height: 2109,
    description:
      "A five-piece worship band mid-song under amber and teal stage wash, seen from inside a standing congregation. A raised hand, a dad with a toddler, a coffee in hand.",
    tags: ["worship team", "stage", "band", "congregation", "sunday"]
  },
  {
    id: "TM-0002",
    slug: "lobby-after-service",
    title: "Lobby After Service",
    collection: "community",
    price: 27,
    image: "/catalog/lobby-after-service.jpg",
    width: 2200,
    height: 1476,
    description:
      "The ten minutes after the last song: coffee cups, winter coats, kids weaving through the crowd, and three generations laughing by the coffee station.",
    tags: ["lobby", "coffee", "fellowship", "families", "conversation"]
  },
  {
    id: "TM-0003",
    slug: "voices-in-the-room",
    title: "Voices in the Room",
    collection: "worship",
    price: 29,
    image: "/catalog/voices-in-the-room.jpg",
    width: 1794,
    height: 1192,
    description:
      "Down the row during worship: a woman with a lifted hand and closed eyes, a teenager singing along, a man with his hand over his heart, all rim-lit from the stage.",
    tags: ["congregation", "singing", "raised hand", "generations", "worship"]
  },
  {
    id: "TM-0004",
    slug: "baptism-sunday",
    title: "Baptism Sunday",
    collection: "services",
    price: 29,
    image: "/catalog/baptism-sunday.jpg",
    width: 1772,
    height: 2200,
    description:
      "The second after: she comes up laughing and wiping her eyes while the whole room is on its feet, clapping and filming.",
    tags: ["baptism", "celebration", "pastor", "water", "congregation"]
  },
  {
    id: "TM-0005",
    slug: "welcome-at-the-door",
    title: "Welcome at the Door",
    collection: "community",
    price: 26,
    image: "/catalog/welcome-at-the-door.jpg",
    width: 2200,
    height: 1476,
    description:
      "Sunday morning at the front doors. A greeter shakes hands with a dad while his family comes in with the stroller and the diaper bag.",
    tags: ["greeters", "welcome", "family", "first impressions", "doors"]
  },
  {
    id: "TM-0006",
    slug: "sunday-message",
    title: "The Sunday Message",
    collection: "services",
    price: 27,
    image: "/catalog/sunday-message.jpg",
    width: 2200,
    height: 1476,
    description:
      "A pastor teaching from a small table with an open Bible, seen from the back rows over note-takers and open pages. Instruments rest behind her.",
    tags: ["sermon", "pastor", "teaching", "bible", "congregation"]
  },
  {
    id: "TM-0007",
    slug: "potluck-line",
    title: "The Potluck Line",
    collection: "community",
    price: 25,
    image: "/catalog/potluck-line.jpg",
    width: 2200,
    height: 1476,
    description:
      "Folding tables, slow cookers, foil pans, and a tray of cookies in the fellowship hall, with families already eating at the round tables behind.",
    tags: ["potluck", "fellowship hall", "food", "generations", "lunch"]
  },
  {
    id: "TM-0008",
    slug: "behind-the-board",
    title: "Behind the Board",
    collection: "worship",
    price: 27,
    image: "/catalog/behind-the-board.jpg",
    width: 2200,
    height: 1476,
    description:
      "A volunteer audio engineer riding the faders from the sound booth, with the band and the room glowing out of focus beyond the glass.",
    tags: ["sound booth", "volunteer", "audio", "tech team", "production"]
  },
  {
    id: "TM-0009",
    slug: "kids-ministry-craft-table",
    title: "Kids Ministry, Craft Table",
    collection: "nextgen",
    price: 26,
    image: "/catalog/kids-ministry-craft-table.jpg",
    width: 2200,
    height: 1476,
    description:
      "Two volunteers on kid-sized chairs helping with glue sticks and construction paper. One child mid-laugh, one deep in concentration.",
    tags: ["kids ministry", "children", "volunteers", "classroom", "crafts"]
  },
  {
    id: "TM-0010",
    slug: "small-group-tuesday-night",
    title: "Small Group, Tuesday Night",
    collection: "community",
    price: 26,
    image: "/catalog/studio-story-03.png",
    width: 1024,
    height: 1024,
    description:
      "Five friends around a café table with open notebooks and coffee. Brick walls, window light, unposed conversation.",
    tags: ["small group", "bible study", "coffee shop", "friends", "discussion"]
  },
  {
    id: "TM-0011",
    slug: "country-church-hymn",
    title: "Country Church Hymn",
    collection: "worship",
    price: 25,
    image: "/catalog/country-church-hymn.jpg",
    width: 2200,
    height: 1476,
    description:
      "Thirty-some people standing in worn wooden pews with hymnals open, an upright piano up front, and morning light through old glass.",
    tags: ["hymn", "small church", "pews", "piano", "traditional"]
  },
  {
    id: "TM-0012",
    slug: "church-on-the-lawn",
    title: "Church on the Lawn",
    collection: "services",
    price: 27,
    image: "/catalog/church-on-the-lawn.jpg",
    width: 2200,
    height: 1476,
    description:
      "An outdoor service the way it really looks: folding chairs, picnic blankets, a pop-up tent, two speakers on sticks, and coffee in most hands.",
    tags: ["outdoor service", "lawn", "spring", "easter", "folding chairs"]
  },
  {
    id: "TM-0013",
    slug: "youth-night",
    title: "Youth Night",
    collection: "nextgen",
    price: 26,
    image: "/catalog/youth-night.jpg",
    width: 2048,
    height: 2048,
    description:
      "Thrift-store couches, string lights on cinder block, pizza boxes on the table, and a youth leader talking with his hands.",
    tags: ["youth group", "teenagers", "students", "youth room", "midweek"]
  },
  {
    id: "TM-0014",
    slug: "passing-the-tray",
    title: "Passing the Tray",
    collection: "services",
    price: 25,
    image: "/catalog/passing-the-tray.jpg",
    width: 2200,
    height: 1476,
    description:
      "Communion up close: weathered hands pass the tray of cups to the next person in the row, with a basket of bread on the chair beside them.",
    tags: ["communion", "hands", "sacrament", "bread", "cup"]
  },
  {
    id: "TM-0015",
    slug: "team-huddle",
    title: "Team Huddle",
    collection: "community",
    price: 25,
    image: "/catalog/team-huddle.jpg",
    width: 2048,
    height: 2048,
    description:
      "Volunteers in matching gray tees, arms around shoulders, praying in the hallway before the doors open. Coffee still in hand.",
    tags: ["volunteers", "prayer", "team", "serving", "before service"]
  },
  {
    id: "TM-0016",
    slug: "sanctuary-at-golden-hour",
    title: "Sanctuary at Golden Hour",
    collection: "worship",
    price: 29,
    image: "/catalog/editorial-copper.png",
    width: 1536,
    height: 1024,
    description:
      "An empty sanctuary with warm light falling down the center aisle. Generous negative space for titles and sermon series art.",
    tags: ["sanctuary", "pews", "stained glass", "empty", "warm light"]
  },
  {
    id: "TM-0017",
    slug: "sunday-set-from-the-aisle",
    title: "Sunday Set, From the Aisle",
    collection: "worship",
    price: 27,
    image: "/catalog/worship-stage-02.jpg",
    width: 1856,
    height: 2074,
    description:
      "A second angle on the same set: closer to the stage, over the shoulders of a family with a baby and a coffee in hand.",
    tags: ["worship team", "stage", "band", "family", "sunday"]
  },
  {
    id: "TM-0018",
    slug: "cafe-light-remote-work",
    title: "Café Light, Remote Work",
    collection: "workspace",
    price: 24,
    image: "/catalog/editorial-nightfall.png",
    width: 1536,
    height: 1024,
    description:
      "A young woman in headphones takes notes at her laptop, lit by warm café bulbs. Natural smile, shallow depth of field.",
    tags: ["laptop", "headphones", "coffee shop", "student", "remote work"]
  },
  {
    id: "TM-0019",
    slug: "morning-study-notes",
    title: "Morning Study Notes",
    collection: "workspace",
    price: 24,
    image: "/catalog/editorial-amber.png",
    width: 1536,
    height: 1024,
    description:
      "Hands, a notebook, a laptop, and a fresh coffee on a wooden café table. A quiet frame for devotionals and blog headers.",
    tags: ["notebook", "coffee", "hands", "study", "devotional"]
  },
  {
    id: "TM-0020",
    slug: "cafe-study-sepia-edit",
    title: "Café Study, Sepia Edit",
    collection: "workspace",
    price: 26,
    image: "/catalog/editorial-softlight.png",
    width: 1536,
    height: 1024,
    description:
      "A vintage-toned edit of the café study frame, finished with grain and a burned border for print and throwback series.",
    tags: ["sepia", "vintage", "film grain", "laptop", "portrait"]
  }
];

export function getCatalogAsset(slug: string) {
  return catalogAssets.find((asset) => asset.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getRelatedAssets(asset: CatalogAsset, count = 3) {
  const sameCollection = catalogAssets.filter(
    (candidate) => candidate.collection === asset.collection && candidate.id !== asset.id
  );
  const others = catalogAssets.filter(
    (candidate) => candidate.collection !== asset.collection && candidate.id !== asset.id
  );

  return [...sameCollection, ...others].slice(0, count);
}

export function licensePrice(asset: CatalogAsset, tier: LicenseTier) {
  return asset.price * tier.multiplier;
}
