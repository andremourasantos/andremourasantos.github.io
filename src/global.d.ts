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

  type ProjectInfo = {
    id:string,
    status:null | "Novo",
    group:"Featured" | "Prototype",
    title:string,
    featuredImage:string,
    favicon:string,
    description:string,
    introductionText:string,
    image1:string
    developmentText:string[],
    image2:string,
    conclusionText: string[],
    relatedServices: {
      servicesID: ["Marketing" | "Web",string][]
    },
    footerNotes:string[]
  } | undefined;
}