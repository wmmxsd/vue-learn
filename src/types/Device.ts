export class GraphicsCard {
  brand: string
  model: string

  constructor(brand: string, model: string) {
    this.brand = brand
    this.model = model
  }
}

export class Device {
  ip: string
  mac: Array<string>
  //?代表可选的
  graphicsCard?: GraphicsCard

  constructor(ip: string, mac: Array<string>, graphicsCard?: GraphicsCard) {
    this.ip = ip
    this.mac = mac
    this.graphicsCard = graphicsCard
  }
}
