import * as app from "../app.js"

import { getConfig } from "../tables/config.js"
import ignoredRole from "../tables/ignoredRole.js"
import consideredRole from "../tables/consideredRole.js"

export type ResolvableColor = RGB | string | number

export type RGB = RGBArray | RGBInterface

export type RGBArray = [red: number, green: number, blue: number]

export interface RGBInterface {
  red: number
  green: number
  blue: number
}

export const rainbow = [
  "#ED1E24",
  "#F47521",
  "#F8EC24",
  "#69BD45",
  "#6CCCDE",
  "#3953A4",
  "#7B4FA0",
]

export class Color implements RGBInterface {
  blue: number
  green: number
  red: number

  constructor(resolvable: ResolvableColor) {
    const [red, green, blue] = resolveColor(resolvable)

    this.red = red
    this.green = green
    this.blue = blue
  }

  get rgb(): RGBArray {
    return [this.red, this.green, this.blue]
  }

  get hex(): string {
    return rgbToHex(this.rgb)
  }

  /**
   * @param color
   * @param fraction Degrees of fusion from 0 to 1 (0 = no fusion, 1 = replacement)
   */
  fusion(color: Color, fraction: number): Color {
    return new Color(
      this.rgb.map((value, i) => {
        return map(fraction, 0, 1, value, color.rgb[i])
      }) as RGBArray
    )
  }

  toString() {
    return this.hex
  }
}

export function gradient(
  resolvableColors: ResolvableColor[],
  size: number
): Color[] {
  const colors = resolvableColors.map((color) => new Color(color))
  const gradient: Color[] = []
  const section = size / (colors.length - 1)

  for (let i = 0; i < size; i++) {
    if (colors.length > 1) {
      let c = Math.floor(i / section)
      gradient.push(
        colors[c].fusion(colors[c + 1], map(i - c * section, 0, section, 0, 1))
      )
    } else if (colors.length === 1) {
      gradient.push(colors[0])
    }
  }

  return gradient
}

export function resolveColor(color: ResolvableColor): RGBArray {
  if (typeof color === "string") {
    return hexToRgb(color)
  } else if (Array.isArray(color)) {
    return color
  } else if (typeof color === "number") {
    return hexToRgb(String(color).replace("0x", "#"))
  } else {
    return [color.red, color.green, color.blue]
  }
}

export function hexToRgb(hex: string): RGBArray {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) throw new Error("bad given hex")

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ]
}

export function rgbToHex(rgb: RGBArray) {
  return (
    "#" +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  )
}

export function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

export function randomColor() {
  return new Color([
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ])
}

export interface Mode {
  description: string
  effect: (colors: Color[], size: number) => Color[]
}

export const modes: Record<string, Mode> = {
  GRADIENT: {
    description: "Linear gradient",
    effect: (colors, size) => gradient(colors, size),
  },
  REFLECT: {
    description: "Linear gradient + reversed linear gradient from middle",
    effect: (colors, size) =>
      gradient(colors.concat(colors.slice().reverse()), size),
  },
  REPEAT: {
    description: "Repeat colors in loop",
    effect: (colors, size) => {
      const newColors = colors

      while (newColors.length < size) {
        newColors.push(...colors)
      }

      return newColors.slice(0, size)
    },
  },
}

export async function applyColors(guild: app.Guild, hoistOnly = false) {
  if (!guild.me) throw new Error("Guild object is not complete")

  const considered = await consideredRole.query.where({ guild_id: guild.id })
  const ignored = await ignoredRole.query.where({ guild_id: guild.id })

  const config = await getConfig(guild)
  const mode = modes[config.mode]
  const allRoles = (await guild.roles.fetch()).filter(
    (role) =>
      !!guild.me &&
      guild.me.roles.highest.comparePositionTo(role) > 0 &&
      !ignored.some((data) => data.role_id === role.id) &&
      (considered.length === 0 ||
        considered.some((data) => data.role_id === role.id))
  )
  const roles = allRoles.filter((role) => !hoistOnly || role.hoist)

  const colors = mode.effect(
    config.colors.split(",").map((color) => new Color(color)),
    roles.size
  )

  let colorIndex = 0
  for (const [id, role] of allRoles.sort((a, b) => a.comparePositionTo(b))) {
    if (roles.has(id)) {
      // apply color
      await role.setColor(colors[colorIndex].rgb)
      colorIndex++
    } else {
      // remove color
      await role.setColor("DEFAULT")
    }
  }
}

export const applyInProgress: app.Middleware<"guild"> = (message, data) => {
  return {
    result: app.cache.get<boolean>(message.guild.id)
      ? "Update of the colors is already in progress"
      : true,
    data,
  }
}

export function isColor(colorResolvable: ResolvableColor): boolean {
  return true
}
