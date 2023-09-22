import {Admin} from "@/models/Admin";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {TimeTrack} from "@/models/TimeTrack";
import {Category} from "@/models/Category";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req,res,authOptions);
        await mongooseConnect();
        const isAdmin = !! (await Admin.findOne({email:session.user?.email}));
        if (req.method === "GET") {
            try{
                const productDoc = await Category.find({});
                res.status(200).json(productDoc);
            } catch (error){
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
        else if (req.method==="POST"){
            if(!isAdmin){
                return res.status(403).json({msg:"You should be admin!"})
            }
            const { name } = req.body;
            try{
                const productDoc = await Category.create({name});
                res.status(201).json(productDoc);
            } catch (error){
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

        }
        else if (req.method==="PUT"){
            if(!isAdmin){
                return res.status(403).json({msg:"You should be admin!"})
            }
            const {_id , name } = req.body;
            try{
                const productDoc = await Category.updateOne({_id},{name});
                res.status(201).json(productDoc);
            } catch (error){
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

        }
        else if (req.method==="DELETE"){
            if(!isAdmin){
                return res.status(403).json({msg:"You should be admin!"})
            }
            const name = req.query["name"];
            try {
                const productDoc = await Category.findOneAndDelete({ name })
                res.status(200).json(productDoc);
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}