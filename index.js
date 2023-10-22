console.log("Connected!");
let InputField = document.getElementById("InputField");
let SubmitInput = document.getElementById("SubmitInput");
let Items = document.getElementById("Items");

function UpdateItemsHeight(){
    var h = 0;
    for (e of Items.children){
        var eCurrectStyle = window.getComputedStyle(e)
        h += e.scrollHeight+(isNaN(parseInt(eCurrectStyle.marginTop)) ? 0 : parseInt(eCurrectStyle.marginTop))+(isNaN(parseInt(eCurrectStyle.marginBottom)) ? 0 : parseInt(eCurrectStyle.marginBottom));
    }
    Items.style.height = h+"px";
}

window.addEventListener("beforeunload", function(){
    if(Items.innerHTML == "" || Items.innerHTML == undefined) return;
    localStorage.setItem("data", Items.innerHTML);
});

function NewItem() {
    if(InputField.value == "") return;
    let NewDiv = document.createElement("div");
    let RemoveButton = document.createElement("input");
    let Label = document.createElement("div");
    Label.innerText = InputField.value;
    Label.style.resize = "none";
    Label.style.background = "none";
    Label.contentEditable = true;
    Label.id = "Label"
    InputField.value = "";
    Label.addEventListener("input", () => {
        UpdateItemsHeight();
    })
    RemoveButton.type = "button";
    RemoveButton.value = "X";
    RemoveButton.addEventListener("click", () => {
        RemoveButton.disabled = true;
        NewDiv.classList.add("RemoveEffect");
        NewDiv.addEventListener("animationend", () => {
            NewDiv.remove();
            UpdateItemsHeight();
        });
    });
    Label.style.margin = 0;
    RemoveButton.style.marginLeft = "3px";
    RemoveButton.style.marginRight = "5px";
    RemoveButton.style.maxHeight = "25px";
    NewDiv.style.marginBottom = "10px";
    NewDiv.style.display = "flex";
    NewDiv.appendChild(RemoveButton);
    NewDiv.appendChild(Label);
    Items.appendChild(NewDiv);
    UpdateItemsHeight();
}

SubmitInput.addEventListener("click", () => {
    NewItem();
});

InputField.addEventListener("keyup", e => {
    if(e.key == "Enter"){
        NewItem();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("data") == null || localStorage.getItem("data") == "undefined") return;
    var Data = localStorage.getItem("data");
    Items.innerHTML = Data;
    Items.querySelectorAll("input").forEach(element => {
        if(element.parentElement.classList.contains("RemoveEffect")){
            element.parentElement.remove();
            return;
        }
        element.addEventListener("click", () => {
            element.parentElement.classList.toggle("RemoveEffect");
            element.parentElement.addEventListener("animationend", () => {
                element.parentElement.remove();
                UpdateItemsHeight();
            });
        })
    });
    Items.querySelectorAll("div#Label").forEach(element => {
        element.addEventListener("input", () => {
            UpdateItemsHeight();
        })
    });
    UpdateItemsHeight();
})
UpdateItemsHeight();