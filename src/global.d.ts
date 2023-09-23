export {}

declare global {
  type ServiceInfo = {
    id:string,
    status: string,
    serviceIntroduction:string,
    tableOfBenefits:[string, boolean][],
    serviceInfo: {
      deadline:number,
      price:number
    },
    footerNotes:string[]
  }
}