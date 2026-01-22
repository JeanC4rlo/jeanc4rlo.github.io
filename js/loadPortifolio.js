let base = "https://jeanc4rlo.github.io/";

let pages = [
    "minepedia",
    "kunwana"
];

async function loadItem(link) {
    try {
        const page = await fetch(link);
        const html = await page.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        let image = doc.querySelector('meta[property="og:image"]')?.content || "";
        let url = doc.querySelector('meta[property="og:url"]')?.content || link;
        let title = doc.querySelector('meta[property="og:title"]')?.content || "Sem título";
        let description = doc.querySelector('meta[property="og:description"]')?.content || "";

        const templateResponse = await fetch(base + "templates/portifolio-item");
        let template = await templateResponse.text();

        // Substituir placeholders
        template = template
            .replace("{{image}}", image)
            .replace("{{title}}", title)
            .replace("{{description}}", description)
            .replace("{{url}}", url);

        const portifolio = document.querySelector(".portifolio");

        portifolio.innerHTML += template;
    }
    catch(error) {
        console.error("Erro ao tentar carregar meta tags:", error);
        return null;
    }
}

function loadPortifolio() {
    pages.forEach(async (page) => {
        await loadItem(base + page + "/");
    });
}
