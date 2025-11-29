let code

const codeGenerator = () => {
    let seed = (1664525 * Date.now() + 1013904223) % (2 ** 32);
    let number
    if(Array.isArray(code)) {
        for (let i=0;i<4;i+=1) {
            number = Math.floor((seed / (2 ** 32)) * 10);
            code.push(number)
            seed = (1664525 * seed + 1013904223) % (2 ** 32);
        }     
    }
    writeNumber(code)
}

const writeNumber = (code) => {
    let string = ""
    if(Array.isArray(code)) {
        code.forEach((value) => {
            string+=" " + value+" "
        })
    }
    document.getElementById("code").innerHTML = string
}

const strToDigit = (string) => {
    let digits = new Array()
    for (let i=0; i<string.length; i+=1) {
        digits.push(parseInt(string[i],10))
    }
    return digits
}

const checkCode = (event) => {
    event.preventDefault()
    const form = document.getElementById("codeForm")
    const formData = new FormData(form);
    const inputtedCode = formData.getAll("codeInput")[0]
    const pattern = /^\d+$/
    if (pattern.test(inputtedCode)) {
        const digits = strToDigit(inputtedCode)
        if (digits.length === code.length && JSON.stringify(digits) === JSON.stringify(code)) {
            console.log("ok")
        } else {
            console.log("nope")
        }
    }
}

window.onload = () => {
    code = new Array()
    codeGenerator()
    const form = document.getElementById("codeForm")
    form.onsubmit =  (event) => {
        checkCode(event)
    }
}