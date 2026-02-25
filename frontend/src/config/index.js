export const registerFormControls = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    required: true,
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "user@gmail.com",
    required: true,
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "********",
    required: true,
    type: "password",
    componentType: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "user@gmail.com",
    required: true,
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "********",
    required: true,
    type: "password",
    componentType: "password",
  },
];

export const productFormControls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
    placeholder: "Product title",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Product description",
    required: true,
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      {
        id: "clothes",
        label: "Clothes",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwears",
        label: "Footwears",
      },
      {
        id: "kids",
        label: "Kids",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
    ],
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    componentType: "input",
    placeholder: "Product price",
    required: true,
  },
  {
    label: "Sales Price",
    name: "salesPrice",
    componentType: "input",
    type: "number",
    placeholder: "Sales Price (Optional) ",
  },
  {
    label: "Stock",
    name: "stock",
    type: "number",
    componentType: "input",
    placeholder: "Product stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "clothes",
    label: "Clothes",
    path: "/shop/products",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/products",
  },
  {
    id: "footwears",
    label: "Footwears",
    path: "/shop/products",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/products",
  },
];

export const categoryOptionsMap = {
  clothes: "Clothes",
  accessories: "Accessories",
  footwears: "Footwears",
  kids: "Kids",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
};

export const filterOptions = {
  category: [
    { id: "clothes", label: "Clothes" },
    { id: "accessories", label: "Accessories" },
    { id: "footwears", label: "Footwears" },
    { id: "kids", label: "Kids" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
  ],
};

export const sortOptions = [
  {
    id: "price-lowtohigh",
    label: "Price: Low to High",
  },
  {
    id: "price-hightolow",
    label: "Price: High to Low",
  },
  {
    id: "title-atoz",
    label: "Title: A to Z",
  },
  {
    id: "title-ztoa",
    label: "Title: Z to A",
  },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    label: "Zip Code",
    name: "zipCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your zip code",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Additional notes (required)",
  },
];
