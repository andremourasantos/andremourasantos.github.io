export {}

declare global {
  type ServiceInfo = {
    id:string,
    show:boolean,
    status:null | "Novo" | "Indisponível",
    group:string,
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

  type ServiceInfoMKT = ServiceInfo & {
    group: "Combo" | "Individual" | "Ascensão"
  }

  type ServiceInfoWEB = ServiceInfo & {
    group: "Tudo-em-um" | "Individual"
  }

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

  type PresentationCardInfo = {
    type: "Recomendações" | "Desenvolvimento Web" | "Marketing Digital",
    source: "LinkedIn" | "Cliente",
    author: {
      name:string,
      job:string
    } | null,
    icon: "PhTrophy" | "PhStar" | "PhGlobeStand",
    text:string[]
  };
}