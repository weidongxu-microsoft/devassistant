import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface PostResponse extends HttpResponseInit {
  status: number;
  jsonBody: TodoItem;
}

interface ListResponse extends HttpResponseInit {
  status: number;
  jsonBody: {
    results: TodoItem[];
  };
}

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const todoList: TodoItem[] = [];

export async function todo(
  req: HttpRequest,
  context: InvocationContext
): Promise<PostResponse | ListResponse> {
  try {
    switch (req.method) {
      case "POST":
        const body = JSON.parse(await req.text());
        const title = body.title;
        const item = {
          id: todoList.length + 1,
          title: title,
          completed: false,
        };
        todoList.push(item);
        return {
          status: 200,
          jsonBody: item,
        };
      
      case "GET":
        return {
          status: 200,
          jsonBody: {
            results: todoList.filter((item) => !item.completed),
          },
        };

      case "PATCH":
        const patchBody = JSON.parse(await req.text());
        const id = patchBody.id;
        const itemToUpdate = todoList.find((item) => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.title = patchBody.title || itemToUpdate.title;
          itemToUpdate.completed = patchBody.completed !== undefined ? patchBody.completed : itemToUpdate.completed;
          return {
            status: 200,
            jsonBody: itemToUpdate,
          };
        } else {
          throw new Error("Item not found");
        }
    }
  } catch (error) {
    throw error;
  }
}

app.http("todo", {
  methods: ["POST", "PATCH", "GET"],
  authLevel: "anonymous",
  route: "todo/",
  handler: todo,
});
