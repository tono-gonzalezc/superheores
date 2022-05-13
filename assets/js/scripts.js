$(document).ready(function(){
    console.log("probando");
    $('#formHeroe').submit(function(event){
        event.preventDefault();
        console.log('funciona submit');
        $('#mensajeHeroe').text('cargando...');
        let idHeroe = $('#txtSuperheroe').val();

        //validacion que solo ingrese numeros
        var validateReg = /[0-9]/gim;
        let validateID = validateReg.test(idHeroe);
        if(!validateID) {
            alert('Favor ingresa sólo números');
        }


        $.ajax({
            type: "GET",
            url: `https://superheroapi.com/api.php/4905856019427443/${idHeroe}`,
            success: function(data){
                $('#mensajeHeroe').text('Superheroe Encontrado');
                console.log(data);
            //Bloque izquierdo con información del super heroe    
                let imagen = data.image.url;
                $('#imagenHeroe').attr("src", `${imagen}`);

                let nombre = data.name;
                $('#nombreHeroe').text(`Nombre: ${nombre}`);

                let conexiones = data['connections']['group-affiliation'];
                $('#conexionesHeroe').text(`Conexiones: ${conexiones}`);

                let publicado = data['biography']['publisher'];
                $('#publicadoHeroe').text(`Publicado por: ${publicado}`);

                let ocupacion = data['work']['occupation'];
                $('#ocupacionHeroe').text(`Ocupacion: ${ocupacion}`);

                let aparicion = data['biography']['first-appearance'];
                $('#primeraAparicion').text(`Primera aparicion: ${aparicion}`);

                let altura = data['appearance']['height'][1];
                $('#altura').text(`Altura: ${altura}`);

                let peso = data['appearance']['weight'][1];
                $('#peso').text(`Peso: ${peso}`);

                let amigos = data.biography.aliases;
                let listadoAmigos = [];

                for (let i of amigos){
                    i=' '+i;
                    listadoAmigos.push(i);
                }
                $('#amigos').text(`Alianzas: ${amigos}`);

            //Creación y obtención de variables para grafico 
                let intelligence = parseInt(data.powerstats.intelligence)
                    if (!intelligence) {
                        intelligence = 0
                    }

                let strength = parseInt(data.powerstats.strength)
                if (!strength) {
                    strength = 0
                }
                    
                let speed = parseInt(data.powerstats.speed)
                    if (!speed) {
                        speed = 0
                }

                let durability = parseInt(data.powerstats.durability)
                if (!durability) {
                    durability = 0
                }
                let power = parseInt(data.powerstats.power)
                if (!power) {
                    power = 0
                }
                
                let combat = parseInt(data.powerstats.combat)
                if (!combat) {
                    combat = 0
                }
            
            // Se crea gráfico con Canvas JS
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de poder para ${nombre}`,
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 13,
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            { y: intelligence, label: "Intelligence" },
                            { y: strength, label: "Strength" },
                            { y: durability, label: "Durability" },
                            { y: power, label: "Power" },
                            { y: combat, label: "Combat" },
                        ]
                    }]
                });
                chart.render();


            }, //fin success
            error: function(data){
                $('#mensajeHeroe').text(`API no encontrada: ${data}`);
            },
            dataType: 'json',
        }); //Fin Ajax

    });//fin submit
});//fin ready

