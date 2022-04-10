module.exports = {
  env: {
    DB_LOCAL_URI:
      'mongodb://sohrab:siVekSGCQpCC0UBx@cluster0-shard-00-00.pnfzd.mongodb.net:27017,cluster0-shard-00-01.pnfzd.mongodb.net:27017,cluster0-shard-00-02.pnfzd.mongodb.net:27017/TshirtDesign?ssl=true&replicaSet=atlas-c3m839-shard-0&authSource=admin&retryWrites=true&w=majority',

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      'pk_test_51ISme0GtkNlPUttpxdSphCv9nNrcv5qg16fdirky6tHXPJzHyxGp6Lf3fhvW6seQIttlJK7BdjaUF1hdBWCsVeyO00xQxAQw3a',
    STRIPE_SECRET_KEY:
      'sk_test_51ISme0GtkNlPUttpLuX3cNOsMMFgFjIHnHX5ubDbSONcv61AibFna2hyLbgh9PO1i5x8f0anbfsbcRiTjyeipGNf00HaU7SJzq',

    STRIPE_WEBHOOK_SECRET: 'whsec_2GPHvjWQlQe3PUEmvwXPE98Z0Vz3tCo3',

    CLOUDINARY_CLOUD_NAME: 'sajal-cnq',
    CLOUDINARY_API_KEY: '572156839876236',
    CLOUDINARY_API_SECRET: 'dmlRwiT8jRZtCi0vT9Ik8RSqsK8',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '8b6d9ac7594e74',
    SMTP_PASSWORD: 'a4d7b80183c4d5',
    STMP_FROM_NAME: 'T-shirt Design',
    STMP_FROM_EMAIL: 'noreply@tshirtShopping.com',

    NEXTAUTH_URL: 'https://next-js-tshirt-shopping.vercel.app/',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
