//SALTOS
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
//MODAL
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const acept = document.getElementById('acept');
//generate number
const generate = document.getElementById('generate');
const reset = document.getElementById('reset');
//verify number
const verify = document.getElementById('verify');
//table
const tbody = document.getElementById('tbody');
//show number
const number = document.getElementById('number');
const message = document.getElementById('message');

//EVENTOS DE ESCUCHA*********************************************************************
//MODAL
window.addEventListener('load', function () {
    modal.style.display = 'block';
});

close.addEventListener('click', function (e) {
    modal.style.display = 'none';
});

acept.addEventListener('click', function () {
    modal.style.display = 'none';
});


//SALTO DE INPUTS
input1.addEventListener('keyup', function () {

    if (this.value.length == this.getAttribute('maxlength') && input1.value.replace(/\s/g, '').replace(/\D/g, '')) {
        input2.focus();
    } else {
        input1.value = input1.value.replace(/\s/g, '').replace(/\D/g, '')
        input1.value = input1.value
        input1.focus()
    }

});

input2.addEventListener('keyup', function () {
    if (this.value.length == this.getAttribute('maxlength') && input2.value.replace(/\s/g, '').replace(/\D/g, '')) {
        input3.focus();
    } else {
        if (input2.value.replace(/\s/g, '')) {
            input2.value = input2.value.replace(/\s/g, '').replace(/\D/g, '')
            input2.value = input2.value
            input2.focus()
        } else {
            if (this.value.length != this.getAttribute('maxlength')) {
                input1.focus();
            }
        }
    }
});

input3.addEventListener('keyup', function () {
    if (this.value.length == this.getAttribute('maxlength') && input3.value.replace(/\s/g, '').replace(/\D/g, '')) {
        input4.focus();
    } else {
        if (input3.value.replace(/\s/g, '')) {
            input3.value = input3.value.replace(/\s/g, '').replace(/\D/g, '')
            input3.value = input3.value
            input3.focus()
        } else {
            if (this.value.length != this.getAttribute('maxlength')) {
                input2.focus();
            }
        }
    }
});

input4.addEventListener('keyup', function () {
    if (this.value.length != this.getAttribute('maxlength')) {
        input3.focus();
    }else {
        input4.value = input4.value.replace(/\s/g, '').replace(/\D/g, '')
        input4.value = input4.value
        input4.focus()
    }
});

//GENERATE NUMBERS
generate.addEventListener('click', numbers);
reset.addEventListener('click', resetAll);

//VERIFY NUMBER
verify.addEventListener('click', verifyNumber);

//FUNCIONES*************************************************************************


//FUNCIONES DE GENERAR NUMEROS
let array = [];

