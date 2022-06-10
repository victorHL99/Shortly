import db from '../db.js';

export async function showRanking(req, res) {
    try {
        const resultUsersForRanking = await db.query(`
            SELECT u.id, u.name, 
            COUNT(l."shortlyLink") AS "linksCount", 
            SUM(l."views") AS "viewsMax"
            FROM users u 
            LEFT JOIN links l
            ON u.id = l."creatorId"
            GROUP BY u."id"
            ORDER BY "viewsMax" DESC
            LIMIT 10;
        `)


        const arrayUsersForRanking = resultUsersForRanking.rows.map(user => {
            return {
                "id": user.id,
                "name": user.name,
                "linksCount": user.linksCount,
                "visitCount": ((user.viewsMax === null) ? 0 : user.viewsMax),
            }
        }
        )
        res.status(200).send(arrayUsersForRanking.reverse());
    } catch (error) {
        res.sendStatus(500);
    }
}