import {appSchema, tableSchema} from '@nozbe/watermelondb';

const TableSchema = tableSchema({
  name: 'contacts',
  columns: [
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
});

export default TableSchema;