function number1(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function number2() {
    return Math.floor(Math.random() * 9);
}

function number3() {
    return Math.floor(Math.random() * 9);
}

function number4() {
    return Math.floor(Math.random() * 9);
}

function numbers() {
    array.push(number1(1, 9), number2(), number3(), number4());
    number.style.background = '#000'
    number.innerHTML = `
        <span>${array[0]}</span>
        <span>${array[1]}</span>
        <span>${array[2]}</span>
        <span>${array[3]}</span>
        `
    console.log(array)
}


let intentos = 1;
let acertados = 0;
let colocados = 0;

//Verify number function
function verifyNumber(e) {
    e.preventDefault();
    //verificacion de campos vacios
    if (input1.value == '' || input2.value == '' || input3.value == '' || input4.value == '') {
        alert('Porfavor rellene los campos')
    } else {
        //variables del valor de cada input
        let int_uno = input1.value;
        let int_dos = input2.value;
        let int_tres = input3.value;
        let int_four = input4.value;
        //variables de inclusion y conversion a string
        let includeInpt_1 = array.toString().includes(int_uno);
        let includeInpt_2 = array.toString().includes(int_dos);
        let includeInpt_3 = array.toString().includes(int_tres);
        let includeInpt_4 = array.toString().includes(int_four);
        if (intentos == 5) {
            message.innerHTML = 'Lo sentimos, no acertaste, este era el numero'
            number.style.background = 'transparent';
            gameOver();
        }
        if (int_uno == array[0] && int_dos == array[1] && int_tres == array[2] && int_four == array[3]) {
            acertados = array.length;
            colocados = array.length;
            number.style.background = 'transparent';
            message.innerHTML = 'Felicidades acertaste';
            gameOver();
        } else {
            if (!includeInpt_1 && includeInpt_2 && includeInpt_3 && includeInpt_4) {
                acertados = 0;
                colocados = 0;
            }
            //CONDICIONES DE SI HAY DOS ACERTADOS O DOS ACERTADOS Y DOS COLOCADOS
            if (includeInpt_1 || includeInpt_2 || includeInpt_3 || includeInpt_4) {
                acertados = 1;
                colocados = 0;
                if (int_uno == array[0] || int_dos == array[1] || int_tres == array[2] || int_four == array[3]) {
                    acertados = 1;
                    colocados = 1;
                }
            }
            if (includeInpt_1 && includeInpt_2 || includeInpt_3 && includeInpt_4) {
                acertados = 2;
                colocados = 0;
            }
            if (int_uno == array[0] && int_dos == array[1] && int_tres != array[2] && int_four != array[3]) {
                acertados = 2;
                colocados = 2;
            } else {
                if (int_uno != array[0] && int_dos != array[1] && int_tres == array[2] && int_four == array[3]) {
                    acertados = 2;
                    colocados = 2;
                } else {
                    if (int_uno == array[0] && int_dos != array[1] && int_tres != array[2] && int_four == array[3]) {
                        acertados = 2;
                        colocados = 2;
                    } else {
                        if (int_uno != array[0] && int_dos == array[1] && int_tres == array[2] && int_four != array[3] || int_uno != array[0] && int_dos == array[1] && int_tres != array[2] && int_four == array[3]) {
                            acertados = 2;
                            colocados = 2;
                        } else {
                            if (int_uno == array[0] && int_dos != array[1] && int_tres == array[2] && int_four != array[3]) {
                                acertados = 2;
                                colocados = 2;
                            }
                        }
                    }
                }
            }
            //CONDICION SI HAY CUATRO ACERTADOS Y DOS COLOCDOS
            if (includeInpt_1 && includeInpt_2 && includeInpt_3 && includeInpt_4) {
                acertados = array.length;
                colocados = 0;
                if (int_uno == array[0] && includeInpt_2 && includeInpt_3 && includeInpt_4) {
                    acertados = array.length;
                    colocados = 1;
                }
                if (includeInpt_1 && int_dos == array[1] && includeInpt_3 && includeInpt_4) {
                    acertados = array.length;
                    colocados = 1;
                }
                if (includeInpt_1 && includeInpt_2 && int_tres == array[2] && includeInpt_4) {
                    acertados = array.length;
                    colocados = 1;
                }
                if (includeInpt_1 && includeInpt_2 && includeInpt_3 && int_four == array[3]) {
                    acertados = array.length;
                    colocados = 1;
                }
                if (includeInpt_1 && includeInpt_2 && int_tres == array[2] && int_four == array[3] || int_uno == array[0] && int_dos == array[1] && includeInpt_3 && includeInpt_4) {
                    acertados = array.length;
                    colocados = 2;
                }
                if (includeInpt_1 && int_dos == array[1] && int_tres == array[2] && includeInpt_4 || int_uno == array[0] && includeInpt_2 && includeInpt_3 && int_four == array[3]) {
                    acertados = array.length;
                    colocados = 2;
                }
                if (int_uno == array[0] && includeInpt_2 && int_tres == array[2] && includeInpt_4 || includeInpt_1 && int_dos == array[1] && includeInpt_3 && int_four == array[3]) {
                    acertados = array.length;
                    colocados = 2;
                }
            } else {
                //CONDICIONES SI HAY TRES ACERTADAS O TRES ACERTADAS Y TRES COLOCADAS
                if (includeInpt_1 && includeInpt_2 && includeInpt_3 || includeInpt_2 && includeInpt_3 && includeInpt_4 || includeInpt_1 && includeInpt_2 && includeInpt_4 || includeInpt_1 && includeInpt_3 && includeInpt_4) {
                    acertados = 3;
                    colocados = 0;
                }
                if (int_uno == array[0] && int_dos == array[1] && int_tres == array[2] && int_four != array[3]) {
                    acertados = 3;
                    colocados = 3;
                } else {
                    if (int_uno == array[0] && int_dos == array[1] && int_tres != array[2] && int_four == array[3]) {
                        acertados = 3;
                        colocados = 3;
                    } else {
                        if (int_uno == array[0] && int_dos != array[1] && int_tres == array[2] && int_four == array[3]) {
                            acertados = 3;
                            colocados = 3;
                        } else {
                            if (int_uno != array[0] && int_dos == array[1] && int_tres == array[2] && int_four == array[3]) {
                                acertados = 3;
                                colocados = 3;
                            }
                        }
                    }
                }
            }
        }

        const Table = document.createElement('tr');
        Table.innerHTML = `
                    <td>${intentos++}</td>
                    <td><span>${input1.value}</span><span>${input2.value}</span><span>${input3.value}</span><span>${input4.value}</span></td>
                    <td>${acertados}</td>
                    <td>${colocados}</td>
        `
        tbody.appendChild(Table);
        //clear inputs
        input1.value = '';
        input2.value = '';
        input3.value = '';
        input4.value = '';
        input1.focus();
    }
}

function gameOver() {
    input1.disabled = true;
    input2.disabled = true;
    input3.disabled = true;
    input4.disabled = true;
    verify.disabled = true;
}

//restart function
function resetAll() {
    array = [];
    intentos = 1;
    tbody.innerHTML = '';
    number.innerHTML = '';
    number.innerHTML = '';
    message.innerHTML = '';
    input1.disabled = false;
    input2.disabled = false;
    input3.disabled = false;
    input4.disabled = false;
    verify.disabled = false;
}