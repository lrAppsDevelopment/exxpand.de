const PHOTO_DIR = '/erfolgsgeschichten'

/** Filename in public/erfolgsgeschichten (must match exactly) */
const PHOTO_FILES_BY_NAME = {
  'Bernhard Zirnsak': 'Bernhard Zirnsak.png',
  'Christian Mareck': 'Christian Mareck .png',
  'David Hofmann': 'David Hofmann.png',
  'Dr. Thomas Rosendahl': 'Dr. Thomas Rosendahl .png',
  'Fabio Pasinetti': 'Fabio Pasinetti.png',
  'Fuat Akar': 'Fuat Akar.png',
  'Geoff Brim': 'Geoff Brim.png',
  'Gil Rosen': 'Gil Rosen.png',
  'Grischa Meyer': 'Grischa Meyer.png',
  'John Noble': 'John Noble.png',
  'Marcel Mohaupt': 'Marcel Mohaupt.png',
  'Philipp Thesen': 'Philipp Thesen.png',
  'Robert Friedmann': 'Robert Friedmann.png',
  'Thomas Brandt': 'Thomas Brandt.png',
  'Thomas Guggenmos': 'Thomas Guggenmos.png',
}

export function getErfolgsgeschichtePhoto(name) {
  if (!name || name === 'Kunde vertraulich') return null
  const file = PHOTO_FILES_BY_NAME[name]
  if (!file) return null
  return `${PHOTO_DIR}/${encodeURI(file)}`
}
