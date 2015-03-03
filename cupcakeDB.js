var u = require("underscore")

var items = {}
var pkCounter = 0

var createItem = function(data) {
  pkCounter++
  var item = u.extend({}, data, { id: pkCounter })
  items[pkCounter] = item

  return item
}

var editItem = function(id, data) {
  if (!items[id]) {
    return false
  }

  var item = u.extend({}, items[id], data)
  items[id] = item

  return item
}

exports = module.exports = {

  list: function() {
    return u.values(items)
  },

  create: function(data) {
    return createItem(data) || false
  },

  read: function(id) {
    return items[id] || false
  },

  update: function(id, data) {
    return editItem(id, data) || false
  },

  delete: function(id) {
    var item = items[id]
    items = u.omit(items, id)

    return item || false
  },

  init: function() {
    createItem({ icing: "Chocolate", cake: "Vanilla", sprinkles: false })
    createItem({ icing: "Vanilla", cake: "Vanilla", sprinkles: true })
    createItem({ icing: "Vanilla", cake: "Chocolate", sprinkles: true })
    createItem({ icing: "Chocolate", cake: "Chocolate", sprinkles: false })
    createItem({ icing: "Vanilla", cake: "Cookie Dough", sprinkles: false })
    createItem({ icing: "Vanilla", cake: "Red Velvet", sprinkles: false, disgusting: "you bet" })
    createItem({ icing: "Strawberry", cake: "Vanilla", sprinkles: true })
  }

}