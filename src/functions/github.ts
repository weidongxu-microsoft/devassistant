import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface Response extends HttpResponseInit {
  status: number;
  jsonBody: {
    result: string;
    details: string;
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
      details: "",
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

          const failedChecks = [];
          let details = "";

          const prResponse = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/pulls/" + pullNumber);
          const headSha = (await prResponse.json()).head.sha;

          const checksResponse = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits/" + headSha + "/check-runs?per_page=100");
          const checkRuns = (await checksResponse.json()).check_runs;
          for (const checkRun of checkRuns) {
            if (checkRun.conclusion === "failure" && !checkRun.name.includes("[TEST-IGNORE]")) {
              if (checkRun.name.includes("azure-sdk-for-java")) {
                const javaResponse = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/check-runs/" + checkRun.id);
                const javaCheckRun = await javaResponse.json();
                details = javaCheckRun.output.text.split("\n").filter(it => it.includes("[Java-Sdk-Automation")).map(it => it.replace("cmderr", "").trim()).join("\n");
              }

              failedChecks.push({
                name: checkRun.name,
              });
            }
          }

          res.jsonBody.result = failedChecks.length === 0 ? "Success" : "Failed";
          res.jsonBody.details = details;
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
