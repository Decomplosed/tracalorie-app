// Storage Controller

// Item Controller

const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // Data Structure / State

  const data = {
    items: [
      {
        id: 0,
        name: 'Steak Dinner',
        calories: '1200'
      },
      {
        id: 1,
        name: 'Cookie',
        calories: '400'
      },
      {
        id: 2,
        name: 'Eggs',
        calories: '300'
      },
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items
    },
    logData: function() {
      return data
    }
  }
})()

// UI Controller

const UICtrl = (function() {
  return {
    populateItemsList: function(items) {
      let html = ''

      items.forEach(item) {
        html += `<li></li>`
      }
    }
  }
})()

// App Controller

const App = (function(ItemCtrl, UICtrl) {

  return {
    init: function() {
      const items = ItemCtrl.getItems()

      UICtrl.populateItemsList(items)
    }
  }

})(ItemCtrl, UICtrl)

App.init()