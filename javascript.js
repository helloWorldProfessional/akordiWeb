let finalChord;
let strings;
let fingerPattern;


function formChord(){
    var chord=document.querySelector('#chordName').value;
    var scale=document.querySelector('#scale').value;
    var interval=document.querySelector('#interval').value;
    if (!scale){
        if (!interval)
            finalChord = chord;
        else
            finalChord = chord + "_" + interval;
    }
    else if (scale == "b")
    {
            if (!interval)
                finalChord = chord + scale;
            else
                finalChord = chord + scale+ interval;
    }
    else{
            finalChord = chord + "_" + scale + interval;
    }
    
}
function getChord() {
    formChord();
    var HttpClient = function () {
      this.get = function (aUrl, aCallback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200)
            aCallback(httpRequest.responseText);
        }
        httpRequest.open("GET", aUrl, true);
        httpRequest.send(null);
      }
    }
    var urlAPI = 'https://api.uberchord.com/v1/chords/'+finalChord;
    var client = new HttpClient();
    client.get(urlAPI, function (response) {
      var response1 = JSON.parse(response);
      strings= response1[0].strings;
      fingerPattern = response1[0].fingering;
      
    });
    parseStrings();
    //parseFingerPattern();

  }
function parseStrings(){
    var tabString="E A D G B E";
    var finalString = "";
    var finalFinger = "";
    var strToNum;
    var tempStr="";
    for(let i=10;i>=0;i--){
        //finalString+=tabString.charAt(i)+"  "+strings.charAt(i)+"<br>";
        finalFinger+=tabString.charAt(i)+"  "+fingerPattern.charAt(i)+"<br>";
    }
    
    for(let i=10;i>=0;i--){
        if(i%2==0){
            
            if(strings.charAt(i)=='X'){
                //alert(strings.charAt(i));
                tempStr=" XXXXXXX";
                //finalString+=tabString.charAt(i)+"  "+strings.charAt(i)+"  "+tempStr+"<br>";
                finalString+=tabString.charAt(i)+" "+tempStr+"<br>";
                
            }
            else if(strings.charAt(i)=='0'){
                //alert(strings.charAt(i));
                tempStr=" -- -- -- -- -- --";
                //finalString+=tabString.charAt(i)+"  "+strings.charAt(i)+"  "+tempStr+"<br>";
                finalString+=tabString.charAt(i)+" "+tempStr+"<br>";
            }
            else{
                tempStr="";
                strToNum=parseInt(strings.charAt(i));
                for(let i=0;i<7;i++)
                {
                    if(i==0)
                        tempStr+=" ";  
                    else if(i==strToNum)
                        tempStr+=" o ";  
                    else
                        tempStr+=" -- "; 
                }
                //finalString+=tabString.charAt(i)+"  "+strings.charAt(i)+"  "+tempStr+"<br>";
                finalString+=tabString.charAt(i)+" "+tempStr+"<br>";
            }
        }
        
    }
    
    document.getElementById("strings").innerHTML = finalString;
    document.getElementById("fingering").innerHTML = finalFinger;


}