import mongoose from "mongoose";

const TextContentSchema = new mongoose.Schema(
  {
    format: { type: String, default: null },
    textType: String,
    audience: String,
    text: String,
  },
  { _id: false }
);

const TitleSchema = new mongoose.Schema(
  {
    titleType: String,
    level: String,
    text: String,
  },
  { _id: false }
);

const ContributorSchema = new mongoose.Schema(
  {
    sequence: Number,
    role: String,
    nameInverted: String,
  },
  { _id: false }
);

const LanguageSchema = new mongoose.Schema(
  {
    role: String,
    code: String,
  },
  { _id: false }
);

const ExtentSchema = new mongoose.Schema(
  {
    type: String,
    value: String,
    unit: String,
  },
  { _id: false }
);

const SubjectSchema = new mongoose.Schema(
  {
    scheme: String,
    code: String,
    headingText: String,
  },
  { _id: false }
);

const ProductIdentifierSchema = new mongoose.Schema(
  {
    type: String,
    value: String,
  },
  { _id: false }
);

const PriceSchema = new mongoose.Schema(
  {
    type: String,
    qualifier: String,
    discountPercent: Number,
    amount: Number,
    currency: String,
  },
  { _id: false }
);

const SalesRightsSchema = new mongoose.Schema(
  {
    type: String,
    countriesIncluded: [String],
  },
  { _id: false }
);

const BookSchema = new mongoose.Schema(
  {
    baseReference: {
      type: String,
      index: true,
    },

    recordReference: {
      type: String,
      unique: true,
      index: true,
    },

    version: Number,
    notificationType: String,

    collateralDetail: {
      textContents: [TextContentSchema],
    },

    descriptiveDetail: {
      productComposition: String,
      productForm: String,
      productFormDetail: String,
      epubTechnicalProtection: String,
      titles: [TitleSchema],
      contributors: [ContributorSchema],
      languages: [LanguageSchema],
      extents: [ExtentSchema],
      subjects: [SubjectSchema],
    },

    // 🔑 Category references
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true,
      },
    ],

    productIdentifiers: [ProductIdentifierSchema],

    productSupply: {
      supplier: {
        role: String,
        name: String,
      },
      availability: String,
      prices: [PriceSchema],
    },

    publishingDetail: {
      imprint: {
        name: String,
      },
      publisher: {
        role: String,
        name: String,
      },
      publishingStatus: String,
      publishingDate: String,
      salesRights: [SalesRightsSchema],
    },

    meta: {
      source: String,
      importedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
