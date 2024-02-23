import "dotenv/config"
import mongoose from "mongoose"
import jsonCustomer from "./schemas/customer.json"
import jsonGlasses from "./schemas/glasses.json"
import jsonAdresses from "./schemas/adress_provider.json"
import jsonboughtBy from "./schemas/bought_by.json"
import jsonLastShopping from "./schemas/last_shopping.json"

const { MONGODB_DOCKER: mongo_url_doc, MONGODB_COMPASS: mongo_url_local } =
  process.env

const uri = mongo_url_doc ? String(mongo_url_doc) : String(mongo_url_local)

async function main() {
  try {
    await mongoose.connect(uri)
    const customerSchema = new mongoose.Schema(jsonCustomer)
    const lastShoppingSchema = new mongoose.Schema(jsonLastShopping)
    const glassesSchema = new mongoose.Schema(jsonGlasses)
    const adressSchema = new mongoose.Schema(jsonAdresses)
    const boughtBySchema = new mongoose.Schema(jsonboughtBy)

    //Model() makes a copy of schema! Make sure that you-ve addes everything
    //First Arg is a singular name of the collection
    const Customer = mongoose.model("Customer", customerSchema)
    const LastShopping = mongoose.model("LastShooping", lastShoppingSchema)
    const Glasses = mongoose.model("Glasses", glassesSchema)
    const Adress = mongoose.model("Adress", adressSchema)
    const BoughtBy = mongoose.model("BoughtBy", boughtBySchema)

    //Vaciamos las colleciones para tener unas coleccione limpias
    await LastShopping.deleteMany({})
    await Adress.deleteMany({})
    // await BoughtBy.deleteMany({})
    await Glasses.deleteMany({})
    await Customer.deleteMany({})

    //Ya guarda automaticamente el metodo insertMany()
    const lastShooping = await LastShopping.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        brand: "Rayban",
        graduation_L: 23,
        graduation_R: 2.0,
        glass_color_L: "",
        glass_color_R: "",
        frame_type: "Metallic",
        price: 127.0,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        brand: "Rayban",
        graduation_L: 23,
        graduation_R: 2.0,
        glass_color_L: "Black",
        glass_color_R: "Black",
        frame_type: "Light",
        price: 220.0,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        brand: "Chichin",
        graduation_L: 2,
        graduation_R: 7.0,
        glass_color_L: "",
        glass_color_R: "",
        frame_type: "Light",
        price: 80.0,
      },
    ])
    //collecionamos todas las id, para rellenar las relaciones de las colleciones
    const lastShippId = lastShooping.map((item) => item._id)

    const customer = await Customer.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Joan",
        adress: "C/ Margall",
        telf: "54345645",
        email: "jo@gmail.com",
        date: Date.now(),
        last_shopping_id: lastShippId[0],
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Pere",
        adress: "Av. Estruc",
        telf: "54345645",
        email: "pe@gmail.com",
        date: Date.now(),
        last_shopping_id: lastShippId[2],
      },
    ])

    const customerId = customer.map((cust) => cust._id)

    const glasses = new Glasses({
      _id: new mongoose.Types.ObjectId(),
      logo: "Google",
      brand: "Brand",
      frame: "Metallic",
      adress_id: "Google Associated SL",
      price: 105.75,
    })

    await glasses.save()
    const glassesId = glasses._id

    const adress = new Adress({
      _id: new mongoose.Types.ObjectId(),
      name: "Google",
      adress: {
        street: "Av. Stacktown",
        number: 154,
        city: "Silicon Valley",
        zipcode: "00143",
        country: "USA",
      },
      phone: "652343525",
      website: "www.google.com/contact",
    })

    await adress.save()

    BoughtBy.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        customer_id: customerId[0],
        glasses_id: glassesId,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        customer_id: customerId[1],
        glasses_id: glassesId,
      },
    ])

    Adress.find().then((result) => {
      console.log(result.length) //Devuelve
    })

    const result = await BoughtBy.find({ glasses_id: glassesId })
    const result2 = await LastShopping.find({ brand: "Rayban" })
      .where("price")
      .gte(200)

    console.log("asd", result) //Devuelve todo, 2 resultados
    console.log("asdf", result2) //Solo cumple 1 la condición
  } finally {
    await mongoose.connection.close()
    console.log("Closed successfully!!")
  }
}

main().catch((err) => console.log(err))
// process.exit()
