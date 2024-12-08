export const environment = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:4200").split(","),
  api: {
    baseUrl:
      process.env.API_BASE_URL ||
      "https://api.commbank.com.au/public/cds-au/v1/banking",
    products: {
      path: "/products",
      version: process.env.PRODUCTS_API_VERSION || "3",
    },
    productDetails: {
      version: process.env.PRODUCT_DETAILS_API_VERSION || "4",
    },
  },
};
