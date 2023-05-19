
// // intento v.1

// // // variables

// let mainTable = document.querySelector(`#primeraTabla`)
// let mainTable2 = document.querySelector(`#segundaTabla`)
// let mainTable3 = document.querySelector(`#terceraTabla`)
// let eventhigCapUltimos

// // fetch Api: https://mindhub-xj03.onrender.com/api/amazing

// fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
//     .then(response => response.json())
//     .then(data => {
//         datosDeAPI = data
        
//         //  // datos
//         let foodEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Food`))
//         let museumEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Museum`))
//         let concertEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Concert`))
//         let raceEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Race`))
//         let bookEvents = datosDeAPI.events.filter(dato => dato.category.includes(`Books`))
//         let cinemaEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Cinema`))
//         let partyEvent = datosDeAPI.events.filter(dato => dato.category.includes(`Party`))

//         // // no se como seguir, a lo que salga, lo que me depare la vida lol
        
//         // // categorías filtradas e impresiones
//         let arrayFiltrado = datosDeAPI.events.map(item => item.category)
//         let categFiltradas = [...new Set(arrayFiltrado)]

//         // // Sacando los eventos con más capacidad
//         let eventHigCap = datosDeAPI.events.sort((a, b) => a.capacity - b.capacity).splice(32, 37).reverse().map(item => item.name)
//         console.log(eventHigCap)
        
//         printCard1(eventHigCap, mainTable)
//         printCard2(categFiltradas, mainTable2)
//         printCard3(categFiltradas, mainTable3)
//     })
//     .catch(error => console.log(error))


// function templateTable1(dato){
//     return  `<tr>
//                 <td></td>
//                 <td></td>
//                 <td>${dato}</td>
//             </tr>`
// }

// function templateTable2(dato){
//     return  `<tr>
//                 <td>${dato}</td>
//                 <td></td>
//                 <td></td>
//             </tr>`
// }

// function templateTable3(dato){
//     return  `<tr>
//                 <td>${dato}</td>
//                 <td></td>
//                 <td></td>
//             </tr>`
// }

// function printCard1(list, lugarImpresion) {
//     let template = ''
//     for (let info of list) {
//         template += templateTable1(info)
//     }
//     lugarImpresion.innerHTML += template
// }

// function printCard2(list, lugarImpresion) {
//     let template = ''
//     for (let info of list) {
//         template += templateTable2(info)
//     }
//     lugarImpresion.innerHTML += template
// }

// function printCard3(list, lugarImpresion) {
//     let template = ''
//     for (let info of list) {
//         template += templateTable3(info)
//     }
//     lugarImpresion.innerHTML += template
// }

// // intento v.2

// fecth

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(response => response.json())
    .then(data => {
        let datosDeAPI = data.events
        
        function filterDataPast(evento){
            return evento.date < data.currentDate
        }
        let pastEvents = datosDeAPI.filter(filterDataPast)

        function filterDataUpcoming(evento){
            return evento.date > data.currentDate
        }
        let upcomingEvents = datosDeAPI.filter(filterDataUpcoming)

        // // llamado a primeraTabla + funciones primeraTabla que imprimen

        let eventoMasPorc = altoPorcentaje(pastEvents)
        let eventoMenosPorc = bajoPorcentaje(pastEvents)
        let eventoMasCap = masCapacidad(datosDeAPI)
        
        let primeraTabla = document.querySelector(`#primeraTabla`)
        primeraTabla.innerHTML = `
        <tr>
            <td>${eventoMasPorc.name} with ${((eventoMasPorc.assistance * 100) / eventoMasPorc.capacity).toFixed(1)}%</td>
            <td>${eventoMenosPorc.name} with ${((eventoMenosPorc.assistance * 100) / eventoMenosPorc.capacity).toFixed(1)}%</td>
            <td>${eventoMasCap.name} with ${eventoMasCap.capacity.toLocaleString()} of capacity</td>
        </tr>
        `
        // // llamado a segundaTabla + función que imprime

        let segundaTabla = document.querySelector(`#segundaTabla`)
        let datosSegundaTabla = printSegundaTabla(upcomingEvents)

        let template = ``
        for (let i = 0; i < datosSegundaTabla[0].length; i++){
            template += `
            <tr>
                <td>${datosSegundaTabla[0][i]}</td>
                <td>$${datosSegundaTabla[1][i].toLocaleString()}</td>
                <td>${datosSegundaTabla[2][i].toFixed(2)}%</td>
            </tr>
            `
        }
        segundaTabla.innerHTML = template

        // // llamado a terceraTabla + función que imprime

        let terceraTabla = document.querySelector(`#terceraTabla`)
        let datosTerceraTabla = printTerceraTabla(pastEvents)

        let template2 = ``
        for (let i = 0; i < datosTerceraTabla[0].length; i++){
            template2 += `
            <tr>
                <td>${datosTerceraTabla[0][i]}</td>
                <td>$${datosTerceraTabla[1][i].toLocaleString()}</td>
                <td>${datosTerceraTabla[2][i].toFixed(2)}%</td>
            </tr>
            `
        }
        terceraTabla.innerHTML = template2

    }).catch(error => console.log(error))

