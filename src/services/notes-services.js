import db from '../database'
// import utils from '../utils'
import { Either } from 'ramda-fantasy'

const notesCollectionName = 'notes'

const success = require('../common/successes')
// const errors = require('../common/errors')

// const error = Either.Left
const value = Either.Right

export default {

  async createNote(note) {
    const inserted = await db.get(notesCollectionName).insert(note)
    return new value(new success.Ok(inserted))
  },

  getNotes() {
    return db.get(notesCollectionName).find()
  },

  getNote(noteId) {
    return db.get(notesCollectionName).findOne({ _id: noteId })
  },
}
