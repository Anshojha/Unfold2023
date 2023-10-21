export default {
  name: "raise_funds",
  title: "Raise Funds",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "donation_amount",
      title: "Donation Amount",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "wallet_address",
      title: "Wallet Address",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
