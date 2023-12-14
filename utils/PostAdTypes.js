export const types_list = [
    {
        name: "Autos",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/electric-car_ni5gwt.png",
        subCategories: [""]
    },
    {
        name: "Bikes",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/bycicle_1_ase8ob.png",
        subCategories: [
            {
                name:'Bicycles',
                image: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/bicycle_rpjcit.png'
            },
            {
                name:'E-scooters',
                image: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/kick-scooter_olxyde.png'
            },
            {
                name: 'E-bikes', 
                image: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/electric-bicycle_onzofz.png'
            },
            {
                name: 'Motorcycles',
                image: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/motorcycle_guao2f.png'
            }
        ]
    },
    {
        name: "Boats",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/boat_o6xauf.png",
        subCategories: [""]
    },
    {
        name: "Busses",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/bus_gtxmhp.png",
        subCategories: [""]
    },
    {
        name: "Drones",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/drone_3_p9yppv.png",
        subCategories: [""]
    },
    {
        name: "Trailers",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/trailer_hhy9po.png",
        subCategories: [""]
    },
    {
        name: "Trucks",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/delivery-truck_r8jqpr.png",
        subCategories: [""]
    },
    {
        name: "Construction Machines",
        image: "https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/excavator_scv4o1.png",
        subCategories: [""]
    },
    {
        name: "Vans",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357249/van_zyuryo.png",
        subCategories: [""]
    },
    {
        name: "Parts",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/spare-parts_qrpyzu.png",
        subCategories: [
            {
                name:"Auto",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257529/pic3_asgavk.png",
            },
            {
                name:'Bike',
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257528/pci9_qjg7fd.png",
            },
            {
                name:"Boat",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257528/pic1_kpxx5e.png",
            },
            {
                name:"Buss",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257528/pic2_fjlqqt.png",
            },
            {
                name:"Construction Machine",
                image: "https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257532/pic7_kecdjc.png",
            },
            {
                name:"Drone",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257531/pic5_i7uwpf.png",
            },
            {
                name:"Trailer",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257532/pic6_jcejhj.png",
            },
            {
                name: "Truck",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257531/pic4_a7imhy.png",
            },
            {
                name: "Van",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701258110/pic11_w6b4j1.png",
            },
            {
                name: "Other Parts",
                image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1701257528/pic8_zamwf9.png",
            },
        ]
    },
    {
        name: "Others",
        image:"https://res.cloudinary.com/dlkuyfwzu/image/upload/v1702357248/more_pveww7.png",
        subCategories: [""]
    }
];

export const conditionList = [
    {
      id: 1,
      name: "New",
      value: "new",
    },
    {
      id: 2,
      name: "Used",
      value: "used",
    },
    {
      id: 3,
      name: "Recondition",
      value: "recondition",
    },
  ];


