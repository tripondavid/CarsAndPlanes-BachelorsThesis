class Plane extends Vehicle {
  constructor(planeId, type, manufacturer, model, year) {
    super(planeId);
    this.type = type;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
  }
}
