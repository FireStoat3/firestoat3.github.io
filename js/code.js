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

function decodeEntities(encodedString) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encodedString;
  return textarea.value;
}

const getData = async () => {
    fetch("./../resources/res.json").then((res)=>{
        res.json().then((data)=>{
            document.getElementById("dataDiv").style.display = "flex"
            document.getElementById("dataA").href="mailto:"+data.email+"?subject="+data.subject
            document.getElementById("clipboardA").addEventListener("click",(event)=>{
                event.preventDefault()
                navigator.clipboard.writeText(decodeEntities(data.email))
                document.getElementById("clipboardMessage").style.display = "block"
            })
        })
    })
}   

const checkCode = (event) => {
    event.preventDefault()
    const form = document.getElementById("codeForm")
    const formData = new FormData(form);
    const inputtedCode = formData.getAll("codeInput")[0]
    const pattern = /^\d+$/
    if (pattern.test(inputtedCode)) {
        const digits = strToDigit(inputtedCode)
        document.getElementById("challengeDiv").style.display = "none"
        if (digits.length === code.length && JSON.stringify(digits) === JSON.stringify(code)) {
            getData()
        } else {
            document.getElementById("dataErrorDiv").style.display = "block"
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