// // funciones para primeraTabla

function altoPorcentaje (eventos){
    let alto = 0
    let masAlto
    for (let evento of eventos){
        let attendance = (evento.assistance*100/evento.capacity)
        if (attendance > alto){
            alto = attendance
            masAlto = evento
        }
        console.log(attendance)
    }
    return masAlto
}

function bajoPorcentaje (eventos){
    let bajo = 0
    let masBajo
    for (let evento of eventos){
        let attendance = (evento.assistance*100/evento.capacity)
        if (bajo === 0 || attendance < bajo){
            bajo = attendance
            masBajo = evento
        }
    }
    return masBajo
}

// function bajoPorcentaje(eventos) {
//     let bajo = 0;
//     let masBajo;
//     let i = 0;
//     do {
//         let evento = eventos[i];
//         let attendance = (evento.assistance * 100 / evento.capacity);
//         if (bajo === 0 || attendance < bajo) {
//             bajo = attendance;
//             masBajo = evento;
//         }
//         i++;
//     } while (i < eventos.length);
//     return masBajo;
// }

function masCapacidad (eventos){
    let masCap = 0
    let eventMasCap
    for (let evento of eventos){
        if(evento.capacity > masCap){
            masCap = evento.capacity
            eventMasCap = evento
        }
    }
    return eventMasCap
}

// // funcion para segundaTabla

function printSegundaTabla(eventos){
    let datosCompletos = []

    let upCategories = Array.from(new Set(eventos.map(evento => evento.category)))

    let upRevenue = []
    for (let category of upCategories){
        let upContador = 0
        for (let evento of eventos){
            if(evento.category == category){
                upContador += evento.estimate * evento.price
            }
        }
        upRevenue.push(upContador)
    }

    let porcenDeAsis = []
    for (let category of upCategories){
        let estimado = 0
        let capacidad = 0
        for(let evento of eventos){
            if(evento.category === category){
                estimado += evento.estimate
                capacidad += evento.capacity
            }
        }
        porcenDeAsis.push(estimado*100/capacidad)
    }

    datosCompletos.push(upCategories, upRevenue, porcenDeAsis)
    return datosCompletos
}

// // funcion tablaTres

function printTerceraTabla(eventos){
    let datosCompletos2 = []

    let psCategories = Array.from(new Set(eventos.map(evento => evento.category)))

    let psRevenue2 = []
    for (let category of psCategories){
        let psContador2 = 0
        for (let evento of eventos){
            if(evento.category == category){
                psContador2 += evento.assistance * evento.price
            }
        }
        psRevenue2.push(psContador2)
    }

    let porcenDeAsis2 = []
    for (let category of psCategories){
        let estimado = 0
        let capacidad = 0
        for(let evento of eventos){
            if(evento.category === category){
                estimado += evento.assistance
                capacidad += evento.capacity
            }
        }
        porcenDeAsis2.push(estimado*100/capacidad)
    }
    datosCompletos2.push(psCategories, psRevenue2, porcenDeAsis2)
    return datosCompletos2
}