import type { Config, Data, Field } from "@puckeditor/core";
import { ImageField } from "@/components/editor/ImageField";
import { display, sans } from "@/lib/fonts";
import {
  CalloutBlock,
  CollectionsBlock,
  FeaturedBlock,
  HeroBlock,
  LicenseBandBlock,
  MarqueeBlock,
  QuoteBlock,
  StepsBlock,
  TextSectionBlock,
  type CalloutProps,
  type CollectionsProps,
  type FeaturedProps,
  type HeroProps,
  type LicenseBandProps,
  type MarqueeProps,
  type QuoteProps,
  type StepsProps,
  type TextSectionProps
} from "@/lib/editor/blocks";

// contentEditable lets the client click the words on the page and type over them.
const inline = (label: string): Field => ({ type: "text", label, contentEditable: true });
const inlineLong = (label: string): Field => ({ type: "textarea", label, contentEditable: true });
const plain = (label: string): Field => ({ type: "text", label });
const image = (label: string): Field<string> => ({
  type: "custom",
  label,
  render: ({ value, onChange, readOnly }) => (
    <ImageField value={value} onChange={onChange} readOnly={readOnly} />
  )
});
const yesNo = (label: string): Field => ({
  type: "radio",
  label,
  options: [
    { label: "Show", value: "yes" },
    { label: "Hide", value: "no" }
  ]
});

type Components = {
  Hero: HeroProps;
  Marquee: MarqueeProps;
  Featured: FeaturedProps;
  Collections: CollectionsProps;
  Steps: StepsProps;
  LicenseBand: LicenseBandProps;
  Callout: CalloutProps;
  TextSection: TextSectionProps;
  Quote: QuoteProps;
};

export type EditorData = Data<Components>;

export const editorConfig: Config<Components> = {
  root: {
    // Carries the site fonts into the editor's preview frame; harmless on the live page.
    render: ({ children }) => (
      <div className={`${display.variable} ${sans.variable}`} style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </div>
    )
  },
  categories: {
    sections: {
      title: "Page sections",
      components: ["Hero", "Featured", "Collections", "Steps", "LicenseBand", "Callout"]
    },
    blocks: {
      title: "Add your own",
      components: ["TextSection", "Quote", "Marquee"]
    }
  },
  components: {
    Hero: {
      label: "Hero",
      fields: {
        eyebrow: inline("Small line above the headline"),
        headlineStart: inline("Headline"),
        headlineItalic: inline("Headline, italic words"),
        headlineEnd: inline("Headline, ending"),
        lede: inlineLong("Intro paragraph"),
        imageMain: image("Large photo"),
        imageTop: image("Top photo"),
        imageBottom: image("Bottom photo"),
        chipTitle: inline("Photo badge title"),
        chipBody: inline("Photo badge text"),
        showSearch: yesNo("Search box"),
        searchPlaceholder: plain("Search box hint"),
        popular: {
          type: "array",
          label: "Popular searches",
          arrayFields: { term: { type: "text", label: "Search term" } },
          defaultItemProps: { term: "new search" },
          getItemSummary: (item) => item.term
        },
        showStats: yesNo("Numbers row")
      },
      defaultProps: {
        eyebrow: "New section",
        headlineStart: "Your headline",
        headlineItalic: "goes",
        headlineEnd: "here.",
        lede: "A sentence or two about what visitors will find.",
        showSearch: "yes",
        searchPlaceholder: "Search",
        popular: [],
        imageMain: "/catalog/worship-stage-01.jpg",
        imageTop: "/catalog/voices-in-the-room.jpg",
        imageBottom: "/catalog/lobby-after-service.jpg",
        chipTitle: "Badge title",
        chipBody: "Badge text",
        showStats: "no"
      },
      render: (props) => <HeroBlock {...props} />
    },
    Marquee: {
      label: "Scrolling words",
      fields: {
        tags: {
          type: "array",
          label: "Words",
          arrayFields: { tag: { type: "text", label: "Word or phrase" } },
          defaultItemProps: { tag: "New phrase" },
          getItemSummary: (item) => item.tag
        }
      },
      defaultProps: { tags: [{ tag: "Sunday mornings" }, { tag: "Small groups" }, { tag: "Worship nights" }] },
      render: (props) => <MarqueeBlock {...props} />
    },
    Featured: {
      label: "Featured images",
      fields: {
        kicker: inline("Small label"),
        title: inline("Title"),
        count: { type: "number", label: "How many images", min: 1, max: 20 },
        linkLabel: plain("Link text")
      },
      defaultProps: { kicker: "Featured", title: "Fresh from the first edit.", count: 4, linkLabel: "View all images" },
      render: (props) => <FeaturedBlock {...props} />
    },
    Collections: {
      label: "Collections grid",
      fields: { kicker: inline("Small label"), title: inline("Title") },
      defaultProps: { kicker: "Collections", title: "Browse by the moment you need." },
      render: (props) => <CollectionsBlock {...props} />
    },
    Steps: {
      label: "Numbered steps",
      fields: {
        kicker: inline("Small label"),
        title: inline("Title"),
        steps: {
          type: "array",
          label: "Steps",
          arrayFields: { title: { type: "text", label: "Step title" }, body: { type: "textarea", label: "Step text" } },
          defaultItemProps: { title: "New step", body: "Describe this step." },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: { kicker: "How it works", title: "Three simple steps.", steps: [] },
      render: (props) => <StepsBlock {...props} />
    },
    LicenseBand: {
      label: "Licensing band",
      fields: {
        kicker: inline("Small label"),
        title: inline("Title"),
        lede: inlineLong("Paragraph"),
        buttonLabel: plain("Button text"),
        buttonHref: plain("Button link")
      },
      defaultProps: {
        kicker: "Licensing",
        title: "Two licenses. No fine-print surprises.",
        lede: "Buy once, use forever.",
        buttonLabel: "Compare licenses",
        buttonHref: "/licensing"
      },
      render: (props) => <LicenseBandBlock {...props} />
    },
    Callout: {
      label: "Photo + call to action",
      fields: {
        kicker: inline("Small label"),
        title: inline("Title"),
        body: inlineLong("Paragraph"),
        image: image("Photo"),
        primaryLabel: plain("Main button text"),
        primaryHref: plain("Main button link"),
        secondaryLabel: plain("Second button text (blank to hide)"),
        secondaryHref: plain("Second button link")
      },
      defaultProps: {
        kicker: "Get in touch",
        title: "A headline for this section.",
        body: "A short paragraph that makes the case.",
        image: "/catalog/team-huddle.jpg",
        primaryLabel: "Learn more",
        primaryHref: "/pricing",
        secondaryLabel: "",
        secondaryHref: "/"
      },
      render: (props) => <CalloutBlock {...props} />
    },
    TextSection: {
      label: "Text section",
      fields: {
        kicker: inline("Small label"),
        title: inline("Title"),
        body: inlineLong("Paragraph"),
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Centre", value: "center" }
          ]
        }
      },
      defaultProps: {
        kicker: "Announcement",
        title: "Something worth saying.",
        body: "Click any text on the page to change it.",
        align: "left"
      },
      render: (props) => <TextSectionBlock {...props} />
    },
    Quote: {
      label: "Quote",
      fields: { quote: inlineLong("Quote"), name: inline("Name"), role: inline("Role or church") },
      defaultProps: {
        quote: "We found our Easter graphics in ten minutes.",
        name: "Pastor Name",
        role: "Your Church"
      },
      render: (props) => <QuoteBlock {...props} />
    }
  }
};
