var $_ = function (selector, node = document) {
  return node.querySelector(selector);
}

var contacts = JSON.parse(localStorage.getItem("form")) || [];

// ============= HTML ELEMENTS ================== 
var elContactForm = $_('.js-new-contact-form');
var elContactNameInput = $_(".js-new-contact-form__name-input", elContactForm);
var elContactSurnameInput = $_(".js-new-contact-form__surname-input", elContactForm);
var elContactNumberInput = $_(".js-new-contact-form__contact-input", elContactForm);
var elContactRelationShipInput = $_(".js-new-contact-form__relationship-input", elContactForm);
var elContactResultList = $_(".contacts");
var elContactItem = $_('.contact__item')
var elSaveBtn = $_(".save-btn");
var elDeleteBtn = $_('.js-remove-btn');


// console.log(elContactResultList);

var createContactObject = function (name, surname, number, relationship) {
  return {
    name,
    surname,
    number,
    relationship,
  }
}

function renderList(nimadir) {
  elContactResultList.innerHTML = "";

  nimadir.forEach(function (contact, i) {
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
    var newBtnImg = createElement('img', 'close-img', );
    newBtnImg.src = './images/close.svg';
    console.log(newDeleteBtn);
    newDeleteBtn.dataset.id = i;

    newDeleteBtn.addEventListener('click', function (e) {
      if (e.target.dataset.id) {
        let findIndex = contacts.findIndex((el) => el.id == e.target.dataset.id);
        contacts.splice((findIndex), 1);
        localStorage.setItem("form", JSON.stringify(contacts));
  
        renderList();
      }
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

  elContactNameInput.focus(); //Focus to input name failed
}


// Add new contact
elContactForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  var name = elContactNameInput.value.trim();
  var surname = elContactSurnameInput.value.trim();
  var number = elContactNumberInput.value.trim();
  var relationship = elContactRelationShipInput.value.trim();

  let formInfo = {
    name: name,
    surname: surname,
    number: number,
    relationship: relationship,
  }

  window.localStorage.setItem("form", JSON.stringify(formInfo));
  const data = JSON.parse(window.localStorage.getItem("form"))
  console.log(data);

  contacts.push(createContactObject(formInfo.name, surname, number, relationship));
  localStorage.setItem("form", JSON.stringify(contacts))

  renderList(contacts); //Update all contact cards
  clearInputs(); //Clear all input values
});

renderList(contacts)

function remove() {
  elDeleteBtn.addEventListener('click', function () {
    elContactItem.remove(elContactItem);
  });
}
remove();

console.log(contacts);