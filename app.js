/*
// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return '<li>' + item + '</li>';
    });
    element.html(itemsHTML);
};

// Event listeners
$('.js-shopping-list-form1').submit(function(event) {
    event.preventDefault();
    addItem(state, $('.shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
});



// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Setup repeat layout
var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return listItemTemplate('.js-shopping-item'(item));
    });
    element.html(itemsHTML);
};

// Event listeners
$('.shopping-list-add').submit(function(event) {
    event.preventDefault();
    addItem(state, $('.shopping-list-add-input').val());
    renderList(state, $('.shopping-list'));
});


 var cart = [];

 var item = {name:"apple", cost:1.99, count:3};
 cart.push(item);
 console.log(cart);
 console.log(cart[0]);
 console.log(cart[0].name);
*/

var list = {
  items:[]
};

var listTemplate = (
    '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

function addItem(list,item) {
  list.items.push({
     displayName: item,
     checkedOff: false,
  });
}

function getItem(list,itemIndex) {
  return list.items[itemIndex];
}

function deleteItem(list, itenIndex) {
  list.items.splice(itemIndex, 1);
}

function updateItem(list,itemIndex, updatedItem) {
  list.items[itemIndex] = updatedItem;
}

//HTML Changers

function makeItem(item, itemName,itemTemplate, itemInfo) {
  var element = $(itemTemplate);
  element.find(".js-shopping-item").text(item.displayName);
  if (item.checkedOff) {
    element.find(".js-shopping-item").addClass(".shopping-item__checked");
  }
  element.find(".js-shopping-item-toggle");
  element.attr(itemInfo, itemName);
  return element;
}

function makeList(list, listTemplate, itemInfo) {
  var itemsHTML = list.items.map(
    function(item, index) {
      return makeItem(item, index, listItemTemplate, itemInfo);
    });
  listTemplate.html(itemsHTML);
}

//Event Watchers

function handleAdd (formElement, newItemId, itemTemplate, list) {
  formElement.submit(function(event) {
  event.preventDefault();
  var newItem = formElement.find(newItemId).val();
  addItem(list,newItem);
  makeList(list, listTemplate, itemInfo);
  this.reset();
  });
}

function handleDelete (formElement, removeId, itemInfo, listTemplate, list){
  listTemplate.on("click", removeId, function(event){
    var itemIndex = parseInt($(this).closest("li").attr(itemInfo));
    deleteItem(list, itemIndex);
    makeList(listTemplate,itemInfo);
  })
}

function handleToggle (listTemplate, toggleID, itemInfo, list) {

  listTemplate.on("click", toggleID, function(event) {
    var itemId = $(event.currentTarget.closest("li")).attr(itemInfo);
    var oldItem = getItem(list, itemId);

    updateItem(list, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    makeList(list, listTemplate, itemInfo)
  });
}

$(function() {
  var formElement = $("#js-shopping-list-form1");
  var listTemplate = $(".js-shopping-list");
  var newItemId = "#js-new-item";
  var removeId = ".js-shopping-item-delete";
  var itemInfo = "data-list-item-id";
  var toggleID = ".js-shopping-item-toggle"

  handleAdd(formElement, newItemId, itemInfo, listTemplate, list);
  handleDelete(formElement, removeId, itemInfo, listTemplate, list);
  handleToggle(listTemplate,toggleID,itemInfo,list);

});