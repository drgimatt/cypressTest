import { faker } from '@faker-js/faker';

export function generateCustomerData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const randomDigits = Math.floor(Math.random() * 900) + 100; // Generates a number between 100 and 999

  const username = `${firstName.slice(0, 3).toLowerCase()}${lastName.slice(-3).toLowerCase()}${randomDigits}`;

  return {
    firstName: firstName,
    lastName: lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNum: "0000000",
    ssn: faker.string.numeric(9),
    username: username,
    password: faker.internet.password(),
  };
}
