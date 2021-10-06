function fetchJSON(url, client_id, client_secret, payload, xpath) {

  var payload = payload;
  var options = {
    'method' : 'POST',
    'payload' : payload,
    'headers' : {
      'client_id': client_id,
      'client_secret': client_secret
    }
  };
 var response = UrlFetchApp.fetch(url, options);

  var content = response.getContentText();
  var json = JSON.parse(content);
  
  var patharray = xpath.split("/");
  //Logger.log(patharray);
  
  for(var i=0;i<patharray.length;i++){
    json = json[patharray[i]];
  }
  
  //Logger.log(typeof(json));
  
  if(typeof(json) === "undefined"){
    return "Node Not Available";
  } else if(typeof(json) === "object"){
    var tempArr = [];
    
    for(var obj in json){
      tempArr.push([obj,json[obj]]);
    }
    return tempArr;
  } else if(typeof(json) !== "object") {
    return json;
  }
}


