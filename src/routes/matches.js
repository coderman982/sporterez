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
           return res.status(400).json({ error: 'Invalid query.', details: parsed.error.issues });

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


if(!parsed.success) {
return res.status(400).json({ error: 'Invalid payload.', details: parsed.error.issues });
}

const {data:{startTime,endTime,homeScore,awayScore}}=parsed;

try {

    const [event]=await db.insert(matches).values({
        ...parsed.data,
        startTime:new Date(startTime),
        endTime:new Date(endTime),
        homeScore:homeScore ?? 0,
        awayScore:awayScore ?? 0,
        status:getMatchStatus(startTime,endTime),
    }).returning();

    if(res.app.locals.broadcastMatchCreated){
        res.app.locals.broadcastMatchCreated(event);
    }

    //In your code, that function does:

// broadcast(wss, { type: 'match_created', data: match })
// So event is used as the data field in the broadcast message sent to WebSocket clients.



// //if (res.app.locals.broadcastMatchCreated) { ... }

// checks whether broadcastMatchCreated is defined on app.locals
// if it exists, calls res.app.locals.broadcastMatchCreated(event)
// So in this route:

// after a new match is created and stored in the database
// it sends the new match event to all connected WebSocket clients
// only if the WebSocket broadcast helper was attached successfully in index.js

    res.status(201).json({date:event})}
    
    catch (e) {
res.status(500).json({ error: 'Failed to create match.', details: JSON.stringify(e) });
}
})

