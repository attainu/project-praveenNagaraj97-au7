const ProductResolvers = {
  Query: {
    getAllCategories: (parent, args, { Category }, info) => Category.find(),

    getAllCategoriesWithItsProduct: async (
      parent,
      args,
      { Category, Product },
      info
    ) => {
      const category = await Category.find();

      const results = [];

      for (let each of category) {
        const products = await Product.find({ categoryId: each._id });
        results.push({ category: each._doc, products });
      }

      return results;
    },

    getAllProducts: (parent, args, { Product }, info) => Product.find(),
  },

  Mutation: {
    getProductBasedOnCategory: async (
      parent,
      { name },
      { Product, Category },
      info
    ) => {
      if (!name) return Product.find();

      const category = await Category.findOne({ categoryName: name });
      if (!category) {
        throw new ApolloError(
          "No Products Found With The given Category.",
          404
        );
      }
      return await Product.find({ categoryId: category._id });
    },
  },
};

export default ProductResolvers;
