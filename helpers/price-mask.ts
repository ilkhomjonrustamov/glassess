export function mask(s: number | string) {
  return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
