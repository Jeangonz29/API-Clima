const contenedor =  document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

//openweathermap Proporciona datos meteorologicos atraves de API
//lista de caracteres en html
//spinner: the spinner css loadars
//puedo detectar el bton el click con submit, o click, pero tambien con el load acontinuacion
//load solo se utiliza con window, (window es para detectar el navegador,) DOMcontetLoad con document


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit',buscarClima)
})
function buscarClima(e){
    e.preventDefault() //dio un error, pero ya con esto atacamos el error, OJO
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value
    //console.log(ciudad,pais)

    //Vamos a validar los campos antes de enviarlos
    if(ciudad==='' || pais===''){
        mostrarError('Los campos son obligatorios')
        //este mostrarError ya lo hemos hecho antes
    }else{
        console.log('estan llenos')
        consultarAPI(ciudad,pais)
    }

}
function consultarAPI(ciudad,pais){
    const appid = '317df71a7858d0f8873cb5cd574f911a'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    
spinnerr();

    fetch(url)
    .then(respuesta=>{
       // console.log(respuesta)
         return respuesta.json()
    })
    .then(datos=>{
        //console.log(datos.cod)

        if(datos.cod === '404'){
            mostrarError('La ciudad no se ha encontrado, ingrese una ciudad valida por favor')
        }else{
        mostrarHTML(datos)
        }
    })

    .catch(error=>{
        console.log(error)
    })
}


function mostrarHTML(data){
    console.log(data)
    limpiarHTML()

    //agg los spinner


    const{name,main:{temp,temp_max,temp_min}} = data // esto es para  llamar directo y asi puedo llamar y mostrar directamente
    //console.log(name,temp,temp_max,temp_min)
    

    //convertir a grados celsius
   
    const TA =  Math.round(gradosKelvinC(temp))
    const TMa = Math.round(gradosKelvinC(temp_max))
    const TMm = Math.round(gradosKelvinC(temp_min))



    const nCiudad = document.createElement('p')
    nCiudad.innerHTML = `El clima en: ${name}` 
    nCiudad.classList.add('text-white','text-center','text-3xl') //para agg estilo

    const tempA = document.createElement('p')
    tempA.innerHTML = `${TA}&#186`
    tempA.classList.add('text-white','text-center') //para agg estilo


    const min = document.createElement('p')
    min.innerHTML = `Temp min: ${TMm}&#186`
    min.classList.add('text-white','text-center') //para agg estilo

    
    const max = document.createElement('p')
    max.innerHTML = `Temp max: ${TMa}&#186`
    max.classList.add('text-white','text-center') //para agg estilo


    resultado.appendChild(nCiudad)
    resultado.appendChild(tempA)
    resultado.appendChild(min)
    resultado.appendChild(max)

}

function gradosKelvinC(temperatura){
    return temperatura-273.15 //esto lo puedo retornar directo
}

//esta funcion de mostrar error la podemos reutilizar porque esta global
function mostrarError(mensaje){
    const alertaM = document.querySelector('.bg-red-300')
    //console.log(alerta) 

    if(!alertaM){
        const alertaM = document.createElement('div')
        alertaM.innerHTML = `<strong>${mensaje}</strong>`
        alertaM.classList.add('bg-red-300','text-center','text-red-500','py-3','mt-4','max-w-md','mx-auto')

        contenedor.appendChild(alertaM)

         setTimeout(()=>{
            alertaM.remove();
        },3000)
    }
   
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }

}


function spinnerr(){
    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div> 
    <div class="sk-circle2 sk-circle"></div> 
    <div class="sk-circle3 sk-circle"></div> 
    <div class="sk-circle4 sk-circle"></div> 
    <div class="sk-circle5 sk-circle"></div> 
    <div class="sk-circle6 sk-circle"></div> 
    <div class="sk-circle7 sk-circle"></div> 
    <div class="sk-circle8 sk-circle"></div> 
    <div class="sk-circle9 sk-circle"></div> 
    <div class="sk-circle10 sk-circle"></div> 
    <div class="sk-circle11 sk-circle"></div> 
    <div class="sk-circle12 sk-circle"></div> 
    
    `
    resultado.appendChild(divSpinner);
}
