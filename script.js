```javascript id="9s0f2r"
/* =========================================
   CHESTERVERSE
   SISTEMA PRINCIPAL
========================================= */


let chesters = [];


/* =========================================
   ELEMENTOS
========================================= */

const gallery =
    document.getElementById(
        "chester-gallery"
    );

const search =
    document.getElementById(
        "search"
    );

const noResults =
    document.getElementById(
        "no-results"
    );

const universeFilter =
    document.getElementById(
        "universe-filter"
    );

const rarityFilter =
    document.getElementById(
        "rarity-filter"
    );

const statusFilter =
    document.getElementById(
        "status-filter"
    );


/* =========================================
   CARGAR BASE DE DATOS
========================================= */

async function cargarChesters() {

    try {

        const respuesta =
            await fetch(
                "datos/chesters.json"
            );


        chesters =
            await respuesta.json();


        crearFiltros();

        mostrarChesters(
            chesters
        );


    } catch (error) {

        console.error(
            "Error cargando Chesters:",
            error
        );

    }

}


/* =========================================
   CREAR FILTROS
========================================= */

function crearFiltros() {

    if (!universeFilter) {
        return;
    }


    const universos =
        [
            ...new Set(
                chesters.map(
                    chester =>
                        chester.universe
                )
            )
        ];


    const rarezas =
        [
            ...new Set(
                chesters.map(
                    chester =>
                        chester.rarity
                )
            )
        ];


    universos.forEach(
        universo => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                universo;


            option.textContent =
                universo;


            universeFilter.appendChild(
                option
            );

        }
    );


    rarezas.forEach(
        rareza => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                rareza;


            option.textContent =
                rareza;


            rarityFilter.appendChild(
                option
            );

        }
    );

}


/* =========================================
   MOSTRAR CHESTERS
========================================= */

function mostrarChesters(
    lista
) {

    if (!gallery) {
        return;
    }


    gallery.innerHTML =
        "";


    if (
        lista.length === 0
    ) {

        noResults.style.display =
            "block";

        return;

    }


    noResults.style.display =
        "none";


    lista.forEach(
        chester => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "chester-card";


            card.innerHTML = `

                <div class="image-container">

                    <img
                        class="chester-image"
                        src="${chester.image}"
                        alt="${chester.name}"
                        loading="lazy"
                    >

                    <span
                        class="status-badge
                        ${chester.status
                            .toLowerCase()
                            .replace("ó","o")}"
                    >
                        ${chester.status}
                    </span>

                </div>


                <div class="chester-info">

                    <span class="chester-id">

                        ${chester.id}

                    </span>


                    <h3>

                        ${chester.name}

                    </h3>


                    <div class="chester-tags">

                        <span>

                            🌌
                            ${chester.universe}

                        </span>


                        <span>

                            ⭐
                            ${chester.rarity}

                        </span>

                    </div>


                    <p>

                        ${chester.description}

                    </p>


                    <a
                        class="details-button"
                        href="chester.html?id=${chester.id}"
                    >

                        Ver ficha →

                    </a>

                </div>

            `;


            gallery.appendChild(
                card
            );

        }
    );

}


/* =========================================
   FILTRAR
========================================= */

function filtrar() {

    const texto =
        search
            ? search.value
                .toLowerCase()
                .trim()
            : "";


    const universo =
        universeFilter
            ? universeFilter.value
            : "";


    const rareza =
        rarityFilter
            ? rarityFilter.value
            : "";


    const estado =
        statusFilter
            ? statusFilter.value
            : "";


    const resultados =
        chesters.filter(
            chester => {

                const coincideTexto =

                    chester.name
                        .toLowerCase()
                        .includes(
                            texto
                        )

                    ||

                    chester.description
                        .toLowerCase()
                        .includes(
                            texto
                        )

                    ||

                    chester.id
                        .toLowerCase()
                        .includes(
                            texto
                        );


                const coincideUniverso =

                    !universo

                    ||

                    chester.universe
                        === universo;


                const coincideRareza =

                    !rareza

                    ||

                    chester.rarity
                        === rareza;


                const coincideEstado =

                    !estado

                    ||

                    chester.status
                        === estado;


                return (

                    coincideTexto

                    &&

                    coincideUniverso

                    &&

                    coincideRareza

                    &&

                    coincideEstado

                );

            }
        );


    mostrarChesters(
        resultados
    );

}


/* =========================================
   EVENTOS DE FILTROS
========================================= */

if (search) {

    search.addEventListener(
        "input",
        filtrar
    );

}


if (universeFilter) {

    universeFilter.addEventListener(
        "change",
        filtrar
    );

}


if (rarityFilter) {

    rarityFilter.addEventListener(
        "change",
        filtrar
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filtrar
    );

}


/* =========================================
   NAVEGACIÓN
========================================= */

function mostrarSeccion(
    nombre
) {

    document
        .querySelectorAll(
            ".section"
        )
        .forEach(
            section => {

                section.classList
                    .remove(
                        "active"
                    );

            }
        );


    const destino =
        document.getElementById(
            nombre
        );


    if (destino) {

        destino.classList
            .add(
                "active"
            );

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }

}


/* =========================================
   BOTONES
========================================= */

document
    .querySelectorAll(
        "[data-section]"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    mostrarSeccion(
                        boton.dataset.section
                    );

                }
            );

        }
    );


/* =========================================
   INICIO
========================================= */

cargarChesters();
```
