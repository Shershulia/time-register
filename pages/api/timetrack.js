// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
import { TimeTrack } from "@/models/TimeTrack";

export default async function handler(req, res) {
  try {
      const session = await getServerSession(req,res,authOptions);
      if (!session) {
          res.status(403).json({ msg: "You should be authorized" });
        }
     
      await mongooseConnect();

    if (req.method === "POST") {
      
        const { desc, time, category, gitHub } = req.body;
        const data = {
            desc,
            time,
            email: session.user.email,
            category,
            gitHub,
          }
        const productDoc = await TimeTrack.create(data);
        
        
        res.status(201).json(productDoc);
      }
    else if (req.method === "GET") {
        const page = req.query["page"] || 1;
        const perPage = 5;
        const skip = (page - 1) * perPage;
        try {
            const productDoc = await TimeTrack.find({ email: session.user.email })
                .sort({ createdAt: -1 }) // Sort by Date Added DESC
                .skip(skip)
                .limit(perPage);

            res.status(200).json(productDoc);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else if (req.method === "DELETE") {
      const id = req.query["id"];
      try {
          const productDoc = await TimeTrack.findOneAndDelete({ _id:id })
          res.status(200).json(productDoc);
      } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
  else if (req.method === "PUT") {
    const { _id,desc, time, category, gitHub } = req.body;
    try {
      const productDoc = await TimeTrack.updateOne({_id},{desc,time,category,gitHub})
      res.status(200).json(productDoc);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
     else {
      res.status(405).json({ msg: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
