let base = "https://jeanc4rlo.github.io/";

let pages = [
    "minepedia",
    "kunwana"
];

async function carregarLink(link) {
    try {
        const response = await fetch(link);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        let imagem = doc.querySelector('meta[property="og:image"]');
        let url = doc.querySelector('meta[property="og:url"]');
        let titulo = doc.querySelector('meta[property="og:title"]');
        let descricao = doc.querySelector('meta[property="og:description"]');

        let $artigo = $("<article>");
        let $imagem = $(`<img src=${imagem.getAttribute("content")}>`);

        $imagem.appendTo($artigo);

        let $informacoes = $('<div class="informacoes"></div>');

        let $titulo = $(`<h3>${titulo.getAttribute("content")}</h3>`);
        let $descricao = $(`<p lang="pt-BR">${descricao.getAttribute("content")}</p>`);
        let $url = $(`<a lang="en" href="${url.getAttribute("content")}" target="_blank">Acessar</a>`);

        $titulo.appendTo($informacoes);
        $descricao.appendTo($informacoes);
        $url.appendTo($informacoes);

        $informacoes.appendTo($artigo);
        $artigo.appendTo(".projetos");
    }
    catch(error) {
        console.error("Erro ao tentar carregar meta tags:", error);
        return null;
    }
}

pages.forEach((page) => {
    carregarLink(base + page + "/");
});