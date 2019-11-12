window.onload = setInterval("req()", 100);
function req() {
  var xhttp = new XMLHttpRequest();
  // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {      
      peso = parseFloat((this.responseText/100).toFixed(2))
      console.log(peso)
      document.getElementById("valor_peso").value = peso;
      var controle = document.getElementById('controle').value;
      if(peso == 0){
        if (controle == 0) {
          // exibeElementos();
        }
        document.getElementById('controle').value = 0;
      }
      if(peso > 0){
        if (controle == 0) {
          // ocultaElementos();
        }
        document.getElementById('controle').value = 1;
        // 
      }
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/", true);
  xhttp.send();
}

// $(document).ready(function(){
//   calcula_peso();
// });

function calcula_peso(){
  var x = document.getElementById("valor_peso").value;
  document.getElementById("input_terra").innerHTML = parseFloat(x).toFixed(2);
  document.getElementById("span_marte").innerHTML = parseFloat((x * 0.38)).toFixed(2) 
  document.getElementById("span_mercurio").innerHTML = parseFloat((x * 0.37)).toFixed(1)
  document.getElementById("span_venus").innerHTML = parseFloat((x * 0.91)).toFixed(1)
  document.getElementById("span_jupiter").innerHTML = parseFloat((x * 2.34)).toFixed(1) 
  document.getElementById("span_saturno").innerHTML = parseFloat((x * 1.06)).toFixed(1)
  document.getElementById("span_urano").innerHTML = parseFloat((x * 0.92)).toFixed(1)
  document.getElementById("span_netuno").innerHTML = parseFloat((x * 1.19)).toFixed(1)
  document.getElementById("span_lua").innerHTML = parseFloat((x * 0.166)).toFixed(2)
}

function ocultaElementos(){
  $(".letreiro_svg").animate({
    top: "-=756px",
    opacity: 0
  },{
    duration: 1500
  });
  $(".imagem_cabine").animate({
    left: "-=1756px", 
    opacity: 0
  },{
    duration: 1500
  });
  setTimeout(function(){ 
    $("#cabine").hide() 
  }, 1000);
  $('#a').fadeIn(6000);
  calcula_peso()
}

function exibeElementos(){
  $('#a').hide();
  $(".letreiro_svg").animate({
    top: "0px",
    opacity: 1
  },{
    duration: 1000
  });
  
  $(".imagem_cabine").animate({
    left: "0px", 
    opacity: 1
  },{
    duration: 1000
  });
  $("#cabine").show();
  $(".imagem_cabine").show();
}