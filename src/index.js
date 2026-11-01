export default {
  async fetch(request) {
    const url = new URL(request.url);
    const broken = url.searchParams.get("broken") === "1";
    const result = broken ? "broken" : "fixed";
    const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Devbox QA fixture</title></head>
  <body>
    <h1>Devbox QA fixture</h1>
    <button id="go">Run</button>
    <p id="out">idle</p>
    <script>
      document.getElementById("go").addEventListener("click", function () {
        document.getElementById("out").textContent = "${result}";
        if (${broken ? "true" : "false"}) console.error("seeded failure");
      });
    </script>
  </body>
</html>`;
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
