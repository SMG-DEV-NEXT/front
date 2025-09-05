const getBody = (inputs) => {
  return {
    titleEn: inputs.titleEn,
    titleRu: inputs.titleRu,
    status: inputs.status.value,
    position: inputs.position * 1,
    aboutRu: inputs.aboutRu,
    aboutEn: inputs.aboutEn,
    image1: inputs.image1,
    image2: inputs.image2,
    catalogId: inputs.catalog.value,
    type: inputs.type.value,
    link: inputs.link,
    metaTitleRu: inputs.metaTitleRu,
    metaTitleEn: inputs.metaTitleEn,
    metaRu: inputs.metaRu,
    metaEn: inputs.metaEn,
    thumbnailVideo: inputs.thumbnailVideo,
    tags: inputs.tags,
    images: inputs.images,
    videos: inputs.videos,
    imageUrl: inputs.imageUrl,
    functions: inputs.functions,
    instructionRu: inputs.instructionRu,
    instructionEn: inputs.instructionEn,
    requirments: [inputs.requirments],
    minimumPrice: inputs.minimumPrice * 1,
  };
};

export default getBody;
