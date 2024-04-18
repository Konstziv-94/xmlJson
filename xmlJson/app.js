$(document).ready(function(){
    
   
    //XML

    $(".xml").on("click",function(){
        
        $.ajax({
            type:'GET',
            url:"fuel.xml",
            dataType:"xml",
            error: function (e) {
                alert("An error occurred while processing XML file");
                console.log("XML reading Failed: ", e);
            },
            success: function(res){
                clearData();
                console.log($(res).find('station'));
                $(res).find('station').each(function(){
                    var stationID = $(this).attr("stationID");
                    var distance = $(this).attr("distance");
                    var address = $(this).find("address").text();
                    var h24 = $(this).find("h24").attr("value");
                    var companyName = $(this).find("companyName").text();
                    var phone = $(this).find("phone");
                    var fuel = $(this).find("fuel");
                    //console.log(fuel);
                    $(".right").append(
                        `<div style="width: 400px; text-align: left;">
                          Station id:${stationID} <br>
                          Distance:${distance} <br>
                          Address:${address} <br>
                          H24: ${h24} <br>
                          companyName: ${companyName} <br>
                        </div>`
                    )

                    phone.each(function(index,element){
                       // console.log(element);
                        $(".right").append(
                            `
                            <div style="width: 400px; text-align: left;">
                                Phone ${index+1}: ${$(element).text()}
                            </div>
                            `
                        )
                    })
                    
                    fuel.each(function(index,element){
                        //console.log(element);
                        console.log();
                        $(".right").append(
                            `
                            <div style="width: 400px; text-align: left;">
                                Fuel Name:${$(element).text()} <br>
                                Fuel Price:${$(element).attr("price")} <br>
                                Fuel id: ${$(element).attr("fuelTypeID")} <br>
                                Fuel Time: ${$(element).attr("priceTimeStamp")}
                            </div>
                            `
                        )
                       
                    })
                    $(".right").append("<br>");

                });


                

            }
        })

    })


    // JSON
    
    
    $(".json").on("click",function(){
        
        $.ajax({
            type:'GET',
            url:'fuel.json',
            dataType:'json',
            success:function(data){
               clearData();
                // console.log(data);
                
               const station = data["station"];
               const fuels = data["station"][0]["fuels"];
               
               

                for (i=0; i<=station.length; i++){
                    $(".right").append(
                        
                        `
                        <div class"center" style="width: 400px; text-align: left;">
                            Station id:  ${station[i]["@stationID"]} <br>
                            Distance:${station[i]["@distance"]} <br>
                            Address:${station[i]["address"]} <br>
                            H24:${station[i]["h24"]["@value"]} <br>
                            Phone :${station[i]["phone"]} <br>
                        </div>
                        `)

                        for (fuel of station[i].fuels){
                            console.log(fuel);
                            $(".right").append(`
                                <div style="width: 400px; text-align: left;">
                                    Fuel Id: ${fuel["@fuelTypeID"]}
                                    Fuel name: ${fuel["#text"]} <br>
                                    Fuel price: ${fuel["@price"]} <br>
                                    Time : ${fuel["@priceTimeStamp"]} <br>

                                <div>
                            `)
                        }

                        $(".right").append("<br>");

                }
            
            


                   
                        
                         
            
                    
                   
                 

               
              
               

    
            }
        })
    })

    $(".clear").on("click",function(){
        clearData();
    })

   
   
}) 


function clearData(){
    $(".right").html("");
}
