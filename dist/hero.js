"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroQuery = exports.hero = void 0;
const groq_1 = __importDefault(require("groq"));
const sanity_1 = require("sanity");
const image_1 = require("./image");
exports.hero = (0, sanity_1.defineType)({
    type: 'object',
    name: 'hero',
    title: 'Hero',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'text',
            title: 'Text',
            type: 'string',
        },
        {
            title: 'Background Type',
            name: 'bgType',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' }
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
            initialValue: 'image'
        },
        Object.assign(Object.assign({}, image_1.image), { title: 'Background Image', hidden: ({ parent }) => {
                return parent.bgType !== 'image';
            } }),
        {
            name: 'videoFile',
            title: 'Background Video',
            type: 'file',
            options: {
                accept: 'video/*'
            },
            hidden: ({ parent }) => {
                return parent.bgType !== 'video';
            }
        },
        {
            type: 'string',
            name: 'backgroundWidth',
            title: 'Background size',
            description: 'Background width; What should the background be relative to?',
            options: {
                list: [
                    { title: 'Page', value: 'page' },
                    { title: 'Container', value: 'container' }
                ],
                layout: 'radio'
            },
            initialValue: 'container',
        },
        {
            type: 'string',
            name: 'theme',
            title: 'Theme',
            description: 'Background image theme; Text color will be highest contrast',
            options: {
                list: [
                    { title: 'Light', value: 'light' },
                    { title: 'Dark', value: 'dark' }
                ],
                layout: 'radio'
            },
            initialValue: 'light',
        },
        {
            type: 'string',
            name: 'contentPlacement',
            title: 'Content placement',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Center', value: 'center' },
                    { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
            },
            initialValue: 'left',
        }
    ],
    preview: {
        select: {
            image: 'image',
            content: 'content.0.children',
            type: 'bgType'
        },
        prepare({ type, image, content }) {
            var _a, _b;
            return type === 'video' ? {
                title: 'Hero (Video)',
                subtitle: content && ((_a = content[0]) === null || _a === void 0 ? void 0 : _a.text),
            } : {
                title: 'Hero (Image)',
                subtitle: content && ((_b = content[0]) === null || _b === void 0 ? void 0 : _b.text),
                media: image
            };
        }
    }
});
exports.heroQuery = (0, groq_1.default) `
  _type,
  _key,
  title,
  text,
  bgType,
  image {
    ${image_1.imageQuery}
  },
  video{
    id,
    title
  },
  backgroundWidth,
  theme,
  contentPlacement
`;
