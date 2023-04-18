"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textImage = void 0;
const sanity_1 = require("sanity");
const custom_image_1 = require("../utils/custom-image");
exports.textImage = (0, sanity_1.defineType)({
    name: 'text-image',
    title: 'Text Image',
    type: 'object',
    fields: [
        {
            type: 'blockContent',
            name: 'body',
            title: 'Body'
        },
        (0, custom_image_1.customImage)({
            name: 'image',
            title: 'Image',
        }),
        {
            name: 'alignment',
            title: 'Alignment (Text)',
            description: 'Where is the text relative to the image',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio'
            },
            initialValue: 'left'
        },
    ],
    preview: {
        select: {
            body: 'body',
            alignment: 'alignment',
            media: 'image',
        },
        prepare: ({ body, alignment, media }) => {
            var _a, _b, _c, _d;
            return ({
                title: (_d = (_c = (_b = (_a = body === null || body === void 0 ? void 0 : body[0]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : 'Text Image',
                subtitle: `Text to the ${alignment}`,
                media
            });
        }
    }
});
