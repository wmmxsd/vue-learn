import { defineStore } from 'pinia'
import { Device, GraphicsCard } from '../types/Device'

export const userDeviceInfoStore = defineStore('deviceInfo', {
  state: () => ({
    device: new Device(
      '192.168.1.1',
      ['00:0a:95:9d:68:16', '00:0a:95:9d:68:17'],
      new GraphicsCard('NVIDIA', 'RTX 5090'),
    ) as Device,
  }),
  getters: {
    getDevice: (state) => state.device,
  },
  actions: {
    setDevice(device: Device) {
      this.device = device
    },
  },
})
