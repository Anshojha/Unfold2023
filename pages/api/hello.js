// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from "../../sanity";

export default function handler(req, res) {
  const doc = {
    _type: "raise_funds",
    name: "Aritra",
    description: "description",
    donation_amount: "donation",
    email: "email",
    wallet_address: "tx?.from",
  };

  client
    .create(doc)
    .then(() => {
      res.status(200).json({ status: "Success" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}
