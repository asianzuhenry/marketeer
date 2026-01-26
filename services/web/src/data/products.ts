import type { Product } from "../types/basetypes";

const products: Product[] = [
  {
    _id: "1",
    name: "Brand New Dishwasher",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8tE0neCw7C4pJtZ2z7FtZ3IvUuVPpiXk7Q&s",
    description: "This is a top of the line dishwasher with many great features.",
    price: "100000",
    category: "Appliances",
    status: "Instock",
    otherImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8tE0neCw7C4pJtZ2z7FtZ3IvUuVPpiXk7Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwWx5cxoBcDtutPeqUfqLHoo2QnzKLjbopuQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDESJ-toVY0v_zldAUGEyjku_AsWXgmYEMKw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCSpQUTExsQYHDc7C_TKo5NOjR5tDZ3qyGA&s"
    ]
  },
  { 
    _id: "2",
    name: "Air Conditioner", 
    image: "https://tiimg.tistatic.com/fp/1/008/095/1-2-ton-split-air-conditioner-for-home-office-hotel-use-144.jpg",
    description: "This is a high-efficiency air conditioner.",
    price: "150000",
    category: "Appliances",
    status: "Instock",
    otherImages: [
      "https://tiimg.tistatic.com/fp/1/008/095/1-2-ton-split-air-conditioner-for-home-office-hotel-use-144.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFp1pMd6H4S84CvHWvoLpRMHwLoIbnLMdiw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWGsDh3huEtYJneLREPJew3fwlQAsXx1KXA&s"
    ]
},
  { 
    _id: "3", 
    name: "Air Jordan Sneakers", 
    image: "https://images-cdn.ubuy.co.in/653fddf3523d5e6e510a3d64-air-jordan-4-retro-308497-106.jpg",
    description: "These sneakers are comfortable and stylish.",
    price: "50000",
    category: "Footwear",
    status: "Instock",
    otherImages: [
      "https://images-cdn.ubuy.co.in/653fddf3523d5e6e510a3d64-air-jordan-4-retro-308497-106.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywn5CwS-nks6bcfCPxUI9-ISp8AuF4Ujm4Q&s"
    ]
  },
  { 
    _id: "4", 
    name: "Hoody Sweatshirt", 
    image: "https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/63/035543/1.jpg?3707",
    description: "black hoody sweatshirt",
    price: "120000",
    category: "Apparel",
    status: "Outofstock",
    otherImages: [
      "https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/63/035543/1.jpg?3707",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCx5VM4j7gPo39Qlm5dTZNrFau-rlUbMVkRw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS484WpRXm75VXKKknGozAxjo-AphUiT2cAmQ&s"
    ]
  },
  { 
    _id: "5",
    name: "Nokia 3310", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBIbUB51HpY3r9qNeQstdNfsSza2VjbOdGg&s",
    description: "This is a classic Nokia phone.",
    price: "80000",
    category: "Electronics",
    status: "Instock",
    otherImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBIbUB51HpY3r9qNeQstdNfsSza2VjbOdGg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD30pMBTPQJX4362Yv0mblxdqLtMqaNsIN1Q&s"
    ]
  },
];

export { products };
