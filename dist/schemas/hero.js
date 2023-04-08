"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hero = void 0;
const sanity_1 = require("sanity");
const custom_image_1 = require("../utils/custom-image");
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
                    { title: 'Photo', value: 'photo' },
                    { title: 'Video', value: 'video' }
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
            initialValue: 'photo'
        },
        Object.assign(Object.assign({}, (0, custom_image_1.customImage)({ name: 'image', title: 'Background Image' })), { hidden: ({ parent }) => {
                return parent.bgType !== 'photo';
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
                    { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
            },
            initialValue: 'left',
        }
    ],
    preview: {
        select: {
            photo: 'photo',
            content: 'content.0.children',
            type: 'bgType'
        },
        prepare({ type, photo, content }) {
            var _a, _b;
            return type === 'video' ? {
                title: 'Hero (Video)',
                subtitle: content && ((_a = content[0]) === null || _a === void 0 ? void 0 : _a.text),
            } : {
                title: 'Hero (Photo)',
                subtitle: content && ((_b = content[0]) === null || _b === void 0 ? void 0 : _b.text),
                media: photo
            };
        }
    }
});