export const fuelType = [
    {
      name: "Gasoline",
      value: "Gasoline",
    },
    {
      name: "Diesel",
      value: "Diesel",
    },
    {
      name: "Ethanol",
      value: "Ethanol",
    },
    {
      name: "Electric",
      value: "Electric",
    },
    {
      name: "Hydrogen",
      value: "Hydrogen",
    },
    {
      name: "LPG",
      value: "LPG",
    },
    {
      name: "CNG",
      value: "CNG",
    },
    {
      name: "Hybrid (Electric/Gasoline)",
      value: "Hybrid (Electric/Gasoline)",
    },
    {
      name: "Hybrid (Electric/Diesel)",
      value: "Hybrid (Electric/Diesel)",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];
  
  export const axelType = [
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
    {
      name: ">3",
    },
  ];
  
  export const bikeBodyShape = [
      {name: "ATV / Quad", value: "ATV / Quad"},
      {name: "Cabin", value: "Cabin"},
      {name: "Chopper", value: "Chopper"},
      {name: "Enduro", value: "Enduro"},
      {name: "Moped", value: "Moped"},
      {name: "Motocross", value: "Motocross"},
      {name: "Naked Bike", value: "Naked Bike"},
      {name: "Scooter", value: "Scooter"},
      {name: "Sidecar", value: "Sidecar"},
      {name: "Street", value: "Street"},
      {name: "Supermoto", value: "Supermoto"},
      {name: "Touring", value: "Touring"},
      {name: "Trike", value: "Trike"},
      {name: "Others", value: "Others"}
    ];
  
  export const BikeFuelType = [
    {
      name: "Gasoline",
      value: "Gasoline",
    },
    {
      name: "Diesel",
      value: "Diesel",
    },
    {
      name: "Electric",
      value: "Electric",
    },
    {
      name: "LPG",
      value: "LPG",
    },
    {
      name: "Hybrid (Electric/Gasoline)",
      value: "Hybrid (Electric/Gasoline)",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];
  
  export const AutosBodyShape = [
    {
      name: "Convertible",
      value: "Convertible",
    },
    {
      name: "Compact",
      value: "Compact",
    },
    {
      name: "Coupe",
      value: "Coupe",
    },
    {
      name: "SUV/Off-Road/Pick-up",
      value: "SUV/Off-Road/Pick-up",
    },
    {
      name: "Station Wagon",
      value: "Station Wagon",
    },
    {
      name: "Sedan",
      value: "Sedan",
    },
    {
      name: "Van",
      value: "Van",
    },
    {
      name: "Transporter",
      value: "Transporter",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];
  
  export const gearBox = [
    {
      name: "Automatic",
      value: "Automatic",
    },
    {
      name: "Manual",
      value: "Manual",
    },
    {
      name: "Semi-automatic",
      value: "Semi-automatic",
    },
  ];
  
  export const exteriorColor = [
    {
      name: "Blue",
      value: "Blue",
    },
    {
      name: "Brown",
      value: "Brown",
    },
    {
      name: "Bronze",
      value: "Bronze",
    },
    {
      name: "Yellow",
      value: "Yellow",
    },
    {
      name: "Grey",
      value: "Grey",
    },
    {
      name: "Green",
      value: "Green",
    },
    {
      name: "Red",
      value: "Red",
    },
    {
      name: "White",
      value: "White",
    },
    {
      name: "Black",
      value: "Black",
    },
    {
      name: "Silver",
      value: "Silver",
    },
    {
      name: "Violet",
      value: "Violet",
    },
    {
      name: "Gold",
      value: "Gold",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];
  
  export const bikeColor = [
    {
      name: "Beige",
      value: "Beige",
    },
    {
      name: "Brown",
      value: "Brown",
    },
    {
      name: "Bronze",
      value: "Bronze",
    },
    {
      name: "Yellow",
      value: "Yellow",
    },
    {
      name: "Green",
      value: "Green",
    },
    {
      name: "Red",
      value: "Red",
    },
    {
      name: "Black",
      value: "Black",
    },
    {
      name: "Silver",
      value: "Silver",
    },
    {
      name: "Violet",
      value: "Violet",
    },
    {
      name: "Orange",
      value: "Orange",
    },
    {
      name: "Gold",
      value: "Gold",
    },
    {
      name: "Paintwork (Metallic)",
      value: "Paintwork (Metallic)",
    },
    {
      name: "White",
      value: "White",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];
  
  export const interiorColor = [
    {
      name: "Beige",
      value: "Beige",
    },
    {
      name: "Black",
      value: "Black",
    },
    {
      name: "Grey",
      value: "Grey",
    },
    {
      name: "White",
      value: "White",
    },
    {
      name: "Brown",
      value: "Brown",
    },
    {
      name: "Red",
      value: "Red",
    },
    {
      name: "Yellow",
      value: "Yellow",
    },
    {
      name: "Orange",
      value: "Orange",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];
  
  export const kilometers = [
    {
      name: "0 - 10000 Km",
    },
    {
      name: "10000 - 20000 Km",
    },
    {
      name: "20000 - 30000 Km",
    },
    {
      name: "30000 - 50000 Km",
    },
    {
      name: "50000 - 70000 Km",
    },
    {
      name: "70000 - 100000 Km",
    },
    {
      name: "100000 - 150000 Km",
    },
    {
      name: "150000 - 200000 Km",
    },
    {
      name: "200000 - 300000 Km",
    },
    {
      name: "300000+ Km",
    },
  ];