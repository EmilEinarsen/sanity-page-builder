import { defineType } from "sanity";
import { customImage } from "../utils/custom-image";

export const textImage = defineType({
	name: 'text-image',
  title: 'Text Image',
  type: 'object',
  fields: [
		{
			type: 'blockContent',
			name: 'body',
			title: 'Body'
		},
    customImage({
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
    prepare: ({ body, alignment, media }) => ({
			title: body?.[0]?.children?.[0]?.text ?? 'Text Image', 
			subtitle: `Text to the ${alignment}`,
			media
		})
  }
})