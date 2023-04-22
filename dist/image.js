"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageQuery = exports.image = void 0;
const groq_1 = __importDefault(require("groq"));
const sanity_1 = require("sanity");
const crops = [
    { title: 'Original', value: 0 },
    { title: '1 : 1 (square)', value: 1 },
    { title: '5 : 7', value: 0.7142857143 },
    { title: '4 : 6', value: 0.6666666667 },
    { title: '16 : 9', value: 1.7777777778 }
];
exports.image = (0, sanity_1.defineField)({
    type: 'image',
    name: 'image',
    title: 'Image',
    options: {
        hotspot: true
    },
    fields: [
        (0, sanity_1.defineField)({
            title: 'Display Size (aspect ratio)',
            name: 'customRatio',
            type: 'number',
            options: {
                list: crops,
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
            title: 'Alternative text',
            name: 'alt',
            type: 'string',
            description: 'Important for SEO and accessiblity.'
        }
    ],
    preview: {
        select: {
            asset: 'asset',
            alt: 'asset.alt',
            customAlt: 'alt',
            customRatio: 'customRatio'
        },
        prepare: ({ alt, customAlt, customRatio, asset }) => {
            var _a, _b;
            return ({
                title: (_a = customAlt !== null && customAlt !== void 0 ? customAlt : alt) !== null && _a !== void 0 ? _a : '(alt text missing)',
                subtitle: (_b = crops.find(crop => crop.value === customRatio)) === null || _b === void 0 ? void 0 : _b.title,
                media: asset
            });
        }
    }
});
exports.imageQuery = (0, groq_1.default) `
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
