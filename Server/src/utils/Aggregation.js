export const aggregationPipeline = async (
  ModelName,
  pipeline = { $match: {}, $group: {} }
) => await ModelName.aggregate(pipeline);
