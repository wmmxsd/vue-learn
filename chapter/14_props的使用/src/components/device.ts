/* 定义一个接口，用于定义设备接口 */
export interface DeviceInterface {
  id: string,
  name: string
}

/* 定义一个自定义类型，用于定义设备列表 */
export type Devices = DeviceInterface[]

/* 定义一个自定义类型，用于定义泛型列表 */
export type DevicesGenericity = Array<DeviceInterface>
