var $_ = function (selector, node = document) {
  return node.querySelector(selector);
}

var contacts = [];

// ============= HTML ELEMENTS ================== 
var elContactForm = $_('.js-new-contact-form');
var elContactNameInput = $_(".js-new-contact-form__name-input", elContactForm);
var elContactSurnameInput = $_(".js-new-contact-form__surname-input", elContactForm);
var elContactNumberInput = $_(".js-new-contact-form__contact-input", elContactForm);
var elContactRelationShipInput = $_(".js-new-contact-form__relationship-input", elContactForm);
var elContactResultList = $_(".contacts");
var elContactItem = $_('.contact__item')
var elDeleteBtn = $_('.js-remove-btn');
var elIfIncludes = $_(".have-or-note");

// console.log(elContactResultList);

var createContactObject = function (name, surname, number, relationship) {
  return {
    name,
    surname,
    number,
    relationship,
  }
}



function renderList() {

  elContactResultList.innerHTML = "";

  contacts.forEach(function (contact, i) {

    var newLi = createElement(
      'li', 'contact__item list-group-item'
    );

    var newDivFullname = createElement(
      'div',
      'contact__fullname',
      `${contact.name} ${contact.surname}`
    );

    var newDivRelationship = createElement(
      'div',
      'contact__relationship small',
      contact.relationship
    );

    var newHrefNumber = createElement(
      'a',
      "contact__phone-number",
      contact.number
    );
    newHrefNumber.href = `tel:${contacts.number}`

    var newDeleteBtn = createElement('button', 'js-remove-btn');
    newDeleteBtn.type = 'button';
    newDeleteBtn.value = i;
    var newBtnImg = createElement('img', 'close-img', );
    newBtnImg.src = './images/close.svg';

    newDeleteBtn.addEventListener('click', function () {
      contacts.splice(parseInt(this.value), 1);
      renderList();
    });

    newLi.appendChild(newDivFullname);
    newLi.appendChild(newDivRelationship);
    newLi.appendChild(newHrefNumber);
    newLi.appendChild(newDeleteBtn);
    newDeleteBtn.appendChild(newBtnImg);

    elContactResultList.appendChild(newLi);
  });
}


function clearInputs() {
  elContactNameInput.value = null;
  elContactSurnameInput.value = null;
  elContactNumberInput.value = null;
  elContactRelationShipInput.value = null;
  elContactRelationShipInput.value = null;

  elContactNameInput.focus();//Focus to input name failed
}

// function includes() {

//   if (contacts.includes(elContactNameInput.value)) {
//     elIfIncludes.textContent = "Bu contact qo'shilgan";
//     console.log(elIfIncludes);
//   }
// }

// Add new contact
elContactForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  var name = elContactNameInput.value.trim();
  var surname = elContactSurnameInput.value.trim();
  var number = elContactNumberInput.value.trim();
  var relationship = elContactRelationShipInput.value.trim();
  
  contacts.push(createContactObject(name, surname, number, relationship));
  
  renderList();//Update all contact cards
  clearInputs();//Clear all input values
  // includes();
});


function remove() {
  elDeleteBtn.addEventListener('click', function () {
    elContactItem.remove(elContactItem);
  });
}
remove();
