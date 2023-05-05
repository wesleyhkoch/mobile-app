export interface Product {
  id: number
  category: 'product' | 'accessory'
  quantity: number
  productName: string
  productPrice: number
  description: string
  isOff: boolean
  offPercentage: number
  productImage: NodeRequire
  isAvailable: boolean
  productImageList: NodeRequire[]
}
