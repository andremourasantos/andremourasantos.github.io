export const useKebabConverter = (str:string) => {
  return str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s\/]/g, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s\/]/g, '-')
    .toLowerCase();
}