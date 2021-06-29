export const workerSeed = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  description: faker.hacker.phrase(),
  avatar_url: faker.image.image(),
  phone: faker.phone.phoneNumber(),
  state: faker.address.state().slice(0, 2).toUpperCase(),
  city: faker.address.city(),
  portfolio: null,
});
