import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";

import { drizzleDb } from "../../db/drizzle";
//import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { desc } from "drizzle-orm";
import { logColor } from "@/utils/log-color";
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_WAIT_IN_MS } from "@/lib/post/constants";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findAllPublic", Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      //orderBy: desc(postsTable.createdAt),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor("findBySlugPublic", Date.now());

    const posts = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!posts) throw new Error("Post não encontrado");

    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor("findAll", Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor("findById", Date.now());

    const posts = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!posts) throw new Error("Id Post não encontrado");

    return posts;
  }
}

(async () => {
  // console.log("aqui");
  const repo = new DrizzlePostRepository();
  //console.log("aqui2");
  //const posts = await repo.findAllPublic();
  //console.log("aqui3");

  //posts.forEach((post) => {
  //console.log("aqui4");
  //console.log(post.slug, post.published);

  //return;
  //});
  const posts = await repo.findById("3993fcf7-2490-48ed-be2e-58c2030ee764");
  console.log(posts);
})();

/*postRepository.findAll().then((posts) => {
  posts.forEach((post) => {
    console.log(post.id);
  });
});*/

/*postRepository
  .findById("76396dd3-9581-43b5-856d-fe1a78714e8c")
  .then((post) => console.log(post));*/
