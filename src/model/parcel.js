class Parcel {
    constructor(id, location, destination, presentLocation, weight, ownerId, receiverPhone, status,
      createdDate, modifiedDate) {
      this.id = id;
      this.location = location;
      this.destination = destination;
      this.presentLocation = presentLocation;
      this.weight = weight;
      this.ownerId = ownerId;
      this.receiverPhone = receiverPhone;
      this.status = status;
      this.createdDate = createdDate;
      this.modifiedDate = modifiedDate;
    }
  }
  
  export default Parcel;