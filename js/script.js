
function getFile(link, clb) {
    const xml = new XMLHttpRequest()
    xml.onreadystatechange = (e) => {
        if (xml.readyState === 4 && xml.status=== 200) {
            clb(xml.responseText)
        }
    }


    xml.open("GET", link)
    xml.send()
}

getFile("./csv/buttons.csv", 
        (myData) => {
            const fileLines = myData.split("\n") || myData.split("\r")
            // const width = (100/fileLines.length)+"%"
            // const nav = document.querySelector('nav')
            // fileLines.forEach( v => {
            //     v = v.trim().split(';')
            //     const btn = document.createElement('div')
            //     const txt = document.createElement('p')
            //     txt.innerText = v[0]
            //     btn.appendChild(txt)
            //     btn.className = "btns"
            //     btn.dataset.link = v[1]
            //     btn.style = `width: ${width};`
            //     btn.onclick = (e) => { alert(btn.dataset.link) }
            //     nav.appendChild(btn)
            // })

            getFile("./html/button.html", (retVal) => {
                const width = (100/fileLines.length)+"%"
                const nav = document.querySelector('nav')
                let letStr =''
                fileLines.forEach( v => {
                    v = v.trim().split(';')
                    letStr+=retVal.replace('[{mywidth}]',width).replace('[{link}]', v[1])
                            .replace('[{name}]', v[0])
                });
                nav.innerHTML = letStr
                document.querySelectorAll('.btns').forEach( (v) => {
                    v.onclick = (e) => {
                        getFile(`./${v.dataset.link!=='index' ? 'html/' : ''}${v.dataset.link}.html`, (r) => {
                            document.querySelector('main').innerHTML=r
                            console.log(r)
                        })
                        //alert(v.dataset.link)
                    }
                })
            })
        })

document.querySelector("input[name='wejscie']").oninput = (e) => {
    let reg = /^[a-z0-9\\._\-]{3,}\@([a-z0-9\-_]+\.)+[a-z]{2,10}$/gi
    if (e.target.value.match(reg)) {
        const m = document.querySelector('#mails')
        const item = document.createElement('li')
        const button = document.createElement('button')
        const span = document.createElement('span')
        span.innerText = e.target.value.match(reg)
        item.appendChild(span)
        button.innerText = "Usuń"
        button.onclick = (e) => {
            m.removeChild(e.target.parentNode)
            //e.target.parentNode.parentNode.removeChild(e.target.parentNode)
            //console.log(e)
        }
        item.appendChild(button)
        m.appendChild(item)
    }

    //console.log(e.target.value.match(reg))
}