var previsao1 =""
var previsao2 =""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png' ,
    png_quality: 90
});

camera = document.getElementById("camerawebcam");
Webcam.attach('#camerawebcam');

function tirarfoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("fotocapturada").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('versão ml5:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y4F1v9qaZ/model.json', modelLoaded);

function modelLoaded(){
    console.log("modelo carregado");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "A primeira previsao é " + previsao1
    speakdata2 = "E a segunda previsao é " + previsao2
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
    synth.speak(utterThis)
}

function analisar(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
if(error){
console.error(error);

}else {
    console.log(results)
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    document.getElementById("resultEmotionName2").innerHTML = results[1].label;
    prediction1 = results[0].label
    prediction2 = results[1].label
    speak();
    if(results[0].label == "feliz"){
        document.getElementById("emojiatualizado").innerHTML = "&#128522;";
    }
    if(results[0].label == "triste"){
        document.getElementById("emojiatualizado").innerHTML = "&#128532;";
    }
    if(results[0].label == "bravo"){
        document.getElementById("emojiatualizado").innerHTML = "&#128548;";
    }
    if(results[1].label == "feliz"){
        document.getElementById("emojiatualizado2").innerHTML = "&#128522;";
    }
    if(results[1].label == "triste"){
        document.getElementById("emojiatualizado2").innerHTML = "&#128532;";
    }
    if(results[1].label == "bravo"){
        document.getElementById("emojiatualizado2").innerHTML = "&#128548;";
    }
}
}