export type Color = RGB | string | number

export type RGB = RGBArray | RGBInterface

export type RGBArray = [red: number, green: number, blue: number]

export interface RGBInterface {
  red: number
  green: number
  blue: number
}
