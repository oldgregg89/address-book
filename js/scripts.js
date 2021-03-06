// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// AddressBook.prototype.checkIfBlank = function(contact) {
//   contact.forEach(function() {
//     if (this.trim() !== "") { 
//       this.hide();
//     } else {
//       this.show();
//     }
//   });
//   return
// }

AddressBook.prototype.checkIfBlank = function(contact) {
  contact.firstName(function() {
    if (.trim() !== "") { 
      $(".form-control").hide();
    } else {
      $(".form-control").show();
    }
  });
  return
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, personalAddress, busienssAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email
  this.personalAddress = personalAddress
  this.busienssAddress = busienssAddress
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Contact.prototype.findEmptyInputs = function() {
//   $("form:input").each(function() {
//   if ($('input.trim()' !== "")) { 
//     $(this).hide();
//     console.log('hiding');
//   } else {
//     $(this).show();
//     console.log('showing');
//   }
// });
// };

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".address-personal").html(contact.personalAddress);
  $(".address-business").html(contact.busienssAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedemail = $("input#new-email").val();
    const inputtedPersonalAddress = $("input#new-personal-address").val();
    const inputtedBuinessAddress = $("input#new-business-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-personal-address").val("");
    $("input#new-business-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedemail, inputtedPersonalAddress, inputtedBuinessAddress);
    addressBook.addContact(newContact);
    debugger;
    addressBook.checkIfBlank(newContact);
    debugger;
    // newContact.findEmptyInputs();
    displayContactDetails(addressBook);
  });
});