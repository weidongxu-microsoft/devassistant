import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface Response extends HttpResponseInit {
  status: number;
  jsonBody: {
    result: string;
  };
}

export async function githubPullRequest(
  req: HttpRequest,
  context: InvocationContext
): Promise<Response> {
  // Initialize response.
  const res: Response = {
    status: 200,
    jsonBody: {
      result: "",
    },
  };

  try {
    switch (req.method) {
      case "POST":
        const body = JSON.parse(await req.text());
        const url = body.url;

        const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;
        const match = url.match(regex);
        if (match) {
          const owner = match[1];
          const repo = match[2];
          const pullNumber = match[3];

          const result = [];

          const prResponse = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + pullNumber);
          const headSha = (await prResponse.json()).head.sha;

          const checksResponse = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits/" + headSha + "/check-runs");
          const checkRuns = (await checksResponse.json()).check_runs;
          for (const checkRun of checkRuns) {
            if (checkRun.conclusion === "failure") {
              result.push("Check failed: " + checkRun.name);
            }
          }

          if (result.length === 0) {
            res.jsonBody.result = "All checks passed.";
          } else {
            res.jsonBody.result = result.join("\n");
          }
        }

        break;
    }
  } catch (error) {
    throw error;
  }

  return res;
}

app.http("github_pr", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "github/pr/",
  handler: githubPullRequest,
});
