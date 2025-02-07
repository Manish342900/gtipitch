import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const startup=defineType({
    name:'startup',
    title:'Startup',
    type:'document',
    icon:UserIcon,
    fields:[
        defineField({
            name:"slug",
            type:'slug',
            options:{
                source:"title"

            }
        }),
        defineField({
            name:"title",
            type:'string'
        }),
        defineField({
            name:"author",
            type:'reference',
            to: [{ type: 'author' }],
            validation: (Rule) => Rule.optional(),
        }),
        defineField({
            name:"views",
            type:'number'
        }),
        defineField({
            name:"description",
            type:'text'
        }),
        defineField({
            name:"category",
            type:'string'
        }),
        defineField({
            name:"image",
            type:'url'
        }),
        defineField({
            name:"pitch",
            type:'markdown'
        }),
    ],
    

})