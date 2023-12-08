import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'subTitle', type: 'string', isOptional: true},
        {name: 'body', type: 'string'},
        {name: 'is_pinned', type: 'boolean'},
      ],
    }),

    tableSchema({
      name: 'contacts',
      columns: [
        {name: 'contact_id', type: 'string', isIndexed: true},
        {name: 'first_name', type: 'string'},
        {
          name: 'last_name',
          type: 'string',
          isOptional: true,
        },
        {name: 'company', type: 'string', isOptional: true},
        {name: 'phone', type: 'string', isOptional: true},
        {name: 'email', type: 'string', isOptional: true},
        {
          name: 'address',
          type: 'string',
          isOptional: true,
        },
      ],
    }),
  ],
});
