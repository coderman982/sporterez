import { Router } from 'express';
import {createMatchSchema, listMatchesQuerySchema} from "../validation/matches.js";
import {matches} from "../db/schema.js";
import {db} from "../db/db.js";
import {string} from "zod";
import {getMatchStatus} from "../utils/match-status.js";

const matchRouter=Router();

const MAX_LIMIT = 100;

matchRouter.get('/',async(req,res)=>{
           const parsed= listMatchesQuerySchema.safeParse(req.query);
           if(!parsed.success) {
           return res.status(400).json({ error: 'Invalid query.', details: JSON.stringify(parsed.error) });

}
      const limit = Math.min(parsedData.data.limit ?? 50, MAX_LIMIT);

      try {
const data = await db
.select()
.from(matches)
.orderBy((desc(matches.createdAt)))
.limit(limit)
res.json({data});
} catch (e) {
res.status(500).json({ error: 'Failed to list matches.' });
}

})
    
        
 //xpress GET route on that router.
// When a client requests that route, Express will send back:
// HTTP status 200
// JSON body { "message": "matches list" }
// If the router is mounted with app.use('/matches', matchRouter), then a request to GET 
// /matches will return that response.

matchRouter.post('/', async(req, res) => {
const parsed = createMatchSchema.safeParse(req.body);
const {ddata:{startTime,endTime,homeScore,awayScore}}=parsed;


if(!parsed.success) {
return res.status(400).json({ error: 'Invalid payload.', details: JSON.stringify(parsed. error) });
}
try {

    const [event]=await db.insert(matches).values({
        ...parsed.data,
        startTime:new Date(startTime),
        endTime:new Date(endTime),
        homeScore:homeScore ?? 0,
        awayScore:awayScore ??0,
        status:getMatchStatus(startTime,endTime),
    }).returning();


    res.status(201).json({date:event})}
    
    catch (e) {
res.status(500).json({ error: 'Failed to create match.', details: JSON.stringify(e) });
}
})

