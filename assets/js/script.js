/* **Descrizione:**
1. Clccando su “via” il computer genera 5 numeri
2. Vengono mostrati per 5 secondi i numeri generati
3. Una volta inserito il quinto numero viene mostrato per 3 sec: “Calcolo in corso”
4. Vengono mostrati i numeri indovinati e se non ce ne sono viene mostrato “Hai perso, nessun numero indovinato!”
5. Opzionale:
	- alla fine far apparire un bottone “restart”
	- all’inizio fare scegliere all’utente con quanti numeri giocare */

    $(document).ready(function(){

        var selectionNumber = parseInt(prompt('Con quanti numeri vuoi giocare?'));
        reset();
        //array dei numeri random generati dal computer
        var arrRandom = [];

        //array dei numeri inseriti dall'utente
        var arrNumber = [];

        //array del risultato dei numeri
        var arrResult = [];


        $('#reset').click(function(){
           location.reload(); 
        });
        $('#btn-start').click(function(){
            $(this).hide();
            $('#reset').hide();
            while(arrRandom.length < selectionNumber){
                arrRandom.push(generatorRandomNumber(1,100));
            }
            console.log(arrRandom);

            printOutput(arrRandom.toString(),'#display');

            setTimeout(function(){
                printOutput('indovina i 5 numeri', '#display');
                $('#btn-box').show();
            },5000);


        });

        $('#btn').click(function(){
            var number = $('#input').val();
            if( arrNumber.includes(parseInt(number))){
                alert('ATTENZIONE!...Numero già inserito, inseriscine un nuovo');
                $('#input').val('');
            }else{
                //var number = $('#input').val();
                arrNumber.push(parseInt(number));
                $('#input').val('');
            }

            // numeri non devono essere ugiuli dentro l'arrey ( fatto)
            // dobbiamo dare un limite di push
            // arrNumber deve avere gli stessi elementi dell'arry random
            if(arrNumber.length === arrRandom.length){
                printOutput('Calcolo in corso','#display');
                $('#btn-box').hide();
                setTimeout(function(){

                    for(var i=0; i < arrRandom.length; i++){
                       var singleNumber =  arrRandom[i];

                       if( arrNumber.includes(singleNumber)){
                           arrResult.push(singleNumber);
                           printOutput('Hai indovinato questi numeri: ' + arrResult, '#display');
                           
                       }else{
                           printOutput('HAI PERSO! Non hai indovinato nessun numero','#display');
                       }
                    }

                },3000);
                $('#reset').show();
                
                
            }
            

        });




    })


    //FUNZIONI 

    function printOutput (text, target){
        $(target).text(text);
    };

    function generatorRandomNumber(min, max){
        return Math.floor(Math.random()*(max - min + 1)+ min );
    };

    function reset(){
        printOutput('Pronto..Clicca VIA', '#display');
        $('#btn-start').show();
        $('#btn-box').hide();

    }