*Done*
So, `AwardTypes` has both `AwardId` and `id`, which is redundant. 
`Areas` should lose `date` and gain `name`. 
The `Users` table is unnecessary. 
`Volunteers` has connections to `AreaId`, `AreaVolunteerId` and `EventId` and it should have none of those.

*Doing*
It also looks like it's not generating the foreign key relationships. It should produce `ALTER TABLE Foo ADD FOREIGN KEY ...` in there somewhere.

`AreaVolunteers` has an id that's an integer, and it should have an ID that's two integers: volunteer id and area id. 
Executing (default): CREATE TABLE IF NOT EXISTS "AreaVolunteers" ("id"   SERIAL , "joined" TIMESTAMP WITH TIME ZONE, "left" TIMESTAMP WITH TIME ZONE, "regular" BOOLEAN, "floater" BOOLEAN, "notes" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'AreaVolunteers' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;