const {program} = require("commander");
const contacts = require("./contacts");


// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
		const allContacts = await contacts.listContacts();
		return console.table(allContacts);
      break;

    case 'get':
		const oneContact = await contacts.getContactById(id);
		return console.log(oneContact);
      break;

    case 'add':
      const newContact = await contacts.addContact({name, email, phone})
		return console.log(newContact);
      break;

    case 'remove':
		const deletedContact = await contacts.removeContact(id);
		return console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

  program.parse();
  const options = program.opts();

invokeAction(options);