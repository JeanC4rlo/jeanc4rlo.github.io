function loadParticles(container="particles", config="config/particles.json") {
    particlesJS.load(container, config, () => {
        console.log("Partículas carregadas - particles.js funcional!")
    })
}

function getParticleConfig() {
    if(window.innerWidth <= 860)
        return "config/particles-mobile.json";
    else
        return "config/particles.json";
}

$(window).on("load resize", () => {
    loadParticles("particles", getParticleConfig());
})
