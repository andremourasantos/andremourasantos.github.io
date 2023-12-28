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
    featuredImage:string,
    favicon:string,
    title:string,
    description:string,
    liveDeployURL:string,
    githubRepositoryURL:string | null,
    introductionText:string,
    image1:string
    developmentText:string[],
    image2:string,
    conclusionText: string[],
    relatedServices: {
      servicesID: ["Marketing" | "Web",string][]
    } | null,
    footerNotes:string[]
  } | undefined;
}