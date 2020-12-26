// Représente une unité d'information.
class Info {
  /*
   * Represent a piece of information.
   * properties: fill the values of the info.
   * markers: correspond the marker name to the ressource's URL.
   */
  constructor(properties, markersURL) {
    // expected keys = ['id', 'timediff', 'description', 'latitude', 'longitude', 'marker', 'source', 'image', 'optJSON']
    // default value
    this.id = 0
    // this.setMarker(Object.keys(markersURL)[0], markersURL[Object.keys(markersURL)[0]])
    // apply properties
    if (properties) this.updateValues(properties)
    // set the markerURL
    if (this.hasMarker()) this.setMarker(this.getMarker(), markersURL[this.getMarker()])
    // set the printable timediff.
    if (this.hasCreatedAt()) this.timediff = (new Date().getTime() - new Date(properties['createdAt']).getTime()) / 1000
  }

  updateValues(fields) {
    Object.assign(this, fields)
  }

  setLatLng(latlng) {
    this.latitude = latlng.lat
    this.longitude = latlng.lng
  }

  getLocation() {
    // eslint-disable-next-line
    return [this.latitude, this.longitude]
  }

  getId() {
    return this.id ? this.id : 'ID inexistant'
  }

  getDescription() {
    return this.description
  }

  setMarker(markername, markerURL) {
    this.marker = markername
    this.markerURL = markerURL
  }

  getMarkerURL() {
    return this.markerURL
  }

  getMarker() {
    return this.marker
  }

  hasMarker() {
    return !!this.getMarker()
  }

  getImageURL() {
    return this.image
  }

  hasImage() {
    return !!this.getImageURL()
  }

  getSourceURL() {
    return this.source
  }

  hasSource() {
    return !!this.getSourceURL()
  }

  hasCreatedAt() {
    return !!this.createdAt
  }

  /*
   *   Format the date to be printable.
   *   timestamp is assumed to be in second (and not milisecond)
   */
  printTimediff() {
    var str = this.timediff > 0 ? 'Il y a ' : 'Dans '
    var precision = 2 // number of timing information.
    var dhms = [
      Math.floor(this.timediff / (3600 * 24)),
      Math.floor((this.timediff % (3600 * 24)) / 3600),
      Math.floor((this.timediff % 3600) / 60),
      Math.floor(this.timediff % 60),
    ]
    var espaceinsecable = '\xa0'
    var dhmsname = [
      espaceinsecable + 'jour',
      espaceinsecable + 'heure',
      espaceinsecable + 'minute',
      espaceinsecable + 'seconde',
    ]

    var i = 0
    while (!dhms[i++] && i < dhms.length);
    if (!dhms[--i]) return "À l'instant"
    while (precision-- && i < dhms.length) str += dhms[i] + dhmsname[i] + (dhms[i++] > 1 ? 's ' : ' ')
    return str
  }

  /*
   *   Store the piece of information into the database.
   */
  async storeToDB(http) {
    let msg
    try {
      msg = await http({
        url: '/info',
        method: 'POST',
        data: {
          info: JSON.stringify(this),
        },
      })
    } catch (err) {
      console.log(err)
    }
    return msg.data
  }

  /*
   *   Store the piece of information into the database.
   */
  async editToDB(http) {
    let msg
    try {
      msg = await http({
        url: '/info/' + this.id,
        method: 'PUT',
        data: {
          info: JSON.stringify(this),
        },
      })
    } catch (err) {
      console.log(err)
    }
    return msg.data
  }

  /*
   *   Delete the piece of information off the database.
   */
  async supprFromDB(http) {
    let msg
    try {
      msg = await http({
        url: '/info/' + this.id,
        method: 'DELETE',
      })
    } catch (err) {
      console.log(err)
    }
    return msg.data
  }
}

module.exports = Info
