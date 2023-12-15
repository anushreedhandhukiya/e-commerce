document.getElementById("form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let formdata = new FormData()
    formdata.append("img",document.getElementById("img").files[0])
    fetch("/user/img/upload",{
        method : "POST",
        body : formdata
    })
})