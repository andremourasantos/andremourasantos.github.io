export {}

declare global {
  type ServiceInfo = {
    id:string,
    status:null | "Novo" | "Indisponível",
    introduction:string[],
    tableOfBenefits:[string,string,boolean][],
    serviceInfo: {
      deadline:[string,string,number][],
      price:[string,string,number][]
    },
    footerNotes:string[]
  } | undefined
}