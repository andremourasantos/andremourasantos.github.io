export {}

declare global {
  type ServiceInfo = {
    id:string,
    show:boolean,
    status:null | "Novo" | "Indisponível",
    group:"Individual" | "Combo",
    title:string,
    image:string,
    description:string,
    introduction:string[],
    tableOfBenefits:[string,string,boolean][],
    serviceInfo: {
      deadline:[string,string,number],
      price:[string,string,number]
    },
    footerNotes:string[]
  } | undefined;
}