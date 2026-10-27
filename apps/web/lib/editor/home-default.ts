import type { Data } from "@puckeditor/core";

// The hand-built homepage expressed as editor data. Shown until a client publishes a change.
export const homeDefault: Data = {
  root: { props: { title: "Home" } },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero",
        eyebrow: "For His Kingdom · launch collection in preview",
        headlineStart: "Stock photography that looks like",
        headlineItalic: "your",
        headlineEnd: "Sunday.",
        lede:
          "Worship sets, baptisms, potlucks, kids ministry, and the quiet weekday work in between. A carefully edited library for churches and ministries, with licensing you can explain in one sentence.",
        showSearch: "yes",
        searchPlaceholder: "Try “small group”",
        popular: ["worship", "baptism", "small group", "kids", "potluck"].map((term) => ({ term })),
        imageMain: "/catalog/worship-stage-01.jpg",
        imageTop: "/catalog/voices-in-the-room.jpg",
        imageBottom: "/catalog/lobby-after-service.jpg",
        chipTitle: "Standard license",
        chipBody: "Web, slides, and social",
        showStats: "yes"
      }
    },
    {
      type: "Marquee",
      props: {
        id: "marquee",
        tags: [
          "Worship nights",
          "Baptism Sundays",
          "Small groups",
          "Sermon prep",
          "Potluck lunches",
          "Sanctuaries",
          "Volunteers",
          "Coffee & conversation",
          "Stage light",
          "Sunday mornings"
        ].map((tag) => ({ tag }))
      }
    },
    {
      type: "Featured",
      props: {
        id: "featured",
        kicker: "The launch collection",
        title: "Fresh from the first edit.",
        count: 8,
        linkLabel: "View all images"
      }
    },
    {
      type: "Collections",
      props: { id: "collections", kicker: "Collections", title: "Browse by the moment you need." }
    },
    {
      type: "Steps",
      props: {
        id: "steps",
        kicker: "How it works",
        title: "From search to slide in three steps.",
        steps: [
          {
            title: "Find the frame",
            body: "Search by moment, mood, or season. Every image is hand-picked, so there is no page twelve to dig through."
          },
          {
            title: "Pick a license",
            body: "Two plain-English options. Standard covers your site, slides, and socials. Extended covers print runs and merch."
          },
          {
            title: "Download and go",
            body: "Full-resolution files and a license receipt land in your account, ready for the next time someone asks."
          }
        ]
      }
    },
    {
      type: "LicenseBand",
      props: {
        id: "licensing",
        kicker: "Licensing",
        title: "Two licenses. No fine-print surprises.",
        lede: "Buy once, use forever. Every download comes with a receipt your admin team can file and forget.",
        buttonLabel: "Compare licenses",
        buttonHref: "/licensing"
      }
    },
    {
      type: "Callout",
      props: {
        id: "contributors",
        kicker: "For photographers",
        title: "You already shoot every Sunday. Get paid for it.",
        body: "Upload your best frames, keep your copyright, and earn on every license. We handle review, delivery, and payouts.",
        image: "/catalog/behind-the-board.jpg",
        primaryLabel: "Become a contributor",
        primaryHref: "/contributors",
        secondaryLabel: "See pricing",
        secondaryHref: "/pricing"
      }
    }
  ]
};
