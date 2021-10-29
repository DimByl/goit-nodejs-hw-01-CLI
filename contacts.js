const fs = require('fs/promises')
const path = require('path')
const shortid = require("shortid");

const readData = async () => {
    const result = await fs.readFile(path.join(__dirname, './db', '/contacts.json'), 'utf-8');
    return JSON.parse(result);
};

const listContacts = async () => {
    return await readData();
};

const getContactById = async (contactId) => {
    const contacts = await readData();
    const [result] = contacts.filter(
        (contact) => String(contact.id) === String(contactId)
    );
    return result;
};

const removeContact = async (contactId) => {
    const contacts = await readData();
    const result = contacts.filter(
        (contact) => String(contact.id) !== String(contactId)
    );
    await fs.writeFile(
        path.join(__dirname, "./db", "/contacts.json"),
        JSON.stringify(contacts, null, 2)
    );
    return result;
};

const addContact = async (name, email, phone) => {
    const contacts = await readData();
    const newContact = { id: shortid.generate(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
        path.join(__dirname, "./db", "/contacts.json"),
        JSON.stringify(contacts, null, 2)
    );
    return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };