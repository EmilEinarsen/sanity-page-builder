import { defineType } from "sanity"
import { customImage } from "../utils/custom-image"

export const hero = defineType({
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
    {
      ...customImage({ name: 'image', title: 'Background Image' }),
      hidden: ({ parent }) => {
        return parent.bgType !== 'photo'
      }
    },
    {
			name: 'videoFile',
			title: 'Background Video',
			type: 'file',
			options: {
				accept: 'video/*'
			},
      hidden: ({ parent }) => {
        return parent.bgType !== 'video'
      }
    },
		{
			type: 'string',
			name: 'backgroundWidth',
			title: 'Background size',
			description: 'Background width; What should the background be relative to?',
			options: {
				list: [
					{title: 'Page', value: 'page'},
					{title: 'Container', value: 'container'}
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
					{title: 'Light', value: 'light'},
					{title: 'Dark', value: 'dark'}
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
					{title: 'Left', value: 'left'},
					{title: 'Center', value: 'center'},
					{title: 'Right', value: 'right'}
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
      return type  === 'video' ? {
        title: 'Hero (Video)',
        subtitle: content && content[0]?.text,
      } : {
        title: 'Hero (Photo)',
        subtitle: content && content[0]?.text,
        media: photo
      }
    }
  }
})
