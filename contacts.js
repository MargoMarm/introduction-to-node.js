const fs = require('fs').promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find( contact => contact.id === contactId);
		return contact || null;
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex( contact => contact.id === contactId);
		if (index === -1) {
			return null
		}
		const [ contact ] = contacts.splice(index,1)
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
		return contact;
	} catch (error) {
		console.log(error);
	}
}

async function addContact(data) {
	try {
		const contacts = await listContacts();
		const newContact = {
			...data, id : nanoid(),
		}
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}