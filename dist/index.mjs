var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/hero.ts
import groq2 from "groq";
import { defineType } from "sanity";

// src/image.ts
import groq from "groq";
import { defineField } from "sanity";
var crops = [
  { title: "Original", value: 0 },
  { title: "1 : 1 (square)", value: 1 },
  { title: "5 : 7", value: 0.7142857143 },
  { title: "4 : 6", value: 0.6666666667 },
  { title: "16 : 9", value: 1.7777777778 }
];
var image = defineField({
  type: "image",
  name: "image",
  title: "Image",
  options: {
    hotspot: true
  },
  fields: [
    defineField({
      title: "Display Size (aspect ratio)",
      name: "customRatio",
      type: "number",
      options: {
        list: crops
      },
      /* validation: Rule =>
        Rule.custom((field, context: any) =>
          'asset' in context.parent && field === undefined
            ? 'Required!'
            : true
        ), */
      hidden: true
    }),
    {
      title: "Alternative text",
      name: "alt",
      type: "string",
      description: "Important for SEO and accessiblity."
    }
  ],
  preview: {
    select: {
      asset: "asset",
      alt: "asset.alt",
      customAlt: "alt",
      customRatio: "customRatio"
    },
    prepare: ({ alt, customAlt, customRatio, asset }) => {
      var _a, _b;
      return {
        title: (_a = customAlt != null ? customAlt : alt) != null ? _a : "(alt text missing)",
        subtitle: (_b = crops.find((crop) => crop.value === customRatio)) == null ? void 0 : _b.title,
        media: asset
      };
    }
  }
});
var imageQuery = groq`
  asset,
  crop,
  hotspot,
	"src": asset->url,
  "alt": coalesce(alt, asset->altText),
	customRatio,
	...asset->{
		"id": _id,
		"type": mimeType,
		"aspectRatio": metadata.dimensions.aspectRatio,
		"lqip": metadata.lqip
	}
`;

// src/hero.ts
var hero = defineType({
  type: "object",
  name: "hero",
  title: "Hero",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "text",
      title: "Text",
      type: "string"
    },
    {
      title: "Background Type",
      name: "bgType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" }
        ],
        layout: "radio",
        direction: "horizontal"
      },
      initialValue: "image"
    },
    __spreadProps(__spreadValues({}, image), {
      title: "Background Image",
      hidden: ({ parent }) => {
        return parent.bgType !== "image";
      }
    }),
    {
      name: "videoFile",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/*"
      },
      hidden: ({ parent }) => {
        return parent.bgType !== "video";
      }
    },
    {
      type: "string",
      name: "backgroundWidth",
      title: "Background size",
      description: "Background width; What should the background be relative to?",
      options: {
        list: [
          { title: "Page", value: "page" },
          { title: "Container", value: "container" }
        ],
        layout: "radio"
      },
      initialValue: "container"
    },
    {
      type: "string",
      name: "theme",
      title: "Theme",
      description: "Background image theme; Text color will be highest contrast",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" }
        ],
        layout: "radio"
      },
      initialValue: "light"
    },
    {
      type: "string",
      name: "contentPlacement",
      title: "Content placement",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" }
        ],
        layout: "radio"
      },
      initialValue: "left"
    }
  ],
  preview: {
    select: {
      image: "image",
      content: "content.0.children",
      type: "bgType"
    },
    prepare({ type, image: image2, content }) {
      var _a, _b;
      return type === "video" ? {
        title: "Hero (Video)",
        subtitle: content && ((_a = content[0]) == null ? void 0 : _a.text)
      } : {
        title: "Hero (Image)",
        subtitle: content && ((_b = content[0]) == null ? void 0 : _b.text),
        media: image2
      };
    }
  }
});
var heroQuery = groq2`
  _type,
  _key,
  title,
  text,
  bgType,
  image {
    ${imageQuery}
  },
  video{
    id,
    title
  },
  backgroundWidth,
  theme,
  contentPlacement
`;

// src/text-image.ts
import groq3 from "groq";
import { defineType as defineType2 } from "sanity";
var textImage = defineType2({
  name: "text-image",
  title: "Text Image",
  type: "object",
  fields: [
    {
      type: "blockContent",
      name: "body",
      title: "Body"
    },
    image,
    {
      name: "alignment",
      title: "Alignment (Text)",
      description: "Where is the text relative to the image",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" }
        ],
        layout: "radio"
      },
      initialValue: "left"
    }
  ],
  preview: {
    select: {
      body: "body",
      alignment: "alignment",
      media: "image"
    },
    prepare: ({ body, alignment, media }) => {
      var _a, _b, _c, _d;
      return {
        title: (_d = (_c = (_b = (_a = body == null ? void 0 : body[0]) == null ? void 0 : _a.children) == null ? void 0 : _b[0]) == null ? void 0 : _c.text) != null ? _d : "Text Image",
        subtitle: `Text to the ${alignment}`,
        media
      };
    }
  }
});
var textImageQuery = groq3`
  _type,
  _key,
  body,
  image {
    ${imageQuery}
  },
  alignment
`;

// src/index.ts
var hej = "hej";
export {
  hej,
  hero,
  heroQuery,
  image,
  imageQuery,
  textImage,
  textImageQuery
};
