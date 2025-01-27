export {}

declare global {
  type ServiceCategory = "marketing" | "web";

  type ServiceInfo = {
    id:string,
    show:boolean,
    status:TypeOfStatuses,
    group:string,
    title:string,
    image:string,
    description:string,
    introduction:string[],
    tableOfBenefits:ServiceTableOfBenefits[],
    serviceInfo: {
      deadline:[string,string,number],
      price:[string,string,number]
    },
    footerNotes:string[]
  } | undefined;

  type ServiceTableOfBenefits = {
    col1: string; col2: string; col3: boolean
  }

  type TypeOfStatuses = null | "Novo" | "Indisponível" | "Ad"

  type ServiceInfoJSON = {
    id:string,
    show:boolean,
    status:TypeOfStatuses,
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

  type TinyServiceInfo = {
    id:string,
    show:boolean,
    status:TypeOfStatuses,
    group:string,
    image:string,
    title:string,
    description:string,
  }

  type TinyServiceInfoMKT = TinyServiceInfo & {
    group: "Combo" | "Individual" | "Ascensão"
  }

  type TinyServiceInfoWEB = TinyServiceInfo & {
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
      servicesID: [ServiceCategory,string][]
    } | null,
    footerNotes:string[]
  } | undefined;

  type RecommendationsCard = {
    id:string,
    order:number,
    source: "LinkedIn" | "Outro",
    author: {
      name:string,
      job:string
    },
    icon: "PhTrophy",
    text:string[]
  };

  type PreferredColorScheme = 'light' | 'dark';
}