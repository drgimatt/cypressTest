import { faker } from '@faker-js/faker';

export function generateCustomerData() {

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNum: "0000000",
    ssn: faker.string.numeric(9),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
}