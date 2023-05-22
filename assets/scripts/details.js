
// // integrando VueJs

let { createApp } = Vue

let app = createApp({
    data() {
        return {
            allEvents: [],
            queryId: null
        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events
                let urlParams = new URLSearchParams(location.search)
                this.queryId = parseInt(urlParams.get('_id'))
            }).catch(error => console.log(error))
    },
    computed: {
        eventoFiltradoPorId(){
            return this.allEvents.filter(event => event._id === this.queryId)
        }
    }
})
app.mount('#app')

// detail dinámico

// let detailContainer = document.querySelector('#detailContainer')

// fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
//     .then(response => response.json())
//     .then(data => {
//         let datosDeAPI = data
//         let parametrosDelSearch = new URLSearchParams(location.search)
//         let getId = parametrosDelSearch.get(`_id`)
//         let buscarIdOfEvent = datosDeAPI.events.find(id => id._id == getId)
//         document.title = `Details of ${buscarIdOfEvent.name}`
//         detailContainer.innerHTML = `<div>
//                                         <img class="imgdetail object-fit-cover" src=${buscarIdOfEvent.image} alt="books de prueba">
//                                         </div>
//                                         <div class="txtdetail d-flex justify-content-center align-items-center flex-column">
//                                         <h5 class="mb-5">${buscarIdOfEvent.name}</h5>
//                                         <p><span class="text-success">${buscarIdOfEvent.description}</span></p>
//                                         <p><span class="text-success">Date:</span> ${buscarIdOfEvent.date}</p>
//                                         <p><span class="text-success">Place:</span> ${buscarIdOfEvent.place}</p>
//                                         <p><span class="text-success">Max</span> capacity: ${buscarIdOfEvent.capacity}</p>
//                                         <p><span class="text-success"></span> ${buscarIdOfEvent.assistance ? 'Assistance: ' + buscarIdOfEvent.assistance.toLocaleString() + ' people' : 'Estimate: ' + buscarIdOfEvent.estimate.toLocaleString() + ' people'}</p>
//                                         <p><span class="text-success">Entry Price </span> ${buscarIdOfEvent.price} USD</p>
//                                     </div>`
//     })
//     .catch(error => console.log(error))