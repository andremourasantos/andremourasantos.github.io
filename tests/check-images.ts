import { dir } from "node:console";
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const postsPath = './src/posts';
const imagesPath = './src/assets/photos/posts';

async function getUnusedImages() {
  const getImagesName = await readdir(imagesPath);
  let usedImages = new Set();

  async function searchForImportedImagesInPosts(dir:any) {
    const posts = await readdir(dir, { withFileTypes: true });

    for (const file of posts){
      const path = join(dir, file.name);

      if(file.isDirectory()) {
        await searchForImportedImagesInPosts(path);
      } else if (file.name.endsWith('.md')) {
        const regex = /!\[.*?\]\(([^)\s]+)\)/g
        const content = await readFile(path, 'utf-8');
        const matches = [...content.matchAll(regex)];
        const imagesName = matches.map(matche => matche[1].split('/').pop());

        if(imagesName){
          imagesName.forEach(match => {
            usedImages.add(match);
          })
        }
      }
    }
  }

  async function searchForCoverImagesInPosts(dir:any) {
    const posts = await readdir(dir, { withFileTypes: true });

    for (const file of posts){
      const path = join(dir, file.name);

      if(file.isDirectory()) {
        await searchForCoverImagesInPosts(path);
      } else if (file.name.endsWith('.md')) {
        const regex = /imageName:\s*"([^"]+)"/
        const content = await readFile(path, 'utf-8');
        const match = content.match(regex)?.[1];

        if(match) {
          usedImages.add(match + '.jpg');
        }
      }
    }
  }

  await searchForImportedImagesInPosts(postsPath);
  await searchForCoverImagesInPosts(postsPath);

  const unusedImages = getImagesName.filter(file => !usedImages.has(file));

  return unusedImages;
}

getUnusedImages().then((res) => {
  const unusedImages = res;
  if(!unusedImages || unusedImages.length === 0){
    console.log("✅ Todas as imagens salvas estão sendo utilizadas.");
    process.exit(0); // Sucesso - continua o deploy
  } else {
    console.log(`⚠️  Há ${unusedImages.length === 1 ? "1 imagem" : `${unusedImages.length} imagens`} que ${unusedImages.length === 1 ? "pode ser removida" : "podem ser removidas"}!`);
    unusedImages.forEach(item => {
      console.log(item);
    });
    process.exit(1); // Erro - cancela o deploy
  };
}).catch(error => {
  console.error("❌ Erro ao verificar imagens:", error);
  process.exit(1); // Erro - cancela o deploy
});