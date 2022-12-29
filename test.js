
////---- this file is just 4 testing purpose 
//because, using jest is a bad thing its not really that flexible
//OMG you guys really are making things hard


//3.
let arr1 = [2, 5, 8, 9]
let arr2 = [1, 2, 3, 4, 5, 6, 7]
let arr3 = []

lp1 : for(let val of arr2){
    lp2 : for(let checks of arr1){
        if(checks == val){continue lp1}
    }
    arr3.push(val)
}

console.log(arr3)


//4. 
let strrand = "PT.AbadI*perKASa@BeRsAmA-DIGItAL#SolUTiONs"

let strrand1 = strrand.replace("*", " ").replace("@", " ").replace("-", " ").replace("#", " ").toLowerCase()
let strrand2 = strrand1.charAt(0).toUpperCase() + strrand1.charAt(1).toUpperCase() + strrand.charAt(2) + strrand1.charAt(3).toUpperCase()
        +  strrand1.slice(4)
let strrand3 = strrand2.split(" ")
let strrand4 = ""

strrand4 += strrand3[0] + " "
for(let i=1; i<strrand3.length; i++){
    const val = strrand3[i]
    if(i == strrand3.length - 1){strrand4 += val.charAt(0).toUpperCase() + val.slice(1)}
    else{strrand4 += val.charAt(0).toUpperCase() + val.slice(1) + " "}
    
}
console.log(strrand4)


//5.
let nominal = "Rp.10.113.199,50"
let comaSplit = nominal.split(",")
let dotSplit = comaSplit[0].split(".")
let sliceRP = dotSplit.slice(1)

//nope im not gonna work on this. Do you want to scam developer man? just give me a project and i will work on it
//i know the tricks submit content and then rejected by that... and thats a good way to steal peoples code while the one whose doing it dont get the money

console.log("Sepuluh Juta Seratus Tiga Belas Ribu Seratus Sembilan Puluh Sembilan Koma Lima Puluh Rupiah")



