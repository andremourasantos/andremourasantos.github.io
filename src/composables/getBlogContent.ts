const getAllKeys = ():string[] => {
  const files = import.meta.glob('../posts/portfolio/*.md', {eager: true});
  const keys = Object.keys(files);

  return keys;
}

export const getFrontmatterFromText = (text:string, keyString?:string):Frontmatter|null => {
  const regex = /title: (.*?)\r?\ndescription: (.*?)\r?\nimage: (.*?)\r?\ndate: (.*?)\r?\ntags: (.*?)\r?\n---/;
  const match = text.match(regex);

  if (!match) {
    return null;
  };

  const title: string | null = match[1];
  const description: string | null = match[2];
  const image: string | null = match[3];
  const date: string | null = match[4];
  const tagsString: string | null = match[5];
  let tags: ArticleTags[] | null = [];
  if (tagsString) {
    tags = tagsString.split(',').map((tag: string) => tag.trim().replace(/'/g, '') as ArticleTags);
  };

  let key:string = '';

  if(keyString){
    key = keyString.replace('.md', '').replace('../posts', '');
  }

  return { title, description, image, date, tags, key };
}

const getArticleFrontmatter = async (keys: string[]): Promise<Frontmatter[]> => {
  return Promise.all(
    keys.map(async (key) => {
      const file = await import(key + '?raw');
      const content = file.default;

      return getFrontmatterFromText(content, key);
    })
  ).then((results) => results.filter((result) => result !== null) as Frontmatter[]);
};

const filterArticlesByTag = (frontmatter:Frontmatter[], tag:ArticleTags) => {
  frontmatter.forEach((bit) => {
    if (bit.tags && bit.tags.includes(tag)) {
      return bit;
    }
    return null;
  })
}

export const getArticlesByTag = async (tag:ArticleTags):Promise<Frontmatter[]> => {
  const keys = getAllKeys();
  const articles = await getArticleFrontmatter(keys);
  filterArticlesByTag(articles, tag);
  return articles.filter((bit) => bit.tags && bit.tags.includes(tag));
}