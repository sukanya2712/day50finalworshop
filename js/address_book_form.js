let isUpdate = false;
let contactObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const fullname = document.querySelector('#fullname');
    fullname.addEventListener('input',function(){
        if (fullname.value.length == 0) {
            setTextValue('.name-error', "");
            return;
        }
        try {
            (new Contact()).fullName = fullname.value;
            setTextValue('.name-error', "");
        } catch (e) {
            setTextValue('.name-error', e);
        }
    });

    const address = document.querySelector('#address');
    address.addEventListener('input',function(){
        if (address.value.length == 0) {
            setTextValue('.address-error', "");
            return;
        }
        try {
            (new Contact()).address = address.value;
            setTextValue('.address-error', "");
        } catch (e) {
            setTextValue('.address-error', e);
        }
    });

    const zip = document.querySelector('#zip');
    zip.addEventListener('input',function(){
        if (zip.value.length == 0) {
            setTextValue('.zip-error', "");
            return;
        }
        try {
            (new Contact()).zip = zip.value;
            setTextValue('.zip-error', "");
        } catch (e) {
            setTextValue('.zip-error', e);
        }
    });

    const phonenumber = document.querySelector('#phonenumber');
    phonenumber.addEventListener('input',function(){
        if (phonenumber.value.length == 0) {
            setTextValue('.phonenumber-error', "");
            return;
        }
        try {
            (new Contact()).phone = phonenumber.value;
            setTextValue('.phonenumber-error', "");
        } catch (e) {
            setTextValue('.phonenumber-error', e);
        }
    });

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch(e) {
        return;
    }
}

const setContactObject = () => {
    contactObj._fullName = getInputValueById('#fullname');
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
    contactObj._phone = getInputValueById('#phonenumber');
}

function createAndUpdateStorage(personContact) {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList){
        let contact = contactList.find(cdata => cdata._id == contactObj._id);
        if(!contact){
            contactList.push(createPersonContact());
        } else {
            const index = contactList.map(cdata => cdata._id).indexOf(contact._id);
            contactList.splice(index, 1, createPersonContact(contact._id));
        } 
    } else {
        contactList = [createPersonContact()];
    }
    alert(contactList.toString());
    localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const createPersonContact = (id) => {
    let personContact = new Contact();
    if(!id) personContact.id = createNewContactId();
    else personContact.id = id;
    setPersonContact(personContact);
    return personContact;
}

const setPersonContact = (personContact) => {
    try{
        personContact.fullName = contactObj._fullName;
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }
    try{
        personContact.address = contactObj._address;
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    personContact.city = contactObj._city;
    personContact.state = contactObj._state;
    try{
        personContact.zip = contactObj._zip;
    } catch (e) {
        setTextValue('.zip-error', e);
        throw e;
    }
    try{
        personContact.phone = contactObj._phone;
    } catch (e) {
        setTextValue('.phonenumber-error', e);
        throw e;
    }
    alert(personContact.toString());
}

const createNewContactId = () => {
    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? 1 : (parseInt(contactID)+1).toString();
    localStorage.setItem("ContactID",contactID);
    return contactID;
}

const createContact = () => {
    let personContact = new Contact();
    try {
        personContact._fullName = getInputValueById('#fullname');
    } catch (e) {
        setTextValue('.name-error',e);
    }

    try {
        personContact._phone = getInputValueById('#phonenumber');
    } catch (e) {
        setTextValue('.phonenumber-error',e);
    }

    try {
        personContact._address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error',e);
    }

    personContact._city = getInputValueById('#city');
    personContact._state = getInputValueById('#state');
    personContact._zip = getInputValueById('#zip');
    alert(personContact.toString());
    return personContact;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setForm = () => {
    setValue('#fullname',contactObj._fullName);
    setValue('#phonenumber',contactObj._phone);
    setValue('#address',contactObj._address);
    setValue('#city',contactObj._city);
    setValue('#state',contactObj._state);
    setValue('#zip',contactObj._zip);
}

const resetForm = () => {
    setValue('#fullname','');
    setValue('#phonenumber','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#zip','');
}

const setValue = (id,value) => {
    let element = document.querySelector(id);
    return element.value = value;
}

const setTextValue = (id,value) => {
    let element = document.querySelector(id);
    element.textContent = value;
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if(!isUpdate) return;
    contactObj = JSON.parse(contactJson);
    setForm();
}