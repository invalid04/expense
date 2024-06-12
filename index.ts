Bun.serve({
    fetch(req) {
        return new Response("hello from bun server");
    },
});

console.log("server running");