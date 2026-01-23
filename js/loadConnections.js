let base = "https://jeanc4rlo.github.io/";

async function loadConnection(obj, template) {
    try {
        let image = obj.id 
            ? `https://github.com/${obj.id}.png` 
            : "";

        let url = obj.url || "#";
        let title = obj.name || "<Sem nome>";
        let description = obj.description || "";

        // Substituir placeholders
        let item = template
            .replace("{{image}}", image)
            .replace("{{title}}", title)
            .replace("{{description}}", description)
            .replace("{{url}}", url);

        const connections = document.querySelector(".connections");
        connections.innerHTML += item;
    }
    catch(error) {
        console.error("Erro ao carregar connection:", error);
        return null;
    }
}

async function loadConnections() {
    try {
        const connectionsReq = await fetch(base + "data/connections.json");
        const json = await connectionsReq.json();

        const templateResponse = await fetch(base + "templates/connections-item");
        const template = await templateResponse.text();

        for (const obj of json) {
            await loadConnection(obj, template);
        }
    }
    catch (error) {
        console.error("Erro ao carregar lista de connections:", error);
    }
}
