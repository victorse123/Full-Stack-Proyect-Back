const {Router}=require("express");
const router=Router()
const mercadopago=require('mercadopago')
const { Preference } = mercadopago;
const{MercadoPagoConfig}=mercadopago
const axios=require('axios')

const client=new MercadoPagoConfig({
    accessToken:"TEST-3602831414021392-050116-fc461e10e650c6a7b800aa7b764779d4-1061690039"
  })



router.post("/",async(req,res)=>{
try {
    const body={

    items:[
        {

        title:req.body.title,
        type:req.body.type,
        category:req.body.category,
        unit_price:Number(req.body.price),
        quantity:Number(req.body.quantity),
        currency_id:"MXN"

        }
    ],
    // back_urls:{ 
    //     success:"https://www.youtube.com/watch?v=1x9yytCH3Zs",
    //     failure:"https://www.youtube.com/watch?v=1x9yytCH3Zs",
    //     pending:"https://www.youtube.com/watch?v=1x9yytCH3Zs"
    //  },




    back_urls:{
       success:"https://full-stack-project-front.vercel.app",
       failure:"https://full-stack-project-front.vercel.app",
       pending:"https://full-stack-project-front.vercel.app"
    },
    auto_return: "approved",
    notification_url: "https://full-stack-proyect-back-production.up.railway.app/createPreference/webhook"
    }

    
    //"https://www.youtube.com/watch?v=-VD-l5BQsuE"
    const preference=new Preference(client);
    const result = await preference.create({body})
    
    console.log(result.id);
   res.json({
    
    id:result.id

}); 
    

} catch (error) {
    console.log(error);
    res.status(500).json({
        error:'Error al crear la preferencia'
    })
}





})




router.post("/webhook",async (req,res)=>{

//console.log('crakoviano');

const paymentId =req.query['data.id']
 console.log(paymentId);
 //console.log(paymentId['data.id']);
try {

    const response=await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${client.accessToken}`
        }
    })
 
    if (response.ok) {
        const data = await response.json();
        const { id, authorization_code, description, transaction_amount } = data;
        console.log(id, authorization_code, description, transaction_amount);
    
        // Realizar la solicitud POST a la ruta de ventas
        const repapapa = await axios.post("https://full-stack-proyect-back-production.up.railway.app/sales", {
            //https://full-stack-proyect-back-production.up.railway.app
            id,
            authorization_code,
            description,
            transaction_amount
        });
        
      
    }
    

    res.sendStatus(200);

    //console.log(response);
    
} catch (error) {
    console.log('Error: ',error);
    res.sendStatus(500)
}



})
module.exports = router;