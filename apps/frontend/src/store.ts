import { ref } from 'vue'
import type { UserDto } from '@app/v1/dto/user/UserDto'


export enum FlashType {
  Danger = 'Danger',
  Warning = 'Warning',
  Success = 'Success',
  Info = 'Info',
  Primary = "Primary"
}

export interface Flash {
  color: FlashType | string;
  message: string;
  removeOnNextRedirect: boolean;
}

export interface Meta {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}

export const defaultMeta: Meta = {
  title: "", // defaults to Plurali
  description: "Informative page about your system and it's members you can share with people!",
  imageUrl: "https://plurali.icu/plurali.png",
  color: "#6d28d9",
}

export const meta = ref<Meta>(defaultMeta);

export const flashes = ref<Flash[]>([]);

export const notifications = ref<Omit<Flash, "removeOnNextRedirect">[]>();

export const flash = (message: string = 'An error has occurred, please refresh the site.', typeOrColor: FlashType | string = FlashType.Danger, clear = true, removeOnNextRedirect = true) => {
  const f: Flash = {
    message,
    color: typeOrColor,
    removeOnNextRedirect
  }

  if (clear) {
    flashes.value = [f]
  } else {
    flashes.value.push(f)
  }

  return f
}

export const nextRedirect = () => {
  flashes.value = flashes.value.filter(flash => !flash.removeOnNextRedirect).map(flash => ({
    ...flash,
    removeOnNextRedirect: true
  }))
}

export const clearFlashes = () => (flashes.value = [])

export const background = ref<string | null>(null)

export const goBack = ref<string | null>(null)

export const user = ref<UserDto | null>(null)
