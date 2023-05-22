
// // trabajando con VueJs

let {createApp} = Vue

let app = createApp({
    data() {
        return {
            allEvents: [],
            categories: [],
            filCategories: [],
            searchInput: '',
            checked: [],
            filtrados: []
        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events
                this.categories = this.allEvents.map(item => item.category)
                this.filCategories = [...new Set(this.categories)]
            }).catch(error => console.log(error))
    },
    computed: {
        filtro() {
            this.filtrados = this.allEvents.filter(evento => evento.name.toLowerCase().includes(this.searchInput.toLowerCase())
            && (this.checked.includes(evento.category) || this.checked.length == 0));
        }
    },
})
app.mount('#app')

// // // variables

// let divGeneral = document.getElementById('cardContainer')
// let checkboxContainer = document.querySelector(`#checkboxContainer`)
// let inputBusqueda = document.querySelector(`#inputBusqueda`)
// let datosDeAPI

// // // fetch Api: https://mindhub-xj03.onrender.com/api/amazing

// fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
//     .then(response => response.json())
//     .then(data => {
//         datosDeAPI = data
//         printCard(datosDeAPI.events, divGeneral)
//         let arrayFiltrado = datosDeAPI.events.map((item) => item.category)
//         let newArrayFiltrado = [...new Set(arrayFiltrado)]
//         printCheckbox(newArrayFiltrado, checkboxContainer)
//     })
//     .catch(error => console.log(error))

// // // eventos de escucha

// inputBusqueda.addEventListener('input', () => {
//     filtroDoble()
// })

// checkboxContainer.addEventListener('change', () => {
//     filtroDoble()
// })

// // // plantillas para imprimir

// function plantillaCard(obj) {
//     return `<div class="card mt-3 mb-3" style="width: 18rem;">
//     <img src=${obj.image} class="card-img-top p-4" alt="food fair">
//     <div class="card-body">
//     <h5 class="card-title">${obj.name}</h5>
//     <p class="cardp card-text">${obj.description}</p>
//     <h6>Price: ${obj.price}</h6>
//     <a href="./pages/details.html?_id=${obj._id}" class="btn btn-primary btn2">See More...</a>
//     </div>
//     </div> `
// }

// function printCard(list, lugarImpresion) {
//     let template = ''
//     if (list == 0) {
//         template = `Without results, not your lucky day!`
//     }
//     for (let info of list) {
//         template += plantillaCard(info)
//     }
//     lugarImpresion.innerHTML = template
// }

// // // funciones de impresion

// function plantillaCheckbox(check) {
//     return `<div id='checkboxUnit' class="d-flex justify-content-center align-items-center">
//                 <input class="ms-1" type="checkbox" id='${check}' value='${check}'>
//                 <label for='${check}'>${check}</label>
//             </div>`
// }

// function printCheckbox(lista, checkboxContainer) {
//     let template = ``
//     for (let check of lista) {
//         template += plantillaCheckbox(check)
//     }
//     checkboxContainer.innerHTML = template
// }

// // // funciones de filtrado

// function filtrarSearch(array, input) {
//     let filtroSearch = array.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
//     return filtroSearch
// }

// function filtrarInput(eventos, category) {

//     return eventos.filter(evento => (category.includes(evento.category )|| category.length == 0) && evento.name.toLowerCase().includes(input.toLowerCase()))
// }

// // // // filtro doble

// function filtroDoble() {
//     let checkeados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.value)
//     let filtroSearch = filtrarSearch(datosDeAPI.events, inputBusqueda.value)
//     let filtroInput = filtrarInput(filtroSearch, checkeados)

//     printCard(filtroInput, divGeneral)
// }