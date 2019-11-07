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
      // {
      //   id: 0,
      //   name: 'Steak Dinner',
      //   calories: 1200
      // },
      // {
      //   id: 1,
      //   name: 'Cookie',
      //   calories: 400
      // },
      // {
      //   id: 2,
      //   name: 'Eggs',
      //   calories: 300
      // },
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items
    },
    addItem: function(name, calories) {
      let ID
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0
      }

      calories = parseInt(calories)

      newItem = new Item(ID, name, calories)

      data.items.push(newItem)
    },
    logData: function() {
      return data
    }
  }
})()

// UI Controller

const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  return {
    populateItemsList: function(items) {
      let html = ''

      items.forEach(function(item) {
        html += `
        <li id="item-${item.id}" class="collection-item">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
        `
      })

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      const li = document.createElement('li')
      li.className = 'collection-item'
      li.id = `item-${item.id}`
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    getSelectors: function() {
      return UISelectors
    }
  }
})()

// App Controller

const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners

  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors()

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

  }

  const itemAddSubmit = function(e) {
    const input = UICtrl.getItemInput()

    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      UICtrl.clearInput()
    }
      UICtrl.addListItem(newItem)


    e.preventDefault()
  }


  return {
    init: function() {
      const items = ItemCtrl.getItems()

      if(items.length === 0) {
        UICtrl.hideList()
      } else {
        UICtrl.populateItemsList(items)
      }

      loadEventListeners()
    }
  }

})(ItemCtrl, UICtrl)

App.init()