class Car extends Vehicle {
  constructor(carId, type, manufacturer, model, year) {
    super(carId);
    this.type = type;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
  }
}
