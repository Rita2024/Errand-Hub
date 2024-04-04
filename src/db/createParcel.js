import db from './index';

const createParcelsTable = `CREATE TABLE IF NOT EXISTS
parcels (
  id UUID PRIMARY KEY,
  location VARCHAR(128) NOT NULL,
  destination VARCHAR(128) NOT NULL,
  present_location VARCHAR(128),
  weight INTEGER NOT NULL,
  owner_id UUID NOT NULL,
  receiver_phone VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
)`;

setTimeout(() => {
  db.query(createParcelsTable)
    .then(() => {
    })
    .catch(() => {
      // console.log(err);
    });
}, 10);