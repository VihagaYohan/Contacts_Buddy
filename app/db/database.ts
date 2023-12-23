import {appSchema, Database, tableSchema} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// migrations
import migrations from './migrations';

// models
import Contact from './contacts';

// schema
import ContactSchema from './schemas/contactSchema';
import {Platform} from 'react-native';

const version = 1;

const schema = appSchema({
  version,
  tables: [ContactSchema],
});

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  onSetUpError: error => {
    console.log(error);
  },
  dbName: 'contacts_db',
  jsi: Platform.OS === 'ios',
});

const database = new Database({
  adapter,
  modelClasses: [Contact],
});

export default database;
