import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
  //const jsonPostRepository = new JsonPostRepository();
  //const posts = await jsonPostRepository.findAllPublic();

  const posts = await drizzleDb.select().from(postsTable);
  console.log(posts);

  //await drizzleDb.delete(postsTable);
  //await drizzleDb.insert(postsTable).values(posts);

  //posts.forEach((post) => console.log(post.id));
})();
