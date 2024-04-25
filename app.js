const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const customer = require('./customer.js');
const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

const createCustomer = async () => {
    const customerData = {
        name: custName,
        age: custAge,
    };
    const Customer = await customer.create(customerData);
    console.log('New Customer:', Customer);
    showMainMenu();
};

const viewCustomers = async () => {
    const allCustomers = await customer.find({});
    console.log("All Customers:");
    allCustomers.forEach((cust) => {
        console.log(`ID: ${cust._id}, Name: ${cust.name}, Age: ${cust.age}`);
    });
    showMainMenu();
};

const deleteCustomer = async () => {
    viewCustomers(); 

    const custId = prompt('Enter the ID of the customer you want to delete: ');
    const deletedCustomer = await customer.findByIdAndDelete(custId);

    if (deletedCustomer) {
        console.log('Customer deleted successfully.');
    } else {
        console.log('Customer not found!');
    }
    showMainMenu();
};

const updateCustomer = async () => {
    viewCustomers();
    const custId = prompt('Enter the ID of the customer you want to update: ');
    const newName = prompt('Enter the new name for the customer: ');
    const newAge = prompt('Enter the new age for the customer: ');

    const updatedCustomer = await customer.findByIdAndUpdate(custId, { name: newName, age: newAge }, { new: true });

    if (updatedCustomer) {
        console.log('Customer updated successfully:', updatedCustomer);
    } else {
        console.log('Customer not found!');
    }
    showMainMenu();
};

const custQueries = async () => {
    console.log('Queries running.');
    await createCustomer();
};

const showMainMenu = () => {
    console.log(mainMenu);
    const answer = prompt(`Type the number of the action you want to run: `);
    handleAction(answer);
};

const mainMenu = `Welcome to the CRM

What would you like to do ?

    1. Create a customer
    2. View all the customers
    3. Update a customer
    4. Delete a customer
    5. Quit
`;

const handleAction = (answer) => {
    if (answer === "1") {
        console.clear();
        console.log('Enter A New Customer')
        custName = prompt('Please type the name of the customer: ')
        custAge = prompt('Please type the age of the customer: ')
        custQueries();
    } else if (answer === "2") {
        console.clear()
        console.log("View all of the customers")
        viewCustomers();
    } else if (answer === "3") {
        console.clear();
        console.log("Update a customer");
        updateCustomer();
    } else if (answer === "4") {
        console.clear();
        console.log('Delete a customer');
        deleteCustomer();
    } else if (answer === "5") {
        console.clear()
        console.log('Exiting')
        process.exit(0);
    } else {
        console.log("Invalid option!");
        showMainMenu();
    }
};

const connectAndRun = async () => {
    await connect();
    showMainMenu();
};

connectAndRun();
