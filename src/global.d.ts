export {}

declare global {
  type IconName = 'ChevronDown' | 'ExternalLink' | 'Link' | 'Menu' | 'WhatsApp' | 'Facebook' | 'LinkedIn' | 'Twitter';

  type Frontmatter = {title:string, description:string, image:string, date:string, tags:ArticleTags[], key:string};

  type ArticleTags = 'programming' | 'design' | 'automation' | 'work' | null;
}