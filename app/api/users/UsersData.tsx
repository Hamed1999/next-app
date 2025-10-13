export class User {
  public readonly id: number;
  private static instances = 0;
  constructor(public readonly name: string) {
    this.id = ++User.instances;
  }
}

const Users: User[] = [
  new User("Hamed"),
  new User("Mosh"),
  new User("Mahdi"),
  new User("John"),
  new User("Mahmoud"),
  new User("Homa"),
  new User("Mobina"),
  new User("Zahra"),
];
export default Users;
