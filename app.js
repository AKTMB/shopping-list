var state = {
  items: []
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

function addItem(state,item) {
  state.items.push({
     displayName: item,
     checkedOff: false,
  });
}

function getItem(state,itemIndex) {
  return state.items[itemIndex];
}

function deleteItem(state, itenIndex) {
  state.items.splice(itemIndex, 1);
}

function updateItem(state,itemIndex, updatedItem) {
  state.items[itemIndex] = updatedItem;
}

//HTML Changers

function makeItem(item, itemName, listTemplate, itemInfo) {
  var element = $(listTemplate);
  element.find(".js-shopping-item").text(item.displayName);
  if (item.checkedOff) {
    element.find(".js-shopping-item").addClass(".shopping-item__checked");
  }
  element.find(".js-shopping-item-toggle");
  element.attr(itemInfo, itemName);
  return element;
}

function makeList(state, listElemnt, itemInfo) {
  var itemsHTML = state.items.map(
    function(item, index) {
      return makeItem(item, index, listTemplate, itemInfo);
    });
  listElemnt.html(itemsHTML);
}

//Event Watchers

function handleAdd (formElement, newItemId, itemInfo, listElemnt, state) {
  formElement.submit(function(event) {
  event.preventDefault();
  console.log("Hello");
  var newItem = formElement.find(newItemId).val();
  //console.log(newItem);
  addItem(state,newItem);
  makeList(state, listElemnt, itemInfo);
  this.reset();
  });
}

function handleDelete (formElement, removeId, itemInfo, listElemnt, state){
  listElemnt.on("click", removeId, function(event){
    var itemIndex = parseInt($(this).closest("li").attr(itemInfo));
    deleteItem(list, itemIndex);
    makeList(list, listElemnt, itemInfo);
  })
}

function handleToggle (listElemnt, toggleID, itemInfo, state) {

  listElemnt.on("click", toggleID, function(event) {
    var itemName = $(event.currentTarget.closest("li")).attr(itemInfo);
    var oldItem = getItem(list, itemName);

    updateItem(state, itemName, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    makeList(state, listElemnt, itemInfo)
  });
}

$(function() {
  var formElement = $('.shopping-list-add');
  var listElemnt = $(".js-shopping-list");
  var newItemId = "#add-input";
  var removeId = ".js-shopping-item-delete";
  var itemInfo = "data-list-item-id";
  var toggleID = ".js-shopping-item-toggle"

  handleAdd(formElement, newItemId, itemInfo, listElemnt, state);
  handleDelete(formElement, removeId, itemInfo, listElemnt, state);
  handleToggle(listElemnt,toggleID,itemInfo,state);

});

/*
// module-level global vars

// we're using a single, global state object
// in this app
var state = {
  items: []
};


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


// state management
function addItem(state, item) {
  state.items.push({
    displayName: item,
    checkedOff: false
  });
}

function getItem(state, itemIndex) {
  return state.items[itemIndex];
}

function deleteItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
}

function updateItem(state, itemIndex, newItemState) {
  state.items[itemIndex] = newItemState;
}

// DOM manipulation

function renderItem(item, itemId, itemTemplate, itemDataAttr) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.displayName);
  if (item.checkedOff) {
    element.find('.js-shopping-item').addClass('shopping-item__checked');
  }
  element.find('.js-shopping-item-toggle')
  element.attr(itemDataAttr, itemId);
  return element;
}

function renderList(state, listElement, itemDataAttr) {
  var itemsHTML = state.items.map(
    function(item, index) {
      return renderItem(item, index, listItemTemplate, itemDataAttr);
  });
  listElement.html(itemsHTML);
}


// Event listeners

function handleItemAdds(
  formElement, newItemIdentifier, itemDataAttr, listElement, state) {

  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(newItemIdentifier).val();
    addItem(state, newItem);
    renderList(state, listElement, itemDataAttr);
    // reset form
    this.reset();
  });
}

function handleItemDeletes(
  formElement, removeIdentifier, itemDataAttr, listElement, state) {

  listElement.on('click', removeIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
    deleteItem(state, itemIndex);
    renderList(state, listElement, itemDataAttr);
  })
}


function handleItemToggles(
  listElement, toggleIdentifier, itemDataAttr, state) {

  listElement.on('click', toggleIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var oldItem = getItem(state, itemId);

    updateItem(state, itemId, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    renderList(state, listElement, itemDataAttr)
  });
}


$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');

  // from index.html -- it's the id of the input
  // containing shopping list items
  var newItemIdentifier = '#js-new-item';

  // from `listItemTemplate` at top of this file. for each
  // displayed shopping list item, we'll be adding a button
  // that has this class name on it
  var removeIdentifier = '.js-shopping-item-delete';

  // we'll use this attribute to store the id of the list item
  var itemDataAttr = 'data-list-item-id';

  //
  var toggleIdentifier = '.js-shopping-item-toggle'

  handleItemAdds(
    formElement, newItemIdentifier, itemDataAttr, listElement, state);
  handleItemDeletes(
    formElement, removeIdentifier, itemDataAttr, listElement, state);
  handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state);
});
*/
