## Setup

1. replace the example.env file with a .env file
2. fill db config
3. create tables and create this function
```sql
CREATE OR REPLACE FUNCTION search_all_entities(search_terms text[])
    RETURNS TABLE ("source_id" int, "name" text, "type" text) AS $$
BEGIN
RETURN QUERY
SELECT "cities"."id" AS "id", CAST("cities"."name" AS text) AS "name", CAST('city' AS text) AS "type" FROM "cities" WHERE "cities"."name" ILIKE ANY (search_terms)
UNION ALL
SELECT "brands"."id" AS "id", CAST("brands"."name" AS text) AS "name", CAST('brand' AS text) AS "type" FROM "brands" WHERE "brands"."name" ILIKE ANY (search_terms)
UNION ALL
SELECT "diets"."id" AS "id", CAST("diets"."name" AS text) AS "name", CAST('diet' AS text) AS "type" FROM "diets" WHERE "diets"."name" ILIKE ANY (search_terms)
UNION ALL
SELECT "dishTypes"."id" AS "id", CAST("dishTypes"."name" AS text) AS "name", CAST('dishTypes' AS text) AS "type" FROM "dishTypes" WHERE "dishTypes"."name" ILIKE ANY (search_terms);
END;
$$ LANGUAGE plpgsql;
```

## Running the app

```bash
$ npm run start

```

## Test

```bash
call this endpoint with a search query http://example.com/search-term?q=Wetherspoon in Banbury or Manchester

```