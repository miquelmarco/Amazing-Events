
// // integrando VueJs

let {createApp} = Vue

let app = createApp({
    data(){
        return{
            allEvents: [],
            filCategories: [],
            pastEvents: [],
            upComEvents: [],
            eventoMasPorc: '',
            eventoMenPorc: '',
            eventoMasCapa: '',
            segundaTabla: '',
            terceraTabla: ''
        }
    },
    created(){
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(res => res.json())
            .then(data => {
                this.allEvents = data.events
                this.categories = this.allEvents.map(item => item.category)
                this.filCategories = [...new Set(this.categories)]
                this.pastEvents = this.allEvents.filter(evento => evento.date < data.currentDate)
                this.upComEvents = this.allEvents.filter(evento => evento.date > data.currentDate)

                this.eventoMasPorc = this.altoPorcentaje(this.pastEvents)
                this.eventoMenPorc = this.bajoPorcentaje(this.pastEvents)
                this.eventoMasCapa = this.masCapacidad(this.allEvents)
                this.segundaTabla = this.printSegundaTabla(this.upComEvents)
                this.terceraTabla = this.printTerceraTabla(this.pastEvents)
            }).catch(error => console.log(error))
    },
    methods:{
        // // funciones primera tabla
        altoPorcentaje (eventos){
            let alto = 0
            let masAlto
            for (let evento of eventos){
                let attendance = (evento.assistance*100/evento.capacity)
                if (attendance > alto){
                    alto = attendance
                    masAlto = evento
                }
            }
            return `${masAlto.name} with ${alto.toFixed(1)}%`
        },
        bajoPorcentaje (eventos){
            let bajo = 0
            let masBajo
            for (let evento of eventos){
                    let attendance = (evento.assistance*100/evento.capacity)
                    if (bajo === 0 || attendance < bajo){
                            bajo = attendance
                            masBajo = evento
                }
            }
            return `${masBajo.name} with ${bajo.toFixed(1)}%`
        },
        masCapacidad (eventos){
            let masCap = 0
            let eventMasCap
            for (let evento of eventos){
                if(evento.capacity > masCap){
                    masCap = evento.capacity
                    eventMasCap = evento
                }
            }
            return `${eventMasCap.name} with ${eventMasCap.capacity.toLocaleString()} of capacity`
        },
        // imprimirResultados() {
        //     let eventoMasPorc = this.altoPorcentaje(this.allEvents);
        //     let bajoPorcentaje = this.bajoPorcentaje(this.allEvents);
        //     let eventoMasCap = this.masCapacidad(this.pastEvents);

        //     let template = `
        //         <tr>
        //             <td>${eventoMasPorc.name} with ${((eventoMasPorc.assistance * 100) / eventoMasPorc.capacity).toFixed(1)}%</td>
        //             <td>${bajoPorcentaje.name} with ${((bajoPorcentaje.assistance * 100) / bajoPorcentaje.capacity).toFixed(1)}%</td>
        //             <td>${eventoMasCap.name} with ${eventoMasCap.capacity.toLocaleString()} of capacity</td>
        //         </tr>
        //     `
        //     document.getElementById("primeraTabla").innerHTML = template;
        // },
        // // funciones segunda tabla
        printSegundaTabla(eventos){
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
            
        let template = ``
        for (let i = 0; i < datosCompletos[0].length; i++){
            template += `
            <tr>
            <td>${datosCompletos[0][i]}</td>
            <td>$${datosCompletos[1][i].toLocaleString()}</td>
            <td>${datosCompletos[2][i].toFixed(1)}%</td>
            </tr>
            `
        }
        return template
        },
        printTerceraTabla(eventos){
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
                let asistencia = 0
                let capacidad = 0
                for(let evento of eventos){
                    if(evento.category === category){
                        asistencia += evento.assistance
                        capacidad += evento.capacity
                    }
                }
                porcenDeAsis2.push(asistencia*100/capacidad)
            }
            datosCompletos2.push(psCategories, psRevenue2, porcenDeAsis2)
            
            let template2 = ``
            for (let i = 0; i < datosCompletos2[0].length; i++){
                template2 += `
                <tr>
                <td>${datosCompletos2[0][i]}</td>
                <td>$${datosCompletos2[1][i].toLocaleString()}</td>
                <td>${datosCompletos2[2][i].toFixed(1)}%</td>
                </tr>
                `
            }
            return template2
        }
    }
})
app.mount('#app')