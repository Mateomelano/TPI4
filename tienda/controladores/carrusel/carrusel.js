const htmlCarrusel =
`

    <section id="hero">
        <h2>WearUs.</h2>
    </section>

` 

export async function Carrusel(){
    let d = document
    let seccionCarrusel = d.querySelector(".carrusel");
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";
    seccionCarrusel.innerHTML = htmlCarrusel;
}