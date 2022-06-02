import { DataSource } from "apollo-datasource";
import { QueryBookArgs } from "./generated/graphql";

// This is a (simple) data source which can be used for retrieving
// the sample collection of books. This dataSource is injected
// into the context of the apollo server, which makes it usable
// inside the resolvers.
export class BooksProvider extends DataSource {
  public async getBook(args: QueryBookArgs) {
    return books[args.id];
  }

  public async getBooks() {
    return books;
  }
}
