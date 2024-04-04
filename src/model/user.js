class User {
    constructor(id, email, username, firstName, lastName, userRole, password,
      createdDate, modifiedDate) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userRole = userRole;
      this.password = password;
      this.createdDate = createdDate;
      this.modifiedDate = modifiedDate;
    }
  }
  
  export default User;