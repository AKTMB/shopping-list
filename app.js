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

function deleteItem(state, itemIndex) {
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
    element.find(".js-shopping-item").addClass("shopping-item__checked");
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

function handleAdd (formElement, itemNameID, itemInfo, listElemnt, state) {
  formElement.submit(function(event) {
  event.preventDefault();
  console.log("Hello");
  var newItem = formElement.find(itemNameID).val();
  //console.log(newItem);
  addItem(state, newItem);
  makeList(state, listElemnt, itemInfo);
  this.reset();
  });
}

function handleDelete (formElement, removeId, itemInfo, listElemnt, state){
  listElemnt.on("click", removeId, function(event){
    var itemIndex = parseInt($(this).closest("li").attr(itemInfo));
    deleteItem(state, itemIndex);
    makeList(state, listElemnt, itemInfo);
  })
}

function handleToggle (listElemnt, toggleID, itemInfo, state) {

  listElemnt.on("click", toggleID, function(event) {
    var itemName = $(event.currentTarget.closest("li")).attr(itemInfo);
    var oldItem = getItem(state, itemName);
    console.log("HOLA");
    updateItem(state, itemName, {
      displayName: oldItem.displayName,
      checkedOff: !oldItem.checkedOff
    });
    makeList(state, listElemnt, itemInfo)
  });
}

$(function() {
  var formElement = $('#js-shopping-list-form');
  var listElemnt = $('.js-shopping-list');
  var itemNameID = '#js-new-item';
  var removeId = ".js-shopping-item-delete";
  var itemInfo = 'data-list-item-id';
  var toggleID = '.js-shopping-item-toggle'

  handleAdd(formElement, itemNameID, itemInfo, listElemnt, state);
  handleDelete(formElement, removeId, itemInfo, listElemnt, state);
  handleToggle(listElemnt,toggleID,itemInfo,state);

});

