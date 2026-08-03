```javascript
/* =========================================
   CHESTERVERSE
   PANEL DEL ARCHIVISTA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const generateButton =
    document.getElementById(
        "generate-button"
    );


const copyButton =
    document.getElementById(
        "copy-button"
    );


const downloadButton =
    document.getElementById(
        "download-button"
    );


const jsonOutput =
    document.getElementById(
        "json-output"
    );


const preview =
    document.getElementById(
        "preview"
    );


/* =========================================
   OBTENER DATOS
========================================= */

function obtenerDatos() {

    return {

        id:
            document
                .getElementById(
                    "chester-id"
                )
                .value
                .trim(),


        name:
            document
                .getElementById(
                    "chester-name"
                )
                .value
                .trim(),


        universe:
            document
                .getElementById(
                    "chester-universe"
                )
                .value
                .trim(),


        rarity:
            document
                .getElementById(
                    "chester-rarity"
                )
                .value,


        status:
            document
                .getElementById(
                    "chester-status"
                )
                .value,


        image:
            document
                .getElementById(
                    "chester-image"
                )
                .value
                .trim(),


        description:
            document
                .getElementById(
                    "chester-description"
                )
                .value
                .trim(),


        lore:
            document
                .getElementById(
                    "chester-lore"
                )
                .value
                .trim(),


        date:
            document
                .getElementById(
                    "chester-date"
                )
                .value

    };

}


/* =========================================
   GENERAR
========================================= */

generateButton.addEventListener(
    "click",
    function() {


        const chester =
            obtenerDatos();


        if (
            !chester.id
            ||
            !chester.name
            ||
            !chester.universe
            ||
            !chester.image
            ||
            !chester.description
        ) {

            alert(
                "Por favor, completá todos los campos obligatorios."
            );

            return;

        }


        /* =========================
           JSON
        ========================== */


        jsonOutput.value =
            JSON.stringify(
                chester,
                null,
                4
            );


        /* =========================
           PREVISUALIZACIÓN
        ========================== */


        preview.innerHTML = `

            <div class="preview-image-container">

                <img
                    src="${chester.image}"
                    alt="${chester.name}"
                    class="preview-image"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="preview-content">

                <span class="chester-id">

                    ${chester.id}

                </span>


                <span class="status-badge">

                    ${chester.status}

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


                <hr>


                <p>

                    ${chester.lore}

                </p>

            </div>

        `;


    }
);


/* =========================================
   COPIAR
========================================= */

copyButton.addEventListener(
    "click",
    async function() {


        if (
            !jsonOutput.value
        ) {

            alert(
                "Primero generá un Chester."
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(
                jsonOutput.value
            );


            copyButton.textContent =
                "✅ Copiado";


            setTimeout(
                function() {

                    copyButton.textContent =
                        "📋 Copiar JSON";

                },
                2000
            );


        } catch (error) {

            jsonOutput.select();

            document.execCommand(
                "copy"
            );

            alert(
                "JSON copiado."
            );

        }

    }
);


/* =========================================
   DESCARGAR
========================================= */

downloadButton.addEventListener(
    "click",
    function() {


        if (
            !jsonOutput.value
        ) {

            alert(
                "Primero generá un Chester."
            );

            return;

        }


        const blob =
            new Blob(
                [
                    jsonOutput.value
                ],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "chester.json";


        link.click();


        URL.revokeObjectURL(
            url
        );

    }
);
```